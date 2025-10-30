import Consultation from '../models/Consultation.js';
import Article from '../models/Article.js';
import User from '../models/User.js';
import { getOpenAIClient, getOpenAIChatCompletion, AYURAI_SYSTEM_PROMPT } from '../config/openai.js';
import { detectRedFlags, detectCautionFlags, determineTriageLevel, buildSafetyMessage } from '../utils/redFlags.js';
import { buildOpenAIContext, extractSymptoms, getCurrentSeason, getTimeOfDay } from '../utils/contextBuilder.js';
import { analyzeUserContext, shouldAssessPrakriti, extractPrakritiIndicators } from '../utils/userContextAnalyzer.js';
import { 
  getDietaryRecommendations, 
  getLifestyleRecommendations, 
  checkImbalanceSigns,
  getDoshaCharacteristics 
} from '../utils/dietaryRecommendations.js';
import { getHerbalRecommendation } from '../utils/kitchenHerbs.js';
import { getCurrentRitu, getCurrentTimeOfDay } from '../utils/seasonDetector.js';

// @desc    Send chat message and get AI response with full personalization
// @route   POST /api/chat/message
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { message, vitals, symptoms: providedSymptoms } = req.body;
    const userId = req.user.id;

    // Get user data with full context
    const user = await User.findById(userId);
    
    // Analyze comprehensive user context for personalization
    const userContext = await analyzeUserContext(userId);
    console.log('📊 User Context:', JSON.stringify(userContext, null, 2));

    // Auto-detect Prakriti indicators from conversation
    const prakritiIndicators = extractPrakritiIndicators(message);
    console.log('🔍 Detected Prakriti indicators from message:', prakritiIndicators);
    
    if (Object.values(prakritiIndicators).some(v => v > 0)) {
      // Update user's Prakriti scores incrementally
      const currentScores = user.prakriti?.doshaScores || { vata: 0, pitta: 0, kapha: 0 };
      console.log('📊 Current Prakriti scores:', currentScores);
      
      const updatedScores = {
        vata: currentScores.vata + prakritiIndicators.vata,
        pitta: currentScores.pitta + prakritiIndicators.pitta,
        kapha: currentScores.kapha + prakritiIndicators.kapha,
      };
      
      // Normalize scores to percentage
      const total = updatedScores.vata + updatedScores.pitta + updatedScores.kapha;
      if (total > 0) {
        updatedScores.vata = Math.round((updatedScores.vata / total) * 100);
        updatedScores.pitta = Math.round((updatedScores.pitta / total) * 100);
        updatedScores.kapha = 100 - updatedScores.vata - updatedScores.pitta;
      }
      
      // Determine dominant dosha
      const dominant = Object.entries(updatedScores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      const dominantDosha = dominant.charAt(0).toUpperCase() + dominant.slice(1);
      
      // Update user's Prakriti
      user.prakriti = {
        assessed: true,
        doshaScores: updatedScores,
        assessmentDate: new Date(),
        dominantDosha: dominantDosha,
      };
      
      await user.save();
      console.log('✅ Updated Prakriti saved to database:', {
        vata: updatedScores.vata,
        pitta: updatedScores.pitta,
        kapha: updatedScores.kapha,
        dominant: dominantDosha
      });
    }

    // Detect red flags and caution flags
    const redFlag = detectRedFlags(message);
    const cautionFlags = detectCautionFlags(message);
    const triageLevel = determineTriageLevel(message);

    // Extract symptoms from message
    const extractedSymptoms = extractSymptoms(message);
    const allSymptoms = providedSymptoms || extractedSymptoms;

    // If urgent, return immediate referral message
    if (triageLevel === 'urgent') {
      const safetyMessage = buildSafetyMessage(redFlag, []);
      
      const urgentConsultation = await Consultation.create({
        userId,
        timestamp: new Date(),
        chiefComplaint: message,
        symptoms: allSymptoms,
        vitals,
        season: getCurrentSeason(),
        aiResponse: safetyMessage,
        triageFlag: 'urgent',
        redFlagsDetected: redFlag ? [{
          category: redFlag.category,
          keyword: redFlag.keyword,
          severity: redFlag.severity
        }] : [],
        adviceGiven: ['URGENT_MEDICAL_REFERRAL']
      });

      return res.status(200).json({
        success: true,
        data: {
          response: safetyMessage,
          triageLevel: 'urgent',
          consultationId: urgentConsultation._id,
          redFlag: redFlag
        }
      });
    }

    // Get recent articles for context
    const articles = await Article.find({ status: 'published' }).limit(10);

    // Build consultation object
    const consultationData = {
      userId,
      chiefComplaint: message,
      symptoms: allSymptoms,
      vitals,
      vikriti: {},
      medications: user.medicalHistory?.currentMedications || [],
      season: getCurrentSeason(),
      triageFlag: triageLevel,
      cautionFlagsDetected: cautionFlags.map(f => ({
        category: f.category,
        keyword: f.keyword
      }))
    };

    // Build context for OpenAI
    const context = buildOpenAIContext(user, consultationData, articles);

    // Get current Ritu (Ayurvedic season) and time of day
    const currentRitu = getCurrentRitu();
    const currentTime = getCurrentTimeOfDay();

    // Build safety message for caution flags
    const cautionMessage = buildSafetyMessage(null, cautionFlags);

    // Get dietary and lifestyle recommendations based on dominant dosha (only if assessed)
    const hasPrakriti = userContext.prakriti.assessed && userContext.prakriti.dominant !== 'Not assessed';
    const dietaryRecs = hasPrakriti ? getDietaryRecommendations(userContext.prakriti.dominant) : null;
    const lifestyleRecs = hasPrakriti ? getLifestyleRecommendations(userContext.prakriti.dominant) : null;
    const doshaInfo = hasPrakriti ? getDoshaCharacteristics(userContext.prakriti.dominant) : null;
    
    // Check if current message indicates dosha imbalance (only if assessed)
    const imbalanceSigns = hasPrakriti ? checkImbalanceSigns(message, userContext.prakriti.dominant) : [];

    // Build personalized context from user's history and metrics
    const personalizedContext = `

=== USER PROFILE ===
Name: ${userContext.userName}
${userContext.userAge ? `Age: ${userContext.userAge} years` : ''}

CONSTITUTION (Prakriti):
${hasPrakriti ? `
- Vata: ${userContext.prakriti.vata}%
- Pitta: ${userContext.prakriti.pitta}%
- Kapha: ${userContext.prakriti.kapha}%
- Dominant Dosha: ${userContext.prakriti.dominant}
` : `
- Status: Not yet assessed
⚠️ IMPORTANT: User hasn't completed Prakriti assessment. Provide general Ayurvedic advice.
You can still help them, but personalized dosha-specific recommendations require the quiz.
Gently suggest they complete the Prakriti quiz in their Profile page for personalized recommendations.
`}

${doshaInfo ? `
DOSHA CHARACTERISTICS (${userContext.prakriti.dominant}):
- Elements: ${doshaInfo.elements.join(' + ')}
- Qualities: ${doshaInfo.qualities}
- Typical Traits: ${doshaInfo.personalityTraits.slice(0, 3).join(', ')}
` : ''}

${imbalanceSigns.length > 0 ? `
⚠️ DETECTED IMBALANCE SIGNS:
The user's message indicates potential ${userContext.prakriti.dominant} imbalance:
${imbalanceSigns.map(s => `- ${s.sign} (${s.type})`).join('\n')}
Consider addressing these in your response.
` : ''}

${hasPrakriti && dietaryRecs ? `
DIETARY RECOMMENDATIONS FOR ${userContext.prakriti.dominant}:
Foods to Favor (${dietaryRecs.foodsToEat.description}):
- Examples: ${dietaryRecs.foodsToEat.examples.slice(0, 8).join(', ')}
- Tastes: ${dietaryRecs.foodsToEat.tastes.join(', ')}
- Temperature: ${dietaryRecs.foodsToEat.temperature}

Foods to Avoid (${dietaryRecs.foodsToAvoid.description}):
- Examples: ${dietaryRecs.foodsToAvoid.examples.slice(0, 8).join(', ')}
- Tastes to Minimize: ${dietaryRecs.foodsToAvoid.tastes.join(', ')}

Cooking Tips:
${dietaryRecs.cookingTips.slice(0, 3).map(tip => `- ${tip}`).join('\n')}
` : ''}

${hasPrakriti && lifestyleRecs ? `
LIFESTYLE RECOMMENDATIONS FOR ${userContext.prakriti.dominant}:
Daily Routine:
${lifestyleRecs.routine.map(r => `- ${r}`).join('\n')}

Exercise:
${lifestyleRecs.exercise.slice(0, 3).map(e => `- ${e}`).join('\n')}

Mental Health:
${lifestyleRecs.mentalHealth.slice(0, 3).map(m => `- ${m}`).join('\n')}
` : ''}

CURRENT STATE:
- Imbalance: ${userContext.currentImbalance}
- Recent Symptoms: ${userContext.recentSymptoms.join(', ') || 'None reported'}
- Recurring Concerns: ${userContext.recurringConcerns.join(', ') || 'None detected'}
- Health Progress: ${userContext.healthProgress}

MEDICAL HISTORY:
- Medications: ${userContext.medications.length > 0 ? userContext.medications.join(', ') : 'None'}
- Allergies: ${userContext.allergies.length > 0 ? userContext.allergies.join(', ') : 'None'}
- Chronic Conditions: ${userContext.chronicConditions.length > 0 ? userContext.chronicConditions.join(', ') : 'None'}

CONVERSATION HISTORY (Last ${userContext.conversationHistory.length} consultations):
${userContext.conversationHistory.map((c, i) => `
${i + 1}. [${c.date}] User: "${c.userSaid}"
   AI Response: ${c.aiResponse}
   Triage: ${c.triageLevel}`).join('\n')}

${userContext.isNewUser ? '🆕 This is the user\'s FIRST consultation - introduce yourself warmly and build rapport!' : ''}
${userContext.lastConsultation ? `
LAST CONSULTATION:
- Date: ${new Date(userContext.lastConsultation.date).toLocaleDateString()}
- Concern: "${userContext.lastConsultation.concern}"
- Response: ${userContext.lastConsultation.response}
⚠️ Follow up on this if relevant to current concern!` : ''}

CONTEXT:
- Season: ${userContext.season}
- Time: ${userContext.timeOfDay}
- User Compliance: ${userContext.complianceLevel}

CURRENT RITU (Ayurvedic Season): ${currentRitu.name}
- Dominant Dosha: ${currentRitu.dosha}
- Qualities: ${currentRitu.qualities}
- Recommended Foods: ${currentRitu.foods}
- Lifestyle Advice: ${currentRitu.lifestyle}

CURRENT TIME PERIOD (Dinacharya): ${currentTime.period}
- Dominant Dosha: ${currentTime.dosha}
- Advice: ${currentTime.advice}

INSTRUCTIONS FOR THIS RESPONSE:
1. Address user by name (${userContext.userName})
2. Reference their Prakriti (${userContext.prakriti.dominant}-dominant) in your advice
3. Use the dietary recommendations above - suggest specific foods they should eat/avoid
4. Incorporate lifestyle tips naturally (e.g., "Since you're ${userContext.prakriti.dominant}, try...")
5. Consider their conversation history - mention if this is a follow-up concern
6. If they mentioned symptoms before, ask about progress
7. Be conversational and warm - this is a CHAT, not a medical report
8. Ask follow-up questions to understand better
9. When giving diet advice, mention 2-3 specific foods to favor and 1-2 to avoid
10. Track improvements or concerns from previous conversations
${userContext.needsPrakritiAssessment ? '11. ⚠️ PRIORITY: Ask questions to assess their Prakriti if they seem open to it' : ''}
${imbalanceSigns.length > 0 ? '12. ⚠️ Address the detected imbalance signs in your response' : ''}
`;

    // Prepare OpenAI prompt with full personalization
    const fullPrompt = `${AYURAI_SYSTEM_PROMPT}

${context}

${personalizedContext}

${cautionMessage ? cautionMessage + '\n' : ''}

CURRENT USER MESSAGE: "${message}"

Please provide a deeply personalized, context-aware Ayurvedic response. Remember:
- This user has consulted ${userContext.totalConsultations} time(s) before
- Their dominant dosha is ${userContext.prakriti.dominant}
- Reference their history naturally in conversation
- Ask follow-up questions like a caring advisor
- Be warm, conversational, and supportive
- Write in flowing paragraphs, NOT bullet points or markdown
`;

    // Get AI response from OpenAI using chat completion with history
    console.log('Using OpenAI API Key:', process.env.OPENAI_API_KEY ? `${process.env.OPENAI_API_KEY.substring(0, 20)}...` : 'NOT SET');
    console.log('Using OpenAI Model:', process.env.OPENAI_MODEL || 'gpt-4o-mini');
    
    // Build message array for OpenAI from user's previous consultations
    const messages = [];
    
    // Add system prompt as first message
    messages.push({
      role: 'system',
      content: AYURAI_SYSTEM_PROMPT + '\n\n' + context + '\n\n' + personalizedContext
    });
    
    // Add previous conversations from userContext
    if (userContext.conversationHistory && userContext.conversationHistory.length > 0) {
      // Get last 5 conversations to maintain context without overwhelming the token limit
      const recentConversations = userContext.conversationHistory.slice(-5);
      
      recentConversations.forEach(conv => {
        messages.push({
          role: 'user',
          content: conv.userSaid
        });
        messages.push({
          role: 'assistant',
          content: conv.aiResponse
        });
      });
    }
    
    console.log(`📚 Including ${(messages.length - 1) / 2} previous conversation exchanges in context`);
    
    // Add current message
    messages.push({
      role: 'user',
      content: message + (cautionMessage ? '\n\n' + cautionMessage : '')
    });
    
    // Get AI response from OpenAI
    const aiResponse = await getOpenAIChatCompletion(messages);

    // Get herbal companion recommendation - only if message is health/symptom related
    const healthKeywords = ['pain', 'ache', 'sick', 'tired', 'stress', 'anxiety', 'sleep', 'digest', 'cold', 'cough', 'fever', 'headache', 'nausea', 'vomit', 'diarrhea', 'constipation', 'bloat', 'gas', 'acid', 'heartburn', 'inflammation', 'swelling', 'joint', 'muscle', 'fatigue', 'weak', 'dizzy', 'itchy', 'rash', 'allergy', 'asthma', 'breath', 'wheez', 'throat', 'sore', 'congestion', 'sinus', 'migraine', 'insomnia', 'depression', 'mood', 'energy', 'weight', 'appetite', 'thirst', 'urination', 'menstrual', 'period', 'cramp', 'hormone', 'skin', 'hair', 'nail', 'eye', 'ear', 'nose', 'mouth', 'teeth', 'gum', 'stomach', 'liver', 'kidney', 'heart', 'lung', 'blood', 'pressure', 'sugar', 'diabetes', 'cholesterol', 'immunity', 'infection', 'wound', 'injury', 'burn', 'bruise', 'sprain'];
    
    const isHealthRelated = healthKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    
    let herbalAddition = '';
    if (isHealthRelated) {
      const herbalRec = getHerbalRecommendation(message);
      herbalAddition = `\n\n**Kitchen Companion:** Try ${herbalRec.form} — ${herbalRec.rationale} (${herbalRec.dosha})`;
    }

    // Combine safety message, AI response, and herbal recommendation (if applicable)
    const finalResponse = cautionMessage + aiResponse + herbalAddition;

    // Save consultation
    const consultation = await Consultation.create({
      ...consultationData,
      aiResponse: finalResponse,
      articlesReferenced: articles.slice(0, 3).map(a => a._id)
    });

    res.status(200).json({
      success: true,
      data: {
        response: finalResponse,
        triageLevel,
        consultationId: consultation._id,
        articlesReferenced: articles.slice(0, 3).map(a => ({
          id: a._id,
          title: a.title,
          slug: a.slug
        })),
        cautionFlags: cautionFlags.length > 0 ? cautionFlags : undefined
      }
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing message',
      error: error.message
    });
  }
};

// @desc    Get chat history for user
// @route   GET /api/chat/history
// @access  Private
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 20, page = 1 } = req.query;

    const skip = (page - 1) * limit;

    const consultations = await Consultation.find({ userId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('articlesReferenced', 'title slug')
      .select('-__v');

    const total = await Consultation.countDocuments({ userId });

    res.status(200).json({
      success: true,
      data: {
        consultations,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chat history',
      error: error.message
    });
  }
};

// @desc    Get single consultation
// @route   GET /api/chat/:id
// @access  Private
export const getConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('articlesReferenced', 'title slug body');

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { consultation }
    });

  } catch (error) {
    console.error('Get consultation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching consultation',
      error: error.message
    });
  }
};

// @desc    Submit feedback for consultation
// @route   PUT /api/chat/:id/feedback
// @access  Private
export const submitFeedback = async (req, res) => {
  try {
    const { helpful, rating, comment } = req.body;

    const consultation = await Consultation.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        userFeedback: { helpful, rating, comment }
      },
      { new: true }
    );

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: { consultation }
    });

  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting feedback',
      error: error.message
    });
  }
};

// @desc    Get smart prompt suggestions based on user history
// @route   GET /api/chat/suggestions
// @access  Private
export const getSmartSuggestions = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user profile with Prakriti
    const user = await User.findById(userId);
    
    // Get recent consultations to analyze patterns
    const recentConsultations = await Consultation.find({ userId })
      .sort({ timestamp: -1 })
      .limit(10)
      .select('chiefComplaint symptoms');

    // Base suggestions for everyone
    const baseSuggestions = [
      "How can I improve my digestion naturally?",
      "What are some stress relief techniques?",
      "What should I eat for better sleep?",
      "How can I boost my immunity?"
    ];

    // Personalized suggestions based on Prakriti
    const prakritiSuggestions = {
      Vata: [
        "What foods help balance Vata dosha?",
        "How can I reduce anxiety and nervousness?",
        "What's good for dry skin and constipation?",
        "How to improve irregular digestion?"
      ],
      Pitta: [
        "What foods cool down Pitta imbalance?",
        "How can I manage anger and irritability?",
        "What helps with acidity and inflammation?",
        "Best foods for Pitta in summer?"
      ],
      Kapha: [
        "What foods reduce Kapha imbalance?",
        "How can I increase energy and motivation?",
        "What helps with weight management?",
        "How to reduce congestion naturally?"
      ]
    };

    // Topic-based suggestions from recent history
    const topicSuggestions = [];
    const symptoms = new Set();
    
    recentConsultations.forEach(consultation => {
      if (consultation.symptoms && Array.isArray(consultation.symptoms)) {
        consultation.symptoms.forEach(s => {
          // Handle both string and object formats
          let symptomText = '';
          if (typeof s === 'string') {
            symptomText = s;
          } else if (s && typeof s === 'object') {
            symptomText = s.name || s.symptom || s.description || '';
          }
          
          if (symptomText && typeof symptomText === 'string') {
            symptoms.add(symptomText.toLowerCase());
          }
        });
      }
    });

    // Generate follow-up questions based on past symptoms
    if (symptoms.has('headache') || symptoms.has('migraine')) {
      topicSuggestions.push("Any updates on the headaches we discussed?");
    }
    if (symptoms.has('insomnia') || symptoms.has('sleep')) {
      topicSuggestions.push("How is your sleep quality now?");
    }
    if (symptoms.has('digestion') || symptoms.has('bloating') || symptoms.has('gas')) {
      topicSuggestions.push("Has your digestion improved?");
    }
    if (symptoms.has('stress') || symptoms.has('anxiety')) {
      topicSuggestions.push("How are you managing stress lately?");
    }
    if (symptoms.has('pain') || symptoms.has('joint')) {
      topicSuggestions.push("Is the pain/discomfort better now?");
    }

    // Seasonal suggestions
    const season = getCurrentSeason();
    const seasonalSuggestions = {
      'spring': ["What herbs are good for spring detox?", "How to manage spring allergies?"],
      'summer': ["What foods keep me cool in summer?", "How to prevent heat exhaustion?"],
      'fall': ["How to boost immunity for fall?", "What foods are good in autumn?"],
      'winter': ["What keeps me warm in winter?", "How to prevent winter dryness?"]
    };

    // Compile all suggestions
    let suggestions = [];

    // Add follow-up suggestions first (most relevant)
    if (topicSuggestions.length > 0) {
      suggestions.push(...topicSuggestions.slice(0, 2));
    }

    // Add Prakriti-specific suggestions
    if (user.prakriti?.assessed && user.prakriti.dominantDosha) {
      const doshaType = user.prakriti.dominantDosha;
      if (prakritiSuggestions[doshaType]) {
        suggestions.push(...prakritiSuggestions[doshaType].slice(0, 2));
      }
    }

    // Add seasonal suggestion
    if (seasonalSuggestions[season]) {
      suggestions.push(seasonalSuggestions[season][0]);
    }

    // Fill with base suggestions if needed
    while (suggestions.length < 4) {
      const randomBase = baseSuggestions[Math.floor(Math.random() * baseSuggestions.length)];
      if (!suggestions.includes(randomBase)) {
        suggestions.push(randomBase);
      }
    }

    // Limit to 4 suggestions
    suggestions = suggestions.slice(0, 4);

    res.status(200).json({
      success: true,
      data: { suggestions }
    });

  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching suggestions',
      error: error.message
    });
  }
};

// @desc    Get 1-minute balance practice
// @route   GET /api/chat/quick-practice
// @access  Private
export const getQuickPractice = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    // Get current time and season
    const currentTime = getCurrentTimeOfDay();
    const currentRitu = getCurrentRitu();
    
    // Get user's dominant dosha if assessed
    const dominantDosha = user.prakriti?.assessed ? user.prakriti.dominantDosha : null;
    
    // Create prompt for 1-minute practice
    const practicePrompt = `Generate a concise 1-minute Ayurvedic balancing micro-practice for:
- Time of day: ${currentTime.period} (${currentTime.dosha} time)
- Current season: ${currentRitu.name} (${currentRitu.dosha} dominant)
${dominantDosha ? `- User's Prakriti: ${dominantDosha}-dominant` : '- User constitution: Not yet assessed'}

Instructions:
1. Keep it under 100 words
2. Include ONE simple practice (breath, awareness, or sensory tip)
3. Make it doable right now in 60 seconds
4. Explain briefly WHY it helps balance doshas
5. Use warm, encouraging tone
6. Format: Start with the practice, then explain the benefit

Example format:
"Close your eyes and take 5 slow breaths through your left nostril (close right with thumb). Feel warmth spreading in your chest. 

This ancient technique calms Vata energy and grounds scattered thoughts — perfect for ${currentTime.period}. The cooling breath balances the ${currentRitu.dosha} dominance of ${currentRitu.name}."`;

    // Get practice from OpenAI
    const messages = [
      {
        role: 'system',
        content: 'You are an Ayurvedic wellness guide. Provide brief, practical micro-practices that anyone can do immediately.'
      },
      {
        role: 'user',
        content: practicePrompt
      }
    ];

    const practice = await getOpenAIChatCompletion(messages);

    res.status(200).json({
      success: true,
      data: {
        practice,
        context: {
          timeOfDay: currentTime.period,
          season: currentRitu.name,
          dosha: dominantDosha
        }
      }
    });

  } catch (error) {
    console.error('Quick practice error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating practice',
      error: error.message
    });
  }
};

export default { sendMessage, getChatHistory, getConsultation, submitFeedback, getSmartSuggestions, getQuickPractice };

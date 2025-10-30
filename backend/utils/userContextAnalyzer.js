import User from '../models/User.js';
import Consultation from '../models/Consultation.js';

/**
 * Analyzes comprehensive user context for deeply personalized AI responses
 * This builds a complete picture of the user for context-aware conversations
 */
export const analyzeUserContext = async (userId) => {
  try {
    // Get user with all data
    const user = await User.findById(userId);
    if (!user) return { error: 'User not found' };

    // Get conversation history (last 10 consultations)
    const consultations = await Consultation.find({ userId })
      .sort({ timestamp: -1 })
      .limit(10);

    // Build comprehensive context
    const context = {
      // User Identity
      userName: user.name,
      userAge: calculateAge(user.dob),
      
      // Constitutional Analysis (Prakriti)
      prakriti: {
        assessed: user.prakriti?.assessed || false,
        vata: user.prakriti?.doshaScores?.vata || 0,
        pitta: user.prakriti?.doshaScores?.pitta || 0,
        kapha: user.prakriti?.doshaScores?.kapha || 0,
        dominant: user.prakriti?.dominantDosha || 'Not assessed',
        lastAssessed: user.prakriti?.assessmentDate || null,
      },
      
      // Current Imbalance (Vikriti)
      currentImbalance: analyzeImbalance(user.vikriti),
      
      // Conversation Memory
      conversationHistory: buildConversationMemory(consultations),
      totalConsultations: consultations.length,
      lastConsultation: consultations[0] ? {
        date: consultations[0].timestamp,
        concern: consultations[0].chiefComplaint,
        response: consultations[0].aiResponse?.substring(0, 200),
      } : null,
      
      // Health Patterns
      recentSymptoms: extractRecentSymptoms(consultations),
      recurringConcerns: findRecurringConcerns(consultations),
      healthProgress: evaluateProgress(consultations),
      
      // Lifestyle Data
      medications: user.medicalHistory?.currentMedications || [],
      allergies: user.medicalHistory?.allergies || [],
      chronicConditions: user.medicalHistory?.chronicConditions || [],
      
      // Environmental Context
      season: getCurrentSeason(),
      timeOfDay: getTimeOfDay(),
      
      // Personalization Insights
      needsPrakritiAssessment: !user.prakriti?.assessed,
      isNewUser: consultations.length === 0,
      complianceLevel: assessCompliance(consultations),
    };

    return context;
  } catch (error) {
    console.error('❌ Context analysis error:', error);
    return { error: error.message };
  }
};

/**
 * Calculate age from DOB
 */
const calculateAge = (dob) => {
  if (!dob) return null;
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/**
 * Analyze current dosha imbalance
 */
const analyzeImbalance = (vikriti) => {
  if (!vikriti) return 'Unknown - needs assessment';
  
  const imbalances = [];
  if (vikriti.vata > 50) imbalances.push('Vata elevated');
  if (vikriti.pitta > 50) imbalances.push('Pitta elevated');
  if (vikriti.kapha > 50) imbalances.push('Kapha elevated');
  
  return imbalances.length > 0 ? imbalances.join(', ') : 'Balanced';
};

/**
 * Build conversation memory from chat history
 */
const buildConversationMemory = (consultations) => {
  return consultations.slice(0, 5).map(c => ({
    date: new Date(c.timestamp).toLocaleDateString(),
    userSaid: c.chiefComplaint,
    aiResponse: c.aiResponse?.substring(0, 150) + '...',
    triageLevel: c.triageFlag || 'normal',
  }));
};

/**
 * Extract recent symptoms mentioned
 */
const extractRecentSymptoms = (consultations) => {
  const symptoms = new Set();
  consultations.slice(0, 3).forEach(c => {
    if (c.symptoms && Array.isArray(c.symptoms)) {
      c.symptoms.forEach(s => symptoms.add(s));
    }
  });
  return Array.from(symptoms);
};

/**
 * Find recurring health concerns
 */
const findRecurringConcerns = (consultations) => {
  const concerns = {};
  const keywords = {
    digestion: ['digest', 'stomach', 'bloat', 'gas', 'acid', 'constipat', 'diarrhea'],
    sleep: ['sleep', 'insomnia', 'tired', 'fatigue', 'exhaust'],
    stress: ['stress', 'anxiety', 'worry', 'tension', 'nervous'],
    skin: ['skin', 'rash', 'acne', 'dry', 'itch', 'eczema'],
    pain: ['pain', 'ache', 'headache', 'joint', 'muscle'],
    respiratory: ['cough', 'cold', 'breath', 'asthma', 'congest'],
    weight: ['weight', 'appetite', 'diet', 'thin', 'obese'],
  };

  consultations.forEach(c => {
    const text = (c.chiefComplaint || '').toLowerCase();
    Object.entries(keywords).forEach(([concern, words]) => {
      if (words.some(word => text.includes(word))) {
        concerns[concern] = (concerns[concern] || 0) + 1;
      }
    });
  });

  return Object.entries(concerns)
    .filter(([_, count]) => count >= 2)
    .map(([concern, count]) => `${concern} (mentioned ${count} times)`);
};

/**
 * Evaluate health progress over time
 */
const evaluateProgress = (consultations) => {
  if (consultations.length < 2) return 'Insufficient data';
  
  const latest = consultations[0];
  const older = consultations[consultations.length - 1];
  
  // Simple heuristic: check if triage level improved
  const triageImprovement = {
    urgent: 3,
    caution: 2,
    normal: 1,
  };
  
  const latestLevel = triageImprovement[latest.triageFlag] || 1;
  const olderLevel = triageImprovement[older.triageFlag] || 1;
  
  if (latestLevel < olderLevel) return 'Showing improvement';
  if (latestLevel > olderLevel) return 'Needs attention';
  return 'Stable condition';
};

/**
 * Assess user compliance with recommendations
 */
const assessCompliance = (consultations) => {
  if (consultations.length < 2) return 'New user';
  
  // Check if concerns are resolving (simple heuristic)
  const recentConcerns = consultations.slice(0, 2).map(c => c.chiefComplaint);
  const olderConcerns = consultations.slice(2, 4).map(c => c.chiefComplaint);
  
  const hasNewConcerns = recentConcerns.some(rc => 
    !olderConcerns.some(oc => oc && rc && oc.toLowerCase().includes(rc.toLowerCase().split(' ')[0]))
  );
  
  return hasNewConcerns ? 'Good - trying recommendations' : 'May need follow-up on compliance';
};

/**
 * Get current season (simplified for India)
 */
export const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 5) return 'Summer (Grishma)';
  if (month >= 6 && month <= 9) return 'Monsoon (Varsha)';
  return 'Winter (Hemanta/Shishira)';
};

/**
 * Get time of day and associated dosha
 */
const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 10) return 'Morning (Kapha time)';
  if (hour >= 10 && hour < 14) return 'Midday (Pitta time)';
  if (hour >= 14 && hour < 18) return 'Afternoon (Vata time)';
  if (hour >= 18 && hour < 22) return 'Evening (Kapha time)';
  return 'Night (Pitta/Vata time)';
};

/**
 * Detect if Prakriti assessment is needed based on conversation
 */
export const shouldAssessPrakriti = (message, user) => {
  if (user.prakriti?.assessed) return false;
  
  const assessmentTriggers = [
    'prakriti', 'constitution', 'dosha', 'body type',
    'what am i', 'vata', 'pitta', 'kapha', 'assess',
  ];
  
  return assessmentTriggers.some(trigger => 
    message.toLowerCase().includes(trigger)
  );
};

/**
 * Extract Prakriti indicators from user's messages
 */
export const extractPrakritiIndicators = (message) => {
  const indicators = {
    vata: 0,
    pitta: 0,
    kapha: 0,
  };

  const vataKeywords = ['thin', 'dry', 'cold', 'anxious', 'irregular', 'constipat', 'insomnia', 'restless'];
  const pittaKeywords = ['hot', 'inflam', 'acid', 'anger', 'compet', 'rash', 'burn', 'sweat'];
  const kaphaKeywords = ['heavy', 'slow', 'congest', 'letharic', 'gain weight', 'sleep lot', 'calm'];

  const lowerMessage = message.toLowerCase();

  vataKeywords.forEach(word => {
    if (lowerMessage.includes(word)) indicators.vata += 10;
  });
  
  pittaKeywords.forEach(word => {
    if (lowerMessage.includes(word)) indicators.pitta += 10;
  });
  
  kaphaKeywords.forEach(word => {
    if (lowerMessage.includes(word)) indicators.kapha += 10;
  });

  return indicators;
};

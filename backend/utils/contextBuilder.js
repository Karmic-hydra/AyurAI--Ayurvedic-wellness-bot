import { getCurrentRitu, getCurrentTimeOfDay } from './seasonDetector.js';
import { getHerbalRecommendation } from './kitchenHerbs.js';

/**
 * Get current season based on month
 * @returns {string} - spring, summer, fall, or winter
 */
export const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring'; // Mar-May
  if (month >= 5 && month <= 7) return 'summer'; // Jun-Aug
  if (month >= 8 && month <= 10) return 'fall'; // Sep-Nov
  return 'winter'; // Dec-Feb
};

/**
 * Get time of day category based on Ayurvedic clock
 * @returns {string} - kapha, pitta, or vata dominant time
 */
export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 10) return 'kapha'; // 6-10 AM
  if (hour >= 10 && hour < 14) return 'pitta'; // 10 AM-2 PM
  if (hour >= 14 && hour < 18) return 'vata'; // 2-6 PM
  if (hour >= 18 && hour < 22) return 'kapha'; // 6-10 PM
  return 'vata'; // 10 PM-6 AM
};

/**
 * Calculate dominant dosha from scores
 * @param {Object} doshaScores - {vata: number, pitta: number, kapha: number}
 * @returns {string} - dominant dosha or 'balanced'
 */
export const calculateDominantDosha = (doshaScores) => {
  if (!doshaScores) return 'unknown';
  
  const { vata = 0, pitta = 0, kapha = 0 } = doshaScores;
  const max = Math.max(vata, pitta, kapha);
  
  // If all scores are close (within 10% for percentage-based scores), it's balanced
  const range = max - Math.min(vata, pitta, kapha);
  if (range < 10) return 'balanced';
  
  if (vata === max) return 'vata';
  if (pitta === max) return 'pitta';
  if (kapha === max) return 'kapha';
  return 'balanced';
};

/**
 * Build context for OpenAI prompt
 * @param {Object} user - User object
 * @param {Object} consultation - Current consultation data
 * @param {Array} articles - Available articles
 * @returns {string} - Formatted context string
 */
export const buildOpenAIContext = (user, consultation, articles) => {
  let context = '**Current Context:**\n\n';
  
  // Get Ayurvedic seasonal and time context
  const rituInfo = getCurrentRitu();
  const timeInfo = getCurrentTimeOfDay();
  
  // Temporal context with Ritucharya
  context += `- Ritu (Season): ${rituInfo.name}\n`;
  context += `- Dominant Dosha This Season: ${rituInfo.dosha}\n`;
  context += `- Seasonal Advice: ${rituInfo.advice}\n`;
  context += `- Time of Day: ${timeInfo.period} - ${timeInfo.advice}\n`;
  
  // User profile
  if (user.prakriti) {
    const dominantDosha = calculateDominantDosha(user.prakriti.doshaScores);
    context += `- User's Prakriti (Constitution): ${dominantDosha}\n`;
  }
  
  // Current state
  if (consultation.vikriti) {
    const currentDosha = calculateDominantDosha(consultation.vikriti);
    context += `- Current Vikriti (Imbalance): ${currentDosha}\n`;
  }
  
  // Symptoms
  if (consultation.symptoms && consultation.symptoms.length > 0) {
    context += `- Current Symptoms: ${consultation.symptoms.map(s => s.name).join(', ')}\n`;
  }
  
  // Vitals
  if (consultation.vitals) {
    context += `- Vitals: `;
    if (consultation.vitals.temp) context += `Temp: ${consultation.vitals.temp}°C `;
    if (consultation.vitals.bp) context += `BP: ${consultation.vitals.bp} `;
    if (consultation.vitals.hr) context += `HR: ${consultation.vitals.hr}bpm`;
    context += '\n';
  }
  
  // Medications
  if (consultation.medications && consultation.medications.length > 0) {
    context += `- Current Medications: ${consultation.medications.join(', ')}\n`;
  }
  
  // Available articles
  if (articles && articles.length > 0) {
    context += `\n**Available Knowledge Articles:**\n`;
    articles.slice(0, 5).forEach(article => {
      context += `- [${article._id}] ${article.title}\n`;
    });
  }
  
  context += `\n**User Query:** ${consultation.chiefComplaint}\n\n`;
  
  return context;
};

/**
 * Extract symptoms from user message
 * @param {string} message - User message
 * @returns {Array} - Array of detected symptoms
 */
export const extractSymptoms = (message) => {
  const symptoms = [];
  const lowerMessage = message.toLowerCase();
  
  const symptomKeywords = {
    'fever': ['fever', 'temperature', 'hot body'],
    'headache': ['headache', 'head pain', 'head hurts'],
    'cough': ['cough', 'coughing'],
    'cold': ['cold', 'runny nose', 'sneezing'],
    'indigestion': ['indigestion', 'acidity', 'heartburn', 'gas', 'bloating'],
    'fatigue': ['tired', 'fatigue', 'exhausted', 'weak', 'no energy'],
    'insomnia': ['can\'t sleep', 'insomnia', 'sleep problem'],
    'anxiety': ['anxious', 'anxiety', 'worried', 'stress'],
    'joint pain': ['joint pain', 'arthritis', 'joints hurt'],
    'skin': ['rash', 'itching', 'skin problem', 'acne']
  };
  
  for (const [symptom, keywords] of Object.entries(symptomKeywords)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        symptoms.push({
          name: symptom,
          onset: new Date(),
          severity: 5 // Default medium severity
        });
        break;
      }
    }
  }
  
  return symptoms;
};

/**
 * Get seasonal recommendations
 * @param {string} season - Current season
 * @returns {Object} - Seasonal recommendations
 */
export const getSeasonalRecommendations = (season) => {
  const recommendations = {
    spring: {
      dominantDosha: 'kapha',
      diet: 'Light, dry, warm foods; reduce dairy and sweet',
      lifestyle: 'Increase exercise, wake early, dry brushing',
      herbs: 'Ginger, black pepper, turmeric'
    },
    summer: {
      dominantDosha: 'pitta',
      diet: 'Cooling foods - cucumber, melons, coconut; avoid spicy',
      lifestyle: 'Avoid excessive sun, stay cool, practice cooling pranayama',
      herbs: 'Coriander, fennel, mint'
    },
    fall: {
      dominantDosha: 'vata',
      diet: 'Warm, moist, grounding foods; cooked vegetables, soups',
      lifestyle: 'Maintain routines, oil massage (abhyanga), stay warm',
      herbs: 'Ashwagandha, shatavari, warm spices'
    },
    winter: {
      dominantDosha: 'kapha-vata',
      diet: 'Warm, nourishing foods; soups, stews, warming spices',
      lifestyle: 'Keep warm, moderate exercise, adequate rest',
      herbs: 'Ginger, cinnamon, tulsi (holy basil)'
    }
  };
  
  return recommendations[season] || recommendations.fall;
};

export default {
  getCurrentSeason,
  getTimeOfDay,
  calculateDominantDosha,
  buildOpenAIContext,
  extractSymptoms,
  getSeasonalRecommendations,
  getCurrentRitu,
  getCurrentTimeOfDay,
  getHerbalRecommendation
};

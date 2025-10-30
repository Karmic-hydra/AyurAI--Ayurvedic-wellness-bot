// Red Flag Symptoms - Require immediate medical attention
export const RED_FLAGS = [
  {
    category: 'cardiac',
    keywords: ['chest pain', 'heart pain', 'chest pressure', 'chest tightness', 'heart attack'],
    severity: 'critical',
    message: '🚨 **URGENT**: Chest pain can be life-threatening. Please go to the nearest emergency department NOW or call emergency services immediately.'
  },
  {
    category: 'respiratory',
    keywords: ['severe breathlessness', 'can\'t breathe', 'choking', 'gasping for air', 'blue lips', 'difficulty breathing severely'],
    severity: 'critical',
    message: '🚨 **URGENT**: Severe breathing difficulty is a medical emergency. Go to the nearest emergency department NOW or call emergency services.'
  },
  {
    category: 'neurological',
    keywords: ['sudden weakness', 'facial droop', 'face drooping', 'slurred speech', 'can\'t speak', 'stroke', 'one side weak', 'arm weakness sudden'],
    severity: 'critical',
    message: '🚨 **URGENT**: These symptoms suggest a possible stroke. Time is critical. Call emergency services IMMEDIATELY.'
  },
  {
    category: 'trauma',
    keywords: ['severe bleeding', 'heavy bleeding', 'head injury', 'hit my head', 'blood won\'t stop', 'bleeding profusely'],
    severity: 'critical',
    message: '🚨 **URGENT**: Severe bleeding or head injury requires immediate medical attention. Go to the emergency department NOW.'
  },
  {
    category: 'consciousness',
    keywords: ['fainted', 'fainting', 'lost consciousness', 'passed out', 'seizure', 'convulsion', 'fitting'],
    severity: 'critical',
    message: '🚨 **URGENT**: Loss of consciousness or seizures require immediate evaluation. Go to the emergency department NOW.'
  },
  {
    category: 'fever_severe',
    keywords: ['high fever 104', 'fever 40', 'fever 103', 'fever with confusion', 'fever and can\'t think', 'rigors'],
    severity: 'critical',
    message: '🚨 **URGENT**: Very high fever (>39.5°C/103°F) with confusion or rigors needs immediate medical care. Go to emergency department NOW.'
  },
  {
    category: 'abdominal',
    keywords: ['severe abdominal pain', 'severe stomach pain', 'vomiting blood', 'black stool', 'tarry stool', 'bloody stool'],
    severity: 'critical',
    message: '🚨 **URGENT**: Severe abdominal pain with vomiting or blood in stool requires immediate medical attention. Go to emergency department NOW.'
  },
  {
    category: 'sepsis',
    keywords: ['sepsis', 'very high temperature', 'confused and fever', 'rapid breathing and fever', 'cold and clammy'],
    severity: 'critical',
    message: '🚨 **URGENT**: Signs of sepsis are life-threatening. Go to the nearest emergency department IMMEDIATELY.'
  },
  {
    category: 'poisoning',
    keywords: ['poisoning', 'overdose', 'swallowed poison', 'took too many pills', 'chemical ingestion'],
    severity: 'critical',
    message: '🚨 **URGENT**: Suspected poisoning or overdose is a medical emergency. Call emergency services or poison control IMMEDIATELY.'
  },
  {
    category: 'allergic',
    keywords: ['face swelling', 'lips swelling', 'tongue swelling', 'throat closing', 'severe hives', 'allergic reaction severe', 'anaphylaxis'],
    severity: 'critical',
    message: '🚨 **URGENT**: Severe allergic reaction (anaphylaxis) can be life-threatening. Call emergency services IMMEDIATELY.'
  }
];

// Caution Flags - Advise monitoring and possible consultation
export const CAUTION_FLAGS = [
  {
    category: 'pregnancy',
    keywords: ['pregnant', 'pregnancy', 'expecting', 'weeks pregnant', 'months pregnant'],
    severity: 'caution',
    message: '⚠️ **CAUTION**: You mentioned pregnancy. Please consult with your healthcare provider before trying any herbal remedies or significant lifestyle changes.'
  },
  {
    category: 'diabetes',
    keywords: ['diabetic', 'diabetes', 'blood sugar', 'insulin'],
    severity: 'caution',
    message: '⚠️ **CAUTION**: You mentioned diabetes. Please consult your doctor before using herbal remedies as they may interact with your medications.'
  },
  {
    category: 'blood_thinners',
    keywords: ['blood thinner', 'warfarin', 'anticoagulant', 'coumadin'],
    severity: 'caution',
    message: '⚠️ **CAUTION**: Blood thinners can interact with many herbs. Please consult your doctor before using any herbal remedies.'
  },
  {
    category: 'breastfeeding',
    keywords: ['breastfeeding', 'nursing', 'breast feeding', 'lactating'],
    severity: 'caution',
    message: '⚠️ **CAUTION**: You mentioned breastfeeding. Please consult a healthcare provider before using herbal remedies.'
  },
  {
    category: 'pediatric',
    keywords: ['my child', 'my baby', 'my son', 'my daughter', 'infant', 'toddler', 'kid'],
    severity: 'caution',
    message: '⚠️ **CAUTION**: For children, please consult a pediatrician or qualified practitioner before trying remedies.'
  },
  {
    category: 'elderly',
    keywords: ['elderly', 'senior', 'old age', 'grandfather', 'grandmother', 'over 70', 'over 80'],
    severity: 'caution',
    message: '⚠️ **CAUTION**: Elderly individuals may have different sensitivities. Please consult a healthcare provider.'
  }
];

/**
 * Detect red flags in user message
 * @param {string} message - User's message
 * @returns {Object|null} - Red flag object if detected, null otherwise
 */
export const detectRedFlags = (message) => {
  const lowerMessage = message.toLowerCase();
  
  for (const flag of RED_FLAGS) {
    for (const keyword of flag.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return {
          detected: true,
          category: flag.category,
          severity: flag.severity,
          message: flag.message,
          keyword: keyword
        };
      }
    }
  }
  
  return null;
};

/**
 * Detect caution flags in user message
 * @param {string} message - User's message
 * @returns {Array} - Array of caution flag objects
 */
export const detectCautionFlags = (message) => {
  const lowerMessage = message.toLowerCase();
  const detectedFlags = [];
  
  for (const flag of CAUTION_FLAGS) {
    for (const keyword of flag.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        detectedFlags.push({
          detected: true,
          category: flag.category,
          severity: flag.severity,
          message: flag.message,
          keyword: keyword
        });
        break; // Only add flag once per category
      }
    }
  }
  
  return detectedFlags;
};

/**
 * Determine triage level based on message
 * @param {string} message - User's message
 * @returns {string} - 'urgent', 'caution', or 'none'
 */
export const determineTriageLevel = (message) => {
  const redFlag = detectRedFlags(message);
  if (redFlag) {
    return 'urgent';
  }
  
  const cautionFlags = detectCautionFlags(message);
  if (cautionFlags.length > 0) {
    return 'caution';
  }
  
  return 'none';
};

/**
 * Build safety message based on flags
 * @param {Object|null} redFlag - Detected red flag
 * @param {Array} cautionFlags - Detected caution flags
 * @returns {string} - Safety message to prepend to response
 */
export const buildSafetyMessage = (redFlag, cautionFlags) => {
  let message = '';
  
  if (redFlag) {
    message += `\n\n${redFlag.message}\n\n`;
    message += `**I cannot safely provide treatment advice for this condition remotely. Please seek immediate medical attention.**\n\n`;
    return message;
  }
  
  if (cautionFlags.length > 0) {
    message += '\n\n';
    cautionFlags.forEach(flag => {
      message += `${flag.message}\n\n`;
    });
  }
  
  return message;
};

export default {
  RED_FLAGS,
  CAUTION_FLAGS,
  detectRedFlags,
  detectCautionFlags,
  determineTriageLevel,
  buildSafetyMessage
};

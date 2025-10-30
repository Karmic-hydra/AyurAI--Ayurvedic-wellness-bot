// Format date to readable string
export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format time to readable string
export const formatTime = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format date and time together
export const formatDateTime = (date) => {
  if (!date) return '';
  
  return `${formatDate(date)} at ${formatTime(date)}`;
};

// Calculate dominant dosha
export const calculateDominantDosha = (scores) => {
  if (!scores) return 'unknown';
  
  const { vata = 0, pitta = 0, kapha = 0 } = scores;
  const max = Math.max(vata, pitta, kapha);
  
  // If all scores are close, it's balanced
  const range = max - Math.min(vata, pitta, kapha);
  if (range < 3) return 'balanced';
  
  if (vata === max) return 'vata';
  if (pitta === max) return 'pitta';
  if (kapha === max) return 'kapha';
  return 'balanced';
};

// Get dosha color
export const getDoshaColor = (dosha) => {
  const colors = {
    vata: 'text-purple-600',
    pitta: 'text-red-600',
    kapha: 'text-green-600',
    balanced: 'text-blue-600',
    unknown: 'text-gray-600'
  };
  return colors[dosha] || colors.unknown;
};

// Get dosha background color
export const getDoshaBgColor = (dosha) => {
  const colors = {
    vata: 'bg-purple-100',
    pitta: 'bg-red-100',
    kapha: 'bg-green-100',
    balanced: 'bg-blue-100',
    unknown: 'bg-gray-100'
  };
  return colors[dosha] || colors.unknown;
};

// Get current season
export const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
};

// Get season emoji
export const getSeasonEmoji = (season) => {
  const emojis = {
    spring: '🌸',
    summer: '☀️',
    fall: '🍂',
    winter: '❄️'
  };
  return emojis[season] || '🌿';
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Truncate text
export const truncate = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
};

// Get error message from API error
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Check if text contains red flag keywords
export const containsRedFlag = (text) => {
  if (!text) return false;
  
  const redFlags = [
    'chest pain', 'heart pain', 'severe breathlessness', 'can\'t breathe',
    'sudden weakness', 'facial droop', 'slurred speech',
    'severe bleeding', 'head injury', 'fainting', 'seizure',
    'high fever', 'severe pain', 'poisoning', 'overdose'
  ];
  
  const lowerText = text.toLowerCase();
  return redFlags.some(flag => lowerText.includes(flag));
};

export default {
  formatDate,
  formatTime,
  formatDateTime,
  calculateDominantDosha,
  getDoshaColor,
  getDoshaBgColor,
  getCurrentSeason,
  getSeasonEmoji,
  isValidEmail,
  truncate,
  getErrorMessage,
  containsRedFlag
};

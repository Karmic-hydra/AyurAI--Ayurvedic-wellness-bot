/**
 * Custom Ayurvedic Wellness Card Generator
 * No external APIs - pure calculation based approach
 */

// Export the main function
export const generateWellnessCard = async (birthDate, birthTime, birthPlace, latitude, longitude) => {
  try {
    console.log(' Generating wellness card...');
    
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const [hours] = birthTime.split(':');
    const hour = parseInt(hours);
    
    // Simple zodiac calculation
    const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const sunSignIndex = Math.floor(((month + 9) % 12));
    const sunSign = zodiacSigns[sunSignIndex];
    
    // Dosha mapping
    const doshaMap = {
      'Aries': 'Pitta', 'Leo': 'Pitta', 'Sagittarius': 'Pitta',
      'Taurus': 'Kapha', 'Virgo': 'Vata-Pitta', 'Capricorn': 'Vata-Kapha',
      'Gemini': 'Vata', 'Libra': 'Vata', 'Aquarius': 'Vata',
      'Cancer': 'Kapha', 'Scorpio': 'Pitta-Kapha', 'Pisces': 'Kapha'
    };
    
    // Element mapping
    const elementMap = {
      'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
      'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
      'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
      'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
    };
    
    // Ruling planets
    const rulingPlanets = {
      'Aries': 'Mars', 'Scorpio': 'Mars',
      'Taurus': 'Venus', 'Libra': 'Venus',
      'Gemini': 'Mercury', 'Virgo': 'Mercury',
      'Cancer': 'Moon',
      'Leo': 'Sun',
      'Sagittarius': 'Jupiter', 'Pisces': 'Jupiter',
      'Capricorn': 'Saturn', 'Aquarius': 'Saturn'
    };
    
    const astroType = doshaMap[sunSign] || 'Vata';
    const dominantElement = elementMap[sunSign] || 'Air';
    const dominantPlanet = rulingPlanets[sunSign] || 'Sun';
    const ascendant = zodiacSigns[Math.floor((hour / 2) % 12)];
    
    // Generate recommendations
    const tips = [];
    if (astroType.includes('Pitta')) {
      tips.push('Include cooling foods like cucumber and coconut water');
      tips.push('Avoid spicy foods and excessive heat');
      tips.push('Practice cooling pranayama (Shitali breath)');
    }
    if (astroType.includes('Vata')) {
      tips.push('Maintain regular meal times and sleep schedule');
      tips.push('Eat warm, grounding foods like soups and stews');
      tips.push('Practice slow, grounding yoga');
    }
    if (astroType.includes('Kapha')) {
      tips.push('Start day with vigorous exercise');
      tips.push('Favor light, warm foods');
      tips.push('Avoid heavy, oily meals');
    }
    
    const traits = [];
    if (dominantElement === 'Fire') traits.push('Passionate', 'Dynamic', 'Driven');
    if (dominantElement === 'Earth') traits.push('Grounded', 'Practical', 'Stable');
    if (dominantElement === 'Air') traits.push('Intellectual', 'Social', 'Adaptable');
    if (dominantElement === 'Water') traits.push('Emotional', 'Intuitive', 'Nurturing');
    
    if (astroType.includes('Pitta')) traits.push('Focused', 'Ambitious');
    if (astroType.includes('Vata')) traits.push('Creative', 'Quick-thinking');
    if (astroType.includes('Kapha')) traits.push('Calm', 'Patient');
    
    const planetaryInsights = {
      'Sun': 'Sun provides vitality and confidence. Shine your light while staying humble.',
      'Moon': 'Moon governs emotions and intuition. Honor your feelings and maintain balance.',
      'Mars': 'Mars brings dynamic energy. Channel intensity through physical activity.',
      'Mercury': 'Mercury enhances communication. Keep your mind engaged but avoid overthinking.',
      'Jupiter': 'Jupiter brings wisdom and expansion. Seek knowledge and share generously.',
      'Venus': 'Venus blesses you with harmony. Nurture relationships and enjoy mindfully.',
      'Saturn': 'Saturn teaches discipline. Embrace structure while maintaining flexibility.'
    };
    
    const mantras = {
      'Pitta': 'शत शत शत | Peace and coolness within',
      'Vata': 'सथर भव | I am grounded and centered',
      'Kapha': 'उततषठत जगरत | I embrace energy and lightness',
      'Pitta-Kapha': 'सतय शव सनदरम | I unite strength with compassion',
      'Pitta-Vata': 'धर धर | I channel energy with focus',
      'Vata-Pitta': 'समतव यग उचयत | I balance movement with purpose',
      'Vata-Kapha': 'सरव खलवद बरहम | I blend lightness with stability',
      'Kapha-Vata': 'यग करमस कशलम | I am steady yet adaptable',
      'Kapha-Pitta': 'अहस परम धरम | I harmonize strength with gentleness'
    };
    
    console.log(' Wellness card generated:', { astroType, sunSign, ascendant });
    
    return {
      success: true,
      data: {
        astroType,
        sunSign,
        moonSign: sunSign,
        ascendant,
        dominantElement,
        dominantPlanet,
        traits: traits.slice(0, 6),
        balanceTips: tips,
        planetaryInsight: planetaryInsights[dominantPlanet],
        dailyMantra: mantras[astroType] || 'ॐ शत | Om Shanti',
        generatedDate: new Date()
      }
    };
  } catch (error) {
    console.error(' Error:', error);
    return { success: false, message: error.message };
  }
};

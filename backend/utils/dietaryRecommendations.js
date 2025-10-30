/**
 * Dietary Recommendations for Each Dosha
 * Based on Ayurvedic principles
 */

export const dietaryGuidelines = {
  vata: {
    foodsToEat: {
      description: "warm, moist, and soft foods",
      examples: [
        "berries", "bananas", "peaches",
        "cooked vegetables", "oats", "brown rice",
        "lean meat", "eggs", "dairy",
        "sweet potatoes", "avocados", "nuts (soaked)",
        "warm soups", "stews", "cooked grains"
      ],
      tastes: ["sweet", "sour", "salty"],
      temperature: "warm to hot",
      texture: "moist, soft, grounding"
    },
    foodsToAvoid: {
      description: "bitter, dried, and cold foods",
      examples: [
        "raw vegetables", "cold desserts", "dried fruit",
        "nuts (raw/dry)", "seeds (dry)", "crackers",
        "cold drinks", "iced foods", "raw salads",
        "beans (without proper preparation)", "caffeine in excess"
      ],
      tastes: ["bitter", "pungent", "astringent"],
      temperature: "cold, frozen",
      texture: "dry, rough, hard"
    },
    beverages: {
      recommended: ["warm water", "herbal teas (ginger, cinnamon)", "warm milk with spices", "bone broth"],
      avoid: ["iced drinks", "carbonated beverages", "excessive coffee", "alcohol"]
    },
    cookingTips: [
      "Use generous amounts of ghee or high-quality oils",
      "Add warming spices: ginger, black pepper, cinnamon, cumin",
      "Cook vegetables well - avoid raw",
      "Prefer warm, freshly prepared meals",
      "Eat at regular times"
    ]
  },

  pitta: {
    foodsToEat: {
      description: "light, cold, sweet, and energizing foods",
      examples: [
        "most fruits (sweet fruits)", "non-starchy vegetables",
        "oats", "eggs", "basmati rice", "quinoa",
        "coconut", "cucumbers", "melons", "leafy greens",
        "milk", "ghee", "sweet lassi", "cilantro"
      ],
      tastes: ["sweet", "bitter", "astringent"],
      temperature: "cool to room temperature",
      texture: "light, moist, cooling"
    },
    foodsToAvoid: {
      description: "heavy, spicy, and sour foods",
      examples: [
        "red meat", "potatoes (in excess)", "hot spices",
        "tomatoes", "citrus fruits", "vinegar",
        "fermented foods", "alcohol", "caffeine",
        "fried foods", "salty snacks", "sour cream"
      ],
      tastes: ["sour", "pungent", "salty"],
      temperature: "very hot, spicy",
      texture: "heavy, oily, fried"
    },
    beverages: {
      recommended: ["cool (not iced) water", "coconut water", "mint tea", "rose water", "sweet lassi"],
      avoid: ["alcohol", "coffee", "sour drinks", "hot spicy drinks"]
    },
    cookingTips: [
      "Use cooling spices: coriander, fennel, cardamom, mint",
      "Use ghee in moderation",
      "Avoid deep frying - prefer steaming, boiling",
      "Drink 4-5 liters of room temperature water daily",
      "Eat in a peaceful environment"
    ]
  },

  kapha: {
    foodsToEat: {
      description: "spicy, acidic, and filling foods",
      examples: [
        "most fruits and vegetables", "whole grains",
        "eggs", "low-fat cheese", "unprocessed meats",
        "hot spices", "leafy greens", "apples", "pears",
        "barley", "buckwheat", "millet", "legumes",
        "ginger tea", "bitter vegetables"
      ],
      tastes: ["pungent", "bitter", "astringent"],
      temperature: "warm to hot",
      texture: "light, dry, stimulating"
    },
    foodsToAvoid: {
      description: "heavy, fatty foods",
      examples: [
        "excessive fats and oils", "processed foods",
        "nuts (in excess)", "seeds (in excess)",
        "heavy dairy (cheese, ice cream)", "fried foods",
        "sweet desserts", "bread (white)", "pasta",
        "bananas", "avocados", "coconut"
      ],
      tastes: ["sweet", "sour", "salty"],
      temperature: "cold, iced",
      texture: "heavy, oily, dense"
    },
    beverages: {
      recommended: ["warm water", "ginger tea", "black tea", "herbal teas (stimulating)", "warm lemon water"],
      avoid: ["cold drinks", "dairy-based drinks", "sweet juices", "alcohol in excess"]
    },
    cookingTips: [
      "Use minimal oil - prefer dry cooking methods",
      "Add pungent spices: ginger, black pepper, cayenne, mustard",
      "Eat light, dry, warm foods",
      "Avoid heavy, creamy sauces",
      "Eat smaller, lighter meals"
    ]
  }
};

export const lifestyleRecommendations = {
  vata: {
    routine: [
      "Get to bed before 10:00 pm and rise by 6:00 am",
      "Maintain a daily routine (dinacharya) with regular times for eating, sleeping, and working",
      "Keep a consistent schedule - Vata thrives on routine"
    ],
    exercise: [
      "Gentle, grounding exercises like yoga, walking, tai chi",
      "Avoid excessive, vigorous exercise",
      "Practice restorative yoga poses",
      "Swimming in warm water"
    ],
    mentalHealth: [
      "Practice meditation daily - especially Sahaj Samadhi meditation",
      "Oil massage (abhyanga) with warm sesame oil",
      "Avoid overstimulation - limit screen time",
      "Create a calm, peaceful environment",
      "Practice deep breathing exercises"
    ],
    environment: [
      "Prefer warm, moist climates",
      "Avoid cold, windy, dry weather",
      "Keep your living space warm and cozy",
      "Use warm colors in your surroundings"
    ],
    remedies: [
      "Vata-reducing herbs: Ashwagandha, Brahmi, Shatavari",
      "Warm oil massage before bathing",
      "Use warming essential oils: ginger, cinnamon, orange",
      "Practice Pranayama (breathing exercises)"
    ]
  },

  pitta: {
    routine: [
      "Maintain regular meal times and avoid skipping meals",
      "Follow a daily routine (dinacharya)",
      "Avoid working late into the night",
      "Take breaks during work to cool down"
    ],
    exercise: [
      "Moderate exercise - avoid competitive sports",
      "Swimming, walking in nature, gentle yoga",
      "Exercise during cooler parts of the day (morning or evening)",
      "Avoid exercising in hot sun"
    ],
    mentalHealth: [
      "Meditation twice daily - crucial for anger management",
      "Sahaj Samadhi meditation helps significantly",
      "Practice forgiveness and letting go",
      "Spend time in nature - walk by water, moon gazing",
      "Cultivate patience and compassion"
    ],
    environment: [
      "Prefer cool, shaded environments",
      "Avoid excessive heat and sun exposure",
      "Keep company with calm, positive people",
      "Use cooling colors: blues, greens, whites"
    ],
    remedies: [
      "Pitta-reducing herbs: Neem, Aloe Vera, Sandalwood",
      "Cooling massage oils: coconut oil",
      "Use cooling essential oils: rose, jasmine, lavender",
      "Moderately difficult yogasanas for detoxification"
    ]
  },

  kapha: {
    routine: [
      "Wake up early - before 6:00 am",
      "Avoid daytime sleep which increases Kapha",
      "Stay active throughout the day",
      "Don't skip meals but eat lighter portions"
    ],
    exercise: [
      "Vigorous, stimulating exercise is essential",
      "Running, aerobics, dynamic yoga, dancing",
      "Exercise daily - even if you don't feel like it",
      "Challenge yourself physically"
    ],
    mentalHealth: [
      "Practice energizing Pranayama (breathing exercises)",
      "Meditation to avoid lethargy and depression",
      "Seek new experiences and adventures",
      "Avoid excessive sleep",
      "Stay socially engaged"
    ],
    environment: [
      "Prefer warm, dry climates",
      "Avoid cold, damp environments",
      "Keep your living space bright and airy",
      "Use stimulating colors: reds, oranges, yellows"
    ],
    remedies: [
      "Kapha-reducing herbs: Trikatu, Guggulu, Turmeric",
      "Dry massage (garshana) with silk gloves",
      "Use stimulating essential oils: eucalyptus, rosemary, basil",
      "Regular yoga practice to keep energy high"
    ]
  }
};

export const doshaImbalanceSigns = {
  vata: {
    physical: [
      "Dryness and roughness of skin",
      "Too much weight loss or emaciation",
      "Irregular bowel movement or constipation",
      "Pain in bones and joints",
      "Flatulence",
      "Abnormal pulse rate",
      "Palpitations",
      "Cracking joints",
      "Dry, brittle hair and nails"
    ],
    mental: [
      "Fear and anxiety",
      "Restlessness",
      "Insomnia",
      "Difficulty concentrating",
      "Nervousness",
      "Feeling ungrounded"
    ],
    diseases: [
      "Insomnia", "Headaches", "Tinnitus",
      "Loose teeth", "Facial paralysis",
      "Acute stress", "Tremors", "Earache",
      "Sciatica", "Muscle cramps",
      "Arthritis", "Chronic constipation"
    ]
  },

  pitta: {
    physical: [
      "Excessive body heat",
      "Yellow coloration of skin",
      "Burning sensation",
      "Excessive thirst and hunger",
      "Reduced sleep",
      "Bad breath",
      "Hot flashes",
      "Skin rashes or inflammation",
      "Premature greying or hair loss"
    ],
    mental: [
      "Increased anger and irritability",
      "Tendency toward perfectionism",
      "Impatience",
      "Critical thinking",
      "Frustration",
      "Dissatisfaction"
    ],
    diseases: [
      "Peptic ulcers", "Acid reflux",
      "Skin disorders (eczema, psoriasis)",
      "Migraines", "Conjunctivitis",
      "Jaundice", "Inflammation disorders",
      "Tendonitis", "Fibromyalgia",
      "Low blood sugar", "Hypertension"
    ]
  },

  kapha: {
    physical: [
      "Drowsiness and lethargy",
      "Obesity or difficulty losing weight",
      "Loss of appetite",
      "Sweet taste in mouth",
      "Excessive mucus or congestion",
      "Cough and respiratory issues",
      "Hardening of blood vessels",
      "Heaviness in body",
      "Slow digestion"
    ],
    mental: [
      "Depression",
      "Lethargy and inertia",
      "Resistance to change",
      "Attachment and greed",
      "Stubbornness",
      "Lack of motivation"
    ],
    diseases: [
      "Sinusitis", "Bronchitis",
      "Asthma", "Diabetes",
      "High cholesterol", "Goiter",
      "Edema (water retention)",
      "Joint disorders", "Sleep apnea",
      "Hypothyroidism"
    ]
  }
};

export const doshaCharacteristics = {
  vata: {
    elements: ["Air", "Ether/Space"],
    location: "Abdomen below navel, colon, pelvis, thighs, skin, ears, nervous system, lungs",
    qualities: "Light, dry, cold, rough, subtle, mobile, clear",
    bodyType: "Thin, light frame, prominent joints, difficulty gaining weight",
    physicalTraits: [
      "Thin build with low body weight",
      "Dry skin and brittle nails",
      "Thin, dry hair",
      "Small, slightly sunken eyes",
      "Joints make sounds when walking",
      "Difficulty gaining weight",
      "Irregular appetite"
    ],
    personalityTraits: [
      "Talkative and restless",
      "Creative and enthusiastic",
      "Quick to learn but also quick to forget",
      "Adaptable and flexible",
      "Energetic in bursts",
      "Tends toward anxiety when imbalanced"
    ],
    functions: "Responsible for all movement in body and mind, breath, circulation, elimination, speech, nervous system impulses"
  },

  pitta: {
    elements: ["Fire", "Water"],
    location: "Small intestine, stomach, liver, spleen, gallbladder, blood, sweat glands, eyes, skin",
    qualities: "Hot, sharp, light, oily, liquid, spreading",
    bodyType: "Medium build, athletic, moderate weight",
    physicalTraits: [
      "Medium build and moderate weight",
      "Warm body temperature",
      "Sharp facial features and bright eyes",
      "Soft, oily, warm skin with rosy complexion",
      "Pink nails with slight curve",
      "Prone to early greying or hair loss",
      "Strong appetite and good digestion",
      "Sharp, penetrating eyes (sometimes pinkish)"
    ],
    personalityTraits: [
      "Intelligent and sharp-minded",
      "Natural leaders and perfectionists",
      "Goal-oriented and competitive",
      "Courageous and confident",
      "Good public speakers",
      "Tends toward anger and irritability when imbalanced"
    ],
    functions: "Governs digestion, metabolism, body heat, absorption, assimilation, nutrition, understanding, intelligence"
  },

  kapha: {
    elements: ["Water", "Earth"],
    location: "Chest, throat, head, sinuses, nose, mouth, stomach, joints, plasma, lymph",
    qualities: "Heavy, slow, cool, oily, smooth, dense, soft, stable",
    bodyType: "Stocky, strong build, tendency to gain weight easily",
    physicalTraits: [
      "Thick, sturdy build with large frame",
      "Thick, dark, lustrous hair",
      "Big, beautiful eyes with white prominent",
      "Thick, moist, cool skin",
      "Prominent, white, shiny teeth",
      "Strong bones and muscles",
      "Slow but steady appetite",
      "Gains weight easily, loses slowly"
    ],
    personalityTraits: [
      "Calm, peaceful, and cheerful",
      "Loving, compassionate, forgiving",
      "Patient and tolerant",
      "Methodical and steady",
      "Excellent memory (slow to learn but retains well)",
      "Tends toward lethargy and attachment when imbalanced"
    ],
    functions: "Provides structure and lubrication, maintains immunity, moisturizes skin, lubricates joints, stability in body and mind"
  }
};

/**
 * Get personalized dietary recommendations based on dominant dosha
 */
export function getDietaryRecommendations(dominantDosha) {
  if (!dominantDosha || !dietaryGuidelines[dominantDosha.toLowerCase()]) {
    return null;
  }

  const dosha = dominantDosha.toLowerCase();
  return dietaryGuidelines[dosha];
}

/**
 * Get lifestyle recommendations based on dominant dosha
 */
export function getLifestyleRecommendations(dominantDosha) {
  if (!dominantDosha || !lifestyleRecommendations[dominantDosha.toLowerCase()]) {
    return null;
  }

  const dosha = dominantDosha.toLowerCase();
  return lifestyleRecommendations[dosha];
}

/**
 * Check if symptoms match dosha imbalance signs
 */
export function checkImbalanceSigns(message, dosha) {
  const lowerMessage = message.toLowerCase();
  const signs = doshaImbalanceSigns[dosha.toLowerCase()];
  
  if (!signs) return [];

  const matchedSigns = [];
  
  // Check physical signs
  signs.physical.forEach(sign => {
    const keywords = sign.toLowerCase().split(' ');
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      matchedSigns.push({ type: 'physical', sign });
    }
  });

  // Check mental signs
  signs.mental.forEach(sign => {
    const keywords = sign.toLowerCase().split(' ');
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      matchedSigns.push({ type: 'mental', sign });
    }
  });

  return matchedSigns;
}

/**
 * Get dosha characteristics for educational purposes
 */
export function getDoshaCharacteristics(dosha) {
  return doshaCharacteristics[dosha.toLowerCase()] || null;
}

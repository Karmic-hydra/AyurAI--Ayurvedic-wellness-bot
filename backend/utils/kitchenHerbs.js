// Kitchen Herbal Companion - Safe household ingredients with Ayurvedic rationale

export const kitchenHerbs = {
  // Digestive Issues
  "weak_digestion": [
    { herb: "Ginger", form: "Fresh ginger tea", dosha: "Kindles Agni (all doshas)", rationale: "Stimulates digestive fire without aggravating Pitta when fresh" },
    { herb: "Cumin", form: "½ tsp cumin powder in warm water", dosha: "Balances all doshas", rationale: "Enhances absorption, reduces bloating, supports gut health" },
    { herb: "Fennel", form: "Fennel seed tea after meals", dosha: "Calms Pitta", rationale: "Cooling digestive aid, reduces acidity and gas" }
  ],
  
  "constipation": [
    { herb: "Warm water", form: "1 glass warm water upon waking", dosha: "Pacifies Vata", rationale: "Hydrates colon, stimulates peristalsis, flushes Ama" },
    { herb: "Ghee", form: "1 tsp ghee in warm milk at bedtime", dosha: "Lubricates Vata", rationale: "Moistens intestines, promotes smooth elimination" },
    { herb: "Flaxseeds", form: "1 tsp ground flax in water", dosha: "Balances Vata", rationale: "Fiber and oils ease bowel movement naturally" }
  ],
  
  "acidity": [
    { herb: "Coriander", form: "Coriander seed water", dosha: "Cools Pitta", rationale: "Alkalizing herb that soothes inflamed stomach lining" },
    { herb: "Coconut water", form: "Fresh coconut water", dosha: "Calms Pitta", rationale: "Natural coolant, balances stomach acid, hydrating" },
    { herb: "Fennel", form: "Chew fennel seeds after meals", dosha: "Reduces Pitta", rationale: "Sweet taste neutralizes acid, cools digestive tract" }
  ],
  
  // Energy & Immunity
  "fatigue": [
    { herb: "Turmeric", form: "Pinch of turmeric in warm milk", dosha: "Balances Kapha", rationale: "Boosts Ojas (vitality), anti-inflammatory, aids recovery" },
    { herb: "Honey", form: "1 tsp raw honey in warm water", dosha: "Reduces Kapha", rationale: "Natural energy, scrapes Ama, supports immunity (never heat above 40°C)" },
    { herb: "Black pepper", form: "Pinch in warm drinks", dosha: "Stimulates all doshas", rationale: "Enhances circulation, bioavailability, clears channels" }
  ],
  
  "weak_immunity": [
    { herb: "Tulsi (Holy Basil)", form: "Tulsi tea (3-4 leaves)", dosha: "Balances all doshas", rationale: "Adaptogen, boosts immunity, protects respiratory system" },
    { herb: "Ginger-Turmeric", form: "Golden tea with both", dosha: "Builds Ojas", rationale: "Powerful anti-inflammatory duo, strengthens defenses" },
    { herb: "Black pepper", form: "Sprinkle on food", dosha: "Enhances absorption", rationale: "Increases nutrient uptake, clears respiratory channels" }
  ],
  
  // Stress & Sleep
  "stress": [
    { herb: "Cardamom", form: "Cardamom tea", dosha: "Calms Vata & Pitta", rationale: "Aromatic, uplifts mood, settles nervous system" },
    { herb: "Nutmeg", form: "Pinch in warm milk", dosha: "Grounds Vata", rationale: "Relaxes mind, promotes restful sleep (use sparingly)" },
    { herb: "Warm milk", form: "With pinch of saffron", dosha: "Soothes all doshas", rationale: "Nourishing, calming, promotes Ojas and emotional balance" }
  ],
  
  "insomnia": [
    { herb: "Nutmeg", form: "Tiny pinch in warm milk at bedtime", dosha: "Sedates Vata", rationale: "Natural sleep aid, calms overactive mind" },
    { herb: "Cardamom", form: "Cardamom-milk drink", dosha: "Balances Vata", rationale: "Calming aroma, eases tension, aids digestion before sleep" },
    { herb: "Warm milk", form: "With dates or jaggery", dosha: "Nourishes Vata", rationale: "Builds Ojas, induces natural drowsiness" }
  ],
  
  // Respiratory
  "cold_cough": [
    { herb: "Ginger-Honey", form: "Fresh ginger juice with honey", dosha: "Clears Kapha", rationale: "Expectorant, warms lungs, dissolves mucus" },
    { herb: "Tulsi", form: "Tulsi-black pepper tea", dosha: "Expels Kapha", rationale: "Clears respiratory passages, antimicrobial" },
    { herb: "Turmeric milk", form: "Warm turmeric milk", dosha: "Soothes Kapha", rationale: "Anti-inflammatory, coats throat, boosts immunity" }
  ],
  
  // Skin & Detox
  "skin_issues": [
    { herb: "Turmeric", form: "Turmeric water (½ tsp)", dosha: "Purifies Pitta & Kapha", rationale: "Blood purifier, anti-inflammatory, promotes clear skin" },
    { herb: "Neem leaves", form: "Neem water (4-5 leaves)", dosha: "Cools Pitta", rationale: "Detoxifies blood, antimicrobial, clears heat" },
    { herb: "Coriander", form: "Coriander-cumin-fennel tea (CCF)", dosha: "Cleanses all doshas", rationale: "Gentle detox, improves digestion, clears skin from within" }
  ],
  
  "detox": [
    { herb: "Warm water", form: "Sip warm water throughout day", dosha: "Flushes Ama", rationale: "Hydrates channels, dilutes toxins, supports kidney function" },
    { herb: "CCF tea", form: "Coriander-Cumin-Fennel equal parts", dosha: "Tridoshic detox", rationale: "Gentle daily detox, kindles Agni, eliminates Ama" },
    { herb: "Lemon water", form: "Warm water with lemon (morning)", dosha: "Cleanses Kapha", rationale: "Alkalizing despite sourness, liver stimulant (not for high Pitta)" }
  ],
  
  // Weight Management
  "weight_gain": [
    { herb: "Honey-warm water", form: "1 tsp honey in warm water (morning)", dosha: "Reduces Kapha", rationale: "Scrapes fat tissue, enhances metabolism, clears channels" },
    { herb: "Ginger tea", form: "Fresh ginger tea before meals", dosha: "Stimulates Agni", rationale: "Increases metabolic fire, improves fat digestion" },
    { herb: "Black pepper", form: "Sprinkle on meals", dosha: "Burns Ama", rationale: "Thermogenic, enhances circulation and metabolism" }
  ],
  
  // Joint & Pain
  "joint_pain": [
    { herb: "Ginger", form: "Ginger tea or compress", dosha: "Warms Vata", rationale: "Anti-inflammatory, improves circulation to joints" },
    { herb: "Turmeric", form: "Turmeric milk (golden milk)", dosha: "Lubricates Vata", rationale: "Reduces inflammation, nourishes joints" },
    { herb: "Sesame oil", form: "Warm sesame oil massage", dosha: "Pacifies Vata", rationale: "Penetrates deeply, lubricates, reduces stiffness" }
  ],
  
  // General Wellness
  "daily_wellness": [
    { herb: "Warm water", form: "First thing upon waking", dosha: "All doshas", rationale: "Flushes kidneys, hydrates tissues, prepares Agni" },
    { herb: "Ginger tea", form: "Before main meals", dosha: "All doshas", rationale: "Prepares digestive system, enhances nutrient absorption" },
    { herb: "Tulsi tea", form: "Mid-morning or evening", dosha: "All doshas", rationale: "Adaptogenic, daily tonic for immunity and mental clarity" }
  ]
};

// Get recommendation based on symptoms/keywords
export const getHerbalRecommendation = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Pattern matching for symptoms
  if (lowerMessage.includes('digest') || lowerMessage.includes('bloat') || lowerMessage.includes('gas')) {
    return kitchenHerbs.weak_digestion[Math.floor(Math.random() * kitchenHerbs.weak_digestion.length)];
  }
  if (lowerMessage.includes('constipat') || lowerMessage.includes('bowel')) {
    return kitchenHerbs.constipation[Math.floor(Math.random() * kitchenHerbs.constipation.length)];
  }
  if (lowerMessage.includes('acid') || lowerMessage.includes('heartburn') || lowerMessage.includes('reflux')) {
    return kitchenHerbs.acidity[Math.floor(Math.random() * kitchenHerbs.acidity.length)];
  }
  if (lowerMessage.includes('tired') || lowerMessage.includes('fatigue') || lowerMessage.includes('energy')) {
    return kitchenHerbs.fatigue[Math.floor(Math.random() * kitchenHerbs.fatigue.length)];
  }
  if (lowerMessage.includes('immune') || lowerMessage.includes('sick') || lowerMessage.includes('weak')) {
    return kitchenHerbs.weak_immunity[Math.floor(Math.random() * kitchenHerbs.weak_immunity.length)];
  }
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worry')) {
    return kitchenHerbs.stress[Math.floor(Math.random() * kitchenHerbs.stress.length)];
  }
  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
    return kitchenHerbs.insomnia[Math.floor(Math.random() * kitchenHerbs.insomnia.length)];
  }
  if (lowerMessage.includes('cold') || lowerMessage.includes('cough') || lowerMessage.includes('congestion')) {
    return kitchenHerbs.cold_cough[Math.floor(Math.random() * kitchenHerbs.cold_cough.length)];
  }
  if (lowerMessage.includes('skin') || lowerMessage.includes('rash') || lowerMessage.includes('acne')) {
    return kitchenHerbs.skin_issues[Math.floor(Math.random() * kitchenHerbs.skin_issues.length)];
  }
  if (lowerMessage.includes('detox') || lowerMessage.includes('cleanse') || lowerMessage.includes('toxic')) {
    return kitchenHerbs.detox[Math.floor(Math.random() * kitchenHerbs.detox.length)];
  }
  if (lowerMessage.includes('weight') || lowerMessage.includes('fat') || lowerMessage.includes('obesity')) {
    return kitchenHerbs.weight_gain[Math.floor(Math.random() * kitchenHerbs.weight_gain.length)];
  }
  if (lowerMessage.includes('joint') || lowerMessage.includes('pain') || lowerMessage.includes('arthritis')) {
    return kitchenHerbs.joint_pain[Math.floor(Math.random() * kitchenHerbs.joint_pain.length)];
  }
  
  // Default daily wellness
  return kitchenHerbs.daily_wellness[Math.floor(Math.random() * kitchenHerbs.daily_wellness.length)];
};

export default { kitchenHerbs, getHerbalRecommendation };

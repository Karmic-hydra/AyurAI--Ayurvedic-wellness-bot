/**
 * Seasonal Detection for Ritucharya (Ayurvedic Seasonal Routines)
 * Maps calendar months to 6 Ayurvedic seasons (Ritu) with detailed recommendations
 */

export const getCurrentRitu = () => {
  const month = new Date().getMonth() + 1; // 1-12
  
  const ritus = {
    "Vasanta (Spring)": {
      months: [3, 4],
      dosha: "Kapha",
      qualities: "Warm, moist, accumulation of Kapha",
      description: "Spring melts accumulated Kapha from winter, causing congestion and sluggishness",
      advice: "Light, dry foods; bitter and astringent tastes; increase exercise; detox practices",
      foods: "Favor: Barley, honey, ginger, bitter greens, legumes. Avoid: Heavy, oily, sweet, dairy",
      lifestyle: "Wake early, increase physical activity, dry massage (no oil), use warming spices",
      tips: "Avoid spicy foods, increase hydration, prefer moonlight walks"
    },
    "Grishma (Summer)": {
      months: [5, 6],
      dosha: "Pitta",
      qualities: "Hot, dry, intense sun depletes body fluids",
      description: "Summer heat aggravates Pitta, causing inflammation and dehydration",
      advice: "Cooling foods; sweet, bitter tastes; avoid spicy; moonlight walks; afternoon rest",
      foods: "Favor: Coconut, cucumber, watermelon, rice, ghee, sweet fruits. Avoid: Chilies, sour, alcohol",
      lifestyle: "Stay hydrated, wear light clothes, swim, avoid midday sun, use cooling oils like coconut",
      tips: "Avoid spicy foods, increase hydration, prefer moonlight walks"
    },
    "Varsha (Monsoon)": {
      months: [7, 8],
      dosha: "Vata",
      qualities: "Humid, cloudy, weakens digestion",
      description: "Monsoon dampness weakens Agni and aggravates Vata, causing digestive issues",
      advice: "Warm, easily digestible foods; boost Agni; avoid raw foods; stay dry",
      foods: "Favor: Soups, ginger tea, cooked grains, ghee, warming spices. Avoid: Raw salads, cold drinks",
      lifestyle: "Keep warm, daily oil massage, avoid dampness, drink warm water, eat only warm meals",
      tips: "Keep digestive fire strong, avoid cold foods, stay warm and dry"
    },
    "Sharad (Autumn)": {
      months: [9, 10],
      dosha: "Pitta",
      qualities: "Transition season, accumulated Pitta releases",
      description: "Autumn's sudden heat after monsoon releases accumulated Pitta, causing inflammation",
      advice: "Bitter herbs; cooling regimen; avoid heating foods; ghee therapy",
      foods: "Favor: Sweet fruits, rice, milk, ghee, bitter vegetables. Avoid: Spicy, fermented, fried",
      lifestyle: "Purgation therapy (if needed), cooling pranayama, avoid excessive heat, evening walks",
      tips: "Cool down Pitta, avoid heating foods, practice calming routines"
    },
    "Hemanta (Early Winter)": {
      months: [11, 12],
      dosha: "Kapha building",
      qualities: "Cold, dry, strong digestive fire",
      description: "Early winter strengthens Agni, body needs nourishment to build immunity",
      advice: "Nourishing, heavier foods; build strength; sweet, sour, salty tastes",
      foods: "Favor: Nuts, sesame, jaggery, root vegetables, warm milk, ghee. Avoid: Light, cold, dry",
      lifestyle: "Oil massage, warm baths, moderate exercise, nourishing diet, build Ojas",
      tips: "Build strength and immunity, eat nourishing foods, keep warm"
    },
    "Shishira (Late Winter)": {
      months: [1, 2],
      dosha: "Vata and Kapha",
      qualities: "Very cold, dry, harsh winds",
      description: "Late winter peak cold aggravates Vata with dryness and Kapha with cold",
      advice: "Warm oils; sweet, sour tastes; protect from cold; maintain body heat",
      foods: "Favor: Warm soups, ghee, oils, hot spices, jaggery, dates. Avoid: Cold, raw, light foods",
      lifestyle: "Heavy oil massage, warm clothing, avoid cold wind, hot water baths, warm drinks all day",
      tips: "Protect from cold, use warm oils, drink hot beverages throughout the day"
    }
  };
  
  for (const [name, data] of Object.entries(ritus)) {
    if (data.months.includes(month)) {
      return { name, ...data };
    }
  }
  
  // Fallback
  return ritus["Vasanta (Spring)"];
};

// Get time of day for Dinacharya (daily routine) recommendations
export const getCurrentTimeOfDay = () => {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 10) {
    return {
      period: "Kapha time (Morning)",
      dosha: "Kapha",
      advice: "Best time for exercise, yoga, meditation. Avoid heavy breakfast."
    };
  } else if (hour >= 10 && hour < 14) {
    return {
      period: "Pitta time (Midday)",
      dosha: "Pitta",
      advice: "Peak digestive fire. Eat your largest meal now. Good for mental work."
    };
  } else if (hour >= 14 && hour < 18) {
    return {
      period: "Vata time (Afternoon)",
      dosha: "Vata",
      advice: "Creativity peaks. Light snack if needed. Good for communication."
    };
  } else if (hour >= 18 && hour < 22) {
    return {
      period: "Kapha time (Evening)",
      dosha: "Kapha",
      advice: "Wind down. Light dinner before sunset. Gentle activities. Prepare for sleep."
    };
  } else if (hour >= 22 || hour < 2) {
    return {
      period: "Pitta time (Night)",
      dosha: "Pitta",
      advice: "Body's repair time. Should be asleep. Liver detoxification occurs."
    };
  } else {
    return {
      period: "Vata time (Pre-dawn)",
      dosha: "Vata",
      advice: "Best time to wake (Brahma Muhurta). Meditation, spiritual practices."
    };
  }
};

export default { getCurrentRitu, getCurrentTimeOfDay };

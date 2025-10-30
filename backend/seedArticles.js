import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Article from './models/Article.js';
import connectDB from './config/database.js';

dotenv.config();

const sampleArticles = [
  {
    title: 'Introduction to Tridosha: Understanding Vata, Pitta, and Kapha',
    category: 'tridosha',
    body: `# Introduction to Tridosha

The foundation of Ayurvedic medicine rests on the concept of **Tridosha** - three fundamental bio-energies that govern all biological, psychological, and pathophysiological functions of the body and mind.

## The Three Doshas

### 1. Vata (Air + Space)
**Qualities**: Dry, light, cold, rough, subtle, mobile

**Physical Characteristics**:
- Thin, light body frame
- Difficulty gaining weight
- Dry skin and hair
- Cold hands and feet
- Variable appetite and digestion

**Mental Characteristics**:
- Creative and enthusiastic
- Quick to learn, quick to forget
- Anxious when under stress
- Light, interrupted sleep

**Imbalance Signs**: Gas, bloating, constipation, anxiety, insomnia, dry skin

### 2. Pitta (Fire + Water)
**Qualities**: Hot, sharp, light, liquid, slightly oily

**Physical Characteristics**:
- Medium build with good muscle development
- Warm body temperature
- Strong appetite and digestion
- Soft, lustrous skin
- Tendency towards redness

**Mental Characteristics**:
- Intelligent and focused
- Sharp intellect and memory
- Competitive and determined
- Irritable when under stress

**Imbalance Signs**: Heartburn, acidity, inflammation, skin rashes, anger, irritability

### 3. Kapha (Earth + Water)
**Qualities**: Heavy, slow, cold, oily, smooth, stable

**Physical Characteristics**:
- Large, solid body frame
- Gains weight easily
- Thick, smooth, oily skin
- Strong stamina and endurance

**Mental Characteristics**:
- Calm and steady
- Slow to learn, never forgets
- Compassionate and forgiving
- Lethargic when imbalanced

**Imbalance Signs**: Weight gain, congestion, sluggish digestion, lethargy, depression

## Balancing Your Doshas

Understanding your dominant dosha helps in making appropriate lifestyle and dietary choices. Most people have a combination of two doshas, with one being predominant.

**Remember**: Consult with a qualified Ayurvedic practitioner for personalized assessment and recommendations.
`,
    summary: 'Learn about the three fundamental bio-energies in Ayurveda: Vata, Pitta, and Kapha. Understand their qualities, characteristics, and signs of imbalance.',
    sources: [{ name: 'Charaka Samhita - Vimana Sthana', url: 'https://www.carakasamhitaonline.com' }, { name: 'Ashtanga Hridaya', url: 'https://ayurvedacollege.com' }],
    tags: ['tridosha', 'vata', 'pitta', 'kapha', 'constitution', 'basics'],
    doshaRelevance: { vata: true, pitta: true, kapha: true },
    reviewedBy: 'Dr. Ayurvedic Practitioner',
    lastReviewed: new Date(),
    featured: true
  },
  {
    title: 'Ritucharya: Seasonal Ayurvedic Routines',
    category: 'ritucharya',
    body: `# Ritucharya: Seasonal Routines

Ritucharya is the Ayurvedic practice of adapting lifestyle and diet according to seasonal changes to maintain health and prevent disease.

## Spring (Vasant Ritu) - Kapha Season

**Time**: March-May

**Dominant Dosha**: Kapha

**Recommendations**:
- **Diet**: Light, dry, warm foods; reduce dairy, sweet, and oily foods
- **Exercise**: Increase physical activity, vigorous exercise
- **Lifestyle**: Wake up early (before 6 AM), practice dry brushing
- **Herbs**: Ginger, black pepper, turmeric

## Summer (Grishma Ritu) - Pitta Season

**Time**: June-August

**Dominant Dosha**: Pitta

**Recommendations**:
- **Diet**: Cooling foods (cucumber, melons, coconut water); avoid spicy, sour, salty foods
- **Exercise**: Moderate exercise, avoid peak sun hours
- **Lifestyle**: Stay cool, practice cooling pranayama (Sheetali, Sheetkari)
- **Herbs**: Coriander, fennel, mint, rose

## Fall (Sharad Ritu) - Vata Season

**Time**: September-November

**Dominant Dosha**: Vata

**Recommendations**:
- **Diet**: Warm, moist, grounding foods; cooked vegetables, soups, stews
- **Exercise**: Moderate, grounding practices like yoga
- **Lifestyle**: Maintain regular routines, daily oil massage (Abhyanga)
- **Herbs**: Ashwagandha, Shatavari, warm spices

## Winter (Hemant & Shishir Ritu)

**Time**: December-February

**Dominant Dosha**: Kapha-Vata

**Recommendations**:
- **Diet**: Warm, nourishing foods; soups, stews, warming spices
- **Exercise**: Maintain regular exercise to prevent stagnation
- **Lifestyle**: Keep warm, adequate rest, maintain healthy sleep routine
- **Herbs**: Ginger, cinnamon, tulsi (holy basil)

## Key Principle

Ayurveda teaches that "like increases like" and "opposites balance." During cold seasons, favor warm foods; during hot seasons, favor cooling foods.
`,
    summary: 'Learn how to adapt your lifestyle and diet according to seasons (Ritucharya) to maintain balance and prevent seasonal imbalances.',
    sources: [{ name: 'Charaka Samhita - Sutra Sthana', url: 'https://www.carakasamhitaonline.com' }, { name: 'Ashtanga Hridaya', url: 'https://ayurvedacollege.com' }],
    tags: ['ritucharya', 'seasonal', 'diet', 'lifestyle', 'prevention'],
    doshaRelevance: { vata: true, pitta: true, kapha: true },
    reviewedBy: 'Dr. Ayurvedic Practitioner',
    lastReviewed: new Date(),
    featured: true
  },
  {
    title: 'When to Seek Modern Medical Care: Red Flags',
    category: 'safety',
    body: `# When to Seek Modern Medical Care

**IMPORTANT**: While Ayurveda offers valuable wellness guidance, certain symptoms require immediate modern medical attention.

## 🚨 EMERGENCY - Call Emergency Services or Go to ER Immediately

### Cardiac Symptoms
- **Chest pain or pressure**
- Severe shortness of breath
- Pain radiating to arm, jaw, or back

### Neurological Symptoms
- **Sudden weakness or numbness** (especially one side)
- **Facial drooping**
- **Slurred speech or difficulty speaking**
- Sudden severe headache
- Loss of consciousness or fainting
- Seizures or convulsions

### Respiratory
- Severe difficulty breathing
- Choking or gasping for air
- Blue lips or fingernails

### Trauma
- Severe bleeding that won't stop
- Head injury with confusion or loss of consciousness
- Severe burns

### High Fever
- Fever >39.5°C (103°F) with:
  - Confusion or altered mental state
  - Stiff neck
  - Severe headache
  - Rigors (uncontrollable shaking)

### Abdominal
- Severe abdominal pain
- Vomiting blood or coffee-ground material
- Black, tarry, or bloody stools

### Allergic Reactions
- Swelling of face, lips, or tongue
- Throat closing or difficulty swallowing
- Severe hives with difficulty breathing
- Signs of anaphylaxis

### Poisoning
- Suspected poisoning or overdose
- Chemical ingestion

## ⚠️ See Doctor Within 24 Hours

- Moderate fever lasting >3 days
- Persistent vomiting or diarrhea
- New unexplained symptoms
- Worsening chronic condition
- Pregnancy-related concerns

## ⚕️ Consult Healthcare Provider Before Herbal Remedies If You Have:

- Pregnancy or breastfeeding
- Diabetes
- High blood pressure
- Heart disease
- Kidney or liver disease
- Taking blood thinners or immunosuppressants
- Scheduled for surgery

## Ayurveda's Role

Ayurveda excels in:
- **Prevention and wellness**
- **Chronic condition management** (with medical supervision)
- **Lifestyle optimization**
- **Stress management**
- **Digestive health**

Ayurveda is **complementary**, not alternative to emergency care.

**Remember**: When in doubt, seek professional medical evaluation. Your safety is paramount.
`,
    summary: 'Critical information about when to seek immediate modern medical care. Includes red flag symptoms that require emergency attention.',
    sources: [
      { 
        name: 'WHO Emergency Care Guidelines', 
        url: 'https://www.who.int/news-room/fact-sheets/detail/emergency-care-systems'
      },
      { 
        name: 'American College of Emergency Physicians - When to Go to the ER', 
        url: 'https://www.acep.org/patient-care/when-to-go-to-er/'
      }
    ],
    tags: ['safety', 'emergency', 'red flags', 'medical care', 'urgent'],
    contraindications: [],
    reviewedBy: 'Dr. Emergency Medicine Specialist & Ayurvedic Practitioner',
    lastReviewed: new Date(),
    featured: true
  },
  {
    title: 'Dinacharya: Daily Ayurvedic Routine',
    category: 'dinacharya',
    body: `# Dinacharya: The Ayurvedic Daily Routine

Dinacharya (daily routine) is a cornerstone of Ayurvedic health maintenance. Following nature's rhythms helps maintain dosha balance.

## Morning Routine (6 AM - 10 AM - Kapha Time)

### 1. Wake Up Early (Brahma Muhurta)
- Ideal time: 5:30-6:00 AM
- Benefits: Mental clarity, spiritual growth

### 2. Elimination
- Drink warm water to stimulate bowel movement
- Establish regular elimination time

### 3. Oral Hygiene
- **Tongue scraping**: Removes toxins (ama)
- **Oil pulling**: Swish sesame or coconut oil for 5-10 minutes
- Brush teeth with herbal powder

### 4. Abhyanga (Self-Massage)
- Warm sesame oil (Vata), coconut oil (Pitta), sunflower oil (Kapha)
- Massage entire body for 5-15 minutes
- Wait 20 minutes, then warm shower

### 5. Exercise
- Moderate exercise (50% capacity)
- Yoga asanas and pranayama
- Walking in nature

### 6. Meditation
- 10-20 minutes of quiet reflection
- Pranayama (breathing exercises)

### 7. Breakfast
- Warm, nourishing, easy to digest
- Eaten mindfully and sitting down

## Midday (10 AM - 2 PM - Pitta Time)

- **Lunch**: Largest meal of the day
- Eat in peaceful environment
- Rest 5-10 minutes after eating (no napping)

## Afternoon (2 PM - 6 PM - Vata Time)

- Work and creative activities
- Light snack if needed
- Avoid cold drinks and food

## Evening (6 PM - 10 PM - Kapha Time)

### Dinner
- Lighter than lunch
- Eat 3 hours before bedtime
- Warm, cooked food

### Wind Down
- Gentle activities
- Family time
- No screens 1 hour before bed

### Bedtime Routine
- Light self-massage
- Herbal tea (chamomile, tulsi)
- Oil feet (especially for Vata)
- Sleep by 10 PM

## Night (10 PM - 6 AM)

**Sleep**: 7-8 hours
**Best position**: Left side (aids digestion)

## Key Principles

1. **Consistency**: Follow routine daily
2. **Adaptation**: Adjust for your dosha and season
3. **Mindfulness**: Be present in each activity

**Note**: These are general guidelines. Consult an Ayurvedic practitioner for personalized recommendations.
`,
    summary: 'Complete guide to Dinacharya - the Ayurvedic daily routine that aligns with natural rhythms for optimal health and balance.',
    sources: [{ name: 'Ashtanga Hridaya', url: 'https://ayurvedacollege.com' }, { name: 'Charaka Samhita', url: 'https://www.carakasamhitaonline.com' }],
    tags: ['dinacharya', 'daily routine', 'lifestyle', 'morning routine', 'self-care'],
    doshaRelevance: { vata: true, pitta: true, kapha: true },
    reviewedBy: 'Dr. Ayurvedic Practitioner',
    lastReviewed: new Date(),
    featured: false
  },
  {
    title: 'Common Ayurvedic Herbs: Uses and Safety',
    category: 'herbs',
    body: `# Common Ayurvedic Herbs

## ⚠️ IMPORTANT SAFETY NOTICE

**Always consult a qualified healthcare provider before using herbal remedies, especially if you are:**
- Pregnant or breastfeeding
- Taking medications
- Have chronic health conditions
- Planning surgery

## Popular Ayurvedic Herbs

### 1. Ashwagandha (Withania somnifera)
**Uses**: Stress reduction, energy, immune support

**Properties**: Adaptogen, rejuvenative, nervine tonic

**Dosage**: 300-500mg twice daily

**Contraindications**:
- Pregnancy
- Hyperthyroidism
- Nightshade allergy

### 2. Turmeric (Curcuma longa)
**Uses**: Anti-inflammatory, digestive aid, antioxidant

**Properties**: Heating, bitter, pungent

**Dosage**: 500-1000mg daily (with black pepper for absorption)

**Contraindications**:
- Blood thinners
- Gallbladder issues
- Before surgery (stop 2 weeks prior)

### 3. Triphala
**Uses**: Digestive health, detoxification, antioxidant

**Composition**: Amalaki, Bibhitaki, Haritaki

**Dosage**: 500mg-1g before bed

**Contraindications**:
- Pregnancy
- Diarrhea
- Inflammatory bowel disease

### 4. Tulsi / Holy Basil (Ocimum sanctum)
**Uses**: Immune support, respiratory health, stress

**Properties**: Adaptogen, antimicrobial

**Dosage**: Tea (2-3 cups daily) or 300-600mg capsules

**Contraindications**:
- Pregnancy (large amounts)
- Blood thinners
- Diabetes medications (monitor blood sugar)

### 5. Ginger (Zingiber officinale)
**Uses**: Digestion, nausea, inflammation

**Properties**: Heating, stimulating

**Dosage**: Fresh (1-2g), dried powder (250-1000mg)

**Contraindications**:
- Bleeding disorders
- Before surgery
- Gallstones

### 6. Brahmi (Bacopa monnieri)
**Uses**: Memory, cognitive function, anxiety

**Properties**: Cooling, nervine tonic

**Dosage**: 300-450mg daily

**Contraindications**:
- Slow heart rate
- Thyroid medications
- May cause drowsiness

## General Safety Guidelines

1. **Start Low, Go Slow**: Begin with small doses
2. **Quality Matters**: Use organic, tested products
3. **Drug Interactions**: Check with pharmacist
4. **Watch for Reactions**: Discontinue if adverse effects
5. **Not for Self-Diagnosis**: Consult practitioners

## When to Stop and Consult Doctor

- Allergic reactions
- Digestive upset
- Headaches
- Any unusual symptoms

**Remember**: Herbs are medicine. Use responsibly under professional guidance.
`,
    summary: 'Overview of common Ayurvedic herbs, their uses, dosages, and important safety information including contraindications.',
    sources: [{ name: 'Ayurvedic Pharmacopoeia of India', url: 'http://www.ayurveda.hu/api/' }, { name: 'WHO Monographs', url: 'https://www.who.int/publications' }],
    tags: ['herbs', 'remedies', 'safety', 'ashwagandha', 'turmeric', 'triphala'],
    contraindications: [
      { condition: 'Pregnancy', warning: 'Many herbs are contraindicated during pregnancy' },
      { condition: 'Blood thinners', warning: 'Several herbs interact with anticoagulants' },
      { condition: 'Surgery', warning: 'Stop most herbs 2 weeks before surgery' }
    ],
    reviewedBy: 'Dr. Clinical Herbalist & Ayurvedic Practitioner',
    lastReviewed: new Date(),
    featured: false
  }
];

const seedArticles = async () => {
  try {
    await connectDB();

    // Clear existing articles
    await Article.deleteMany({});
    console.log('✅ Existing articles cleared');

    // Generate slugs for articles
    const articlesWithSlugs = sampleArticles.map(article => ({
      ...article,
      slug: article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    }));

    // Insert sample articles
    const articles = await Article.insertMany(articlesWithSlugs);
    console.log(`✅ ${articles.length} sample articles inserted successfully`);

    console.log('\n📚 Sample Articles:');
    articles.forEach(article => {
      console.log(`  - ${article.title} (${article.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding articles:', error);
    process.exit(1);
  }
};

// Run seeder
seedArticles();

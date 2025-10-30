// Seed script to populate Ayurvedic reference data in Articles collection
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Article from './models/Article.js';
import connectDB from './config/database.js';

dotenv.config();
connectDB();

// Ayurvedic Glossary Data
const glossaryData = {
  title: "Ayurvedic Glossary & Sanskrit Terms",
  slug: "ayurvedic-glossary-reference",
  category: "general",
  body: "Comprehensive glossary of Ayurvedic and Sanskrit terms for reference.",
  summary: "A comprehensive guide to essential Ayurvedic terminology and Sanskrit concepts.",
  reviewedBy: "AyurAI Medical Team",
  tags: ["glossary", "sanskrit", "reference", "education"],
  content: JSON.stringify([
    {
      term: "Agni",
      sanskrit: "अग्नि",
      transliteration: "Agni",
      definition: "Digestive fire; the metabolic force that transforms food into energy, consciousness, and body tissues. Central to health in Ayurveda."
    },
    {
      term: "Ama",
      sanskrit: "आम",
      transliteration: "Ama",
      definition: "Toxic residue formed from incomplete digestion or unprocessed emotions. Appears as thick tongue coating, fatigue, and heaviness."
    },
    {
      term: "Dosha",
      sanskrit: "दोष",
      transliteration: "Dosha",
      definition: "Bio-energetic forces (Vata, Pitta, Kapha) governing all physiological and psychological functions in the body and mind."
    },
    {
      term: "Vata",
      sanskrit: "वात",
      transliteration: "Vata",
      definition: "Air + Space element. Governs movement, circulation, breathing, and nervous system. Qualities: dry, light, cold, mobile, rough."
    },
    {
      term: "Pitta",
      sanskrit: "पित्त",
      transliteration: "Pitta",
      definition: "Fire + Water element. Governs transformation, metabolism, digestion, and intellect. Qualities: hot, sharp, oily, light, spreading."
    },
    {
      term: "Kapha",
      sanskrit: "कफ",
      transliteration: "Kapha",
      definition: "Water + Earth element. Governs structure, lubrication, immunity, and stability. Qualities: heavy, slow, cool, oily, smooth."
    },
    {
      term: "Prakriti",
      sanskrit: "प्रकृति",
      transliteration: "Prakriti",
      definition: "Birth constitution; your unique dosha combination at conception that remains constant throughout life. Determines ideal diet and lifestyle."
    },
    {
      term: "Vikriti",
      sanskrit: "विकृति",
      transliteration: "Vikriti",
      definition: "Current state of imbalance; temporary deviation from your natural Prakriti caused by lifestyle, season, or stress."
    },
    {
      term: "Ojas",
      sanskrit: "ओजस्",
      transliteration: "Ojas",
      definition: "Vital essence; the subtle energy of immunity, vitality, and radiance produced from perfect digestion and positive emotions."
    },
    {
      term: "Prana",
      sanskrit: "प्राण",
      transliteration: "Prana",
      definition: "Life force energy governing breath, circulation, consciousness, and sensory perception. Sub-type of Vata."
    },
    {
      term: "Dhatu",
      sanskrit: "धातु",
      transliteration: "Dhatu",
      definition: "Seven body tissues: Rasa (plasma), Rakta (blood), Mamsa (muscle), Meda (fat), Asthi (bone), Majja (marrow), Shukra (reproductive)."
    },
    {
      term: "Srotas",
      sanskrit: "स्रोतस्",
      transliteration: "Srotas",
      definition: "Body channels or pathways through which nutrients, waste, energy, and information flow. Health requires clear, unobstructed srotas."
    },
    {
      term: "Rasayana",
      sanskrit: "रसायन",
      transliteration: "Rasayana",
      definition: "Rejuvenation therapy; herbs, foods, and practices that promote longevity, enhance Ojas, and slow aging."
    },
    {
      term: "Panchakarma",
      sanskrit: "पञ्चकर्म",
      transliteration: "Panchakarma",
      definition: "Five purification procedures for deep detoxification: Vamana, Virechana, Basti, Nasya, Raktamokshana. Done under expert supervision."
    },
    {
      term: "Dinacharya",
      sanskrit: "दिनचर्या",
      transliteration: "Dinacharya",
      definition: "Daily routine aligned with natural circadian rhythms to maintain dosha balance and optimal health."
    },
    {
      term: "Ritucharya",
      sanskrit: "ऋतुचर्या",
      transliteration: "Ritucharya",
      definition: "Seasonal routine adjusting diet and lifestyle according to six Ayurvedic seasons to prevent dosha accumulation."
    },
    {
      term: "Ahara",
      sanskrit: "आहार",
      transliteration: "Ahara",
      definition: "Food and diet; one of the three pillars of health in Ayurveda (along with sleep and celibacy/moderation)."
    },
    {
      term: "Vihara",
      sanskrit: "विहार",
      transliteration: "Vihara",
      definition: "Lifestyle and daily conduct; behavioral choices affecting health including exercise, sleep, and social interactions."
    },
    {
      term: "Abhyanga",
      sanskrit: "अभ्यङ्ग",
      transliteration: "Abhyanga",
      definition: "Self-massage with warm oil (usually sesame). Daily practice that calms Vata, nourishes skin, and promotes circulation."
    },
    {
      term: "Ghee",
      sanskrit: "घृत",
      transliteration: "Ghrita/Ghee",
      definition: "Clarified butter; considered most sattvic (pure) fat. Kindles Agni without aggravating Pitta. Carries herbs deep into tissues."
    }
  ])
};

// Sanskrit Quotes Data - Expanded to 35+ quotes
const quotesData = {
  title: "Ayurvedic Sanskrit Wisdom & Daily Quotes",
  slug: "ayurvedic-sanskrit-quotes",
  category: "general",
  body: "Collection of inspirational Sanskrit verses and Ayurvedic wisdom for daily motivation.",
  summary: "Sanskrit quotes from classical Ayurvedic texts with transliteration and meaning.",
  reviewedBy: "AyurAI Medical Team",
  tags: ["quotes", "sanskrit", "wisdom", "inspiration"],
  content: JSON.stringify([
    {
      sanskrit: "शरीरमाद्यं खलु धर्मसाधनम्",
      transliteration: "Shareeram Aadyam Khalu Dharmasadhanam",
      meaning: "The body is indeed the primary instrument for all pursuits of life and righteousness.",
      source: "Charaka Samhita"
    },
    {
      sanskrit: "रोगाः सर्वेऽपि मन्दाग्नौ",
      transliteration: "Rogah Sarve Api Mandagnau",
      meaning: "All diseases originate from weak digestive fire (Agni).",
      source: "Ayurvedic Principle"
    },
    {
      sanskrit: "नित्यं हिताहारविहारसेवी",
      transliteration: "Nityam Hita-Ahara-Vihara-Sevi",
      meaning: "One who follows wholesome diet and lifestyle daily remains healthy and lives long.",
      source: "Charaka Samhita"
    },
    {
      sanskrit: "वायुः पित्तं कफश्चेति त्रयो दोषाः समासतः",
      transliteration: "Vaayuh Pittam Kaphas Cheeti Trayo Doshaah Samaasatah",
      meaning: "Vata, Pitta, and Kapha — the three doshas — govern the entire body in balance.",
      source: "Ashtanga Hridaya"
    },
    {
      sanskrit: "समदोषः समाग्निश्च समधातु मलक्रियः। प्रसन्नात्मेन्द्रियमनः स्वस्थ इत्यभिधीयते॥",
      transliteration: "Samadoshah Samaagnishcha Samadhatu Malakriyah | Prasannatmendriyamanah Swastha Ityabhidheeyate",
      meaning: "One with balanced doshas, balanced Agni, balanced tissues, proper elimination, and happy soul, senses, and mind is called healthy (Swastha).",
      source: "Sushruta Samhita"
    },
    {
      sanskrit: "आयुः कामयमानेन धर्मार्थसुखसाधनम्",
      transliteration: "Aayuh Kaamayamaanena Dharmaartha Sukhasaadhanam",
      meaning: "For one desiring long life, Ayurveda is the means to achieve righteousness, prosperity, and happiness.",
      source: "Charaka Samhita"
    },
    {
      sanskrit: "प्रज्ञापराधं विवर्जयेत्",
      transliteration: "Prajnaapaaradham Vivarjayet",
      meaning: "Avoid crimes against wisdom. The root cause of disease is ignoring the body's signals.",
      source: "Charaka Samhita"
    },
    {
      sanskrit: "अग्निः कायस्य मूलम्",
      transliteration: "Agnih Kaayasya Moolam",
      meaning: "Agni (digestive fire) is the root foundation of the body.",
      source: "Charaka Samhita"
    },
    {
      sanskrit: "त्रयोपस्तम्भा आहारः स्वप्नो ब्रह्मचर्यमिति",
      transliteration: "Trayopastambhaa Aaharah Swapno Brahmacharyamiti",
      meaning: "The three pillars of life are: proper diet, adequate sleep, and moderation in conduct.",
      source: "Charaka Samhita"
    },
    {
      sanskrit: "यद् ब्रह्माण्डे तद् पिण्डे",
      transliteration: "Yad Brahmaande Tad Pinde",
      meaning: "As is the macrocosm (universe), so is the microcosm (individual). We are a reflection of nature.",
      source: "Ayurvedic Philosophy"
    },
    {
      sanskrit: "यावत् स्वस्थो न रुज्यते",
      transliteration: "Yaavat Swastho Na Rujyate",
      meaning: "As long as one remains healthy, one should not be negligent. Prevention is superior to cure.",
      source: "Ayurvedic Maxim"
    },
    {
      sanskrit: "आहारशुद्धौ सत्त्वशुद्धिः",
      transliteration: "Aaharashuddhou Sattvashuddhih",
      meaning: "When food is pure, the mind becomes pure. Pure diet leads to pure consciousness.",
      source: "Chandogya Upanishad"
    },
    {
      sanskrit: "सुखमात्यन्तिकं यत्तद् बुद्धिग्राह्यमतीन्द्रियम्",
      transliteration: "Sukham Aatyantikam Yat Tad Buddhigraahyam Ateendriyam",
      meaning: "That ultimate happiness which is grasped by the intellect and transcends the senses.",
      source: "Bhagavad Gita"
    },
    {
      sanskrit: "सत्त्वं रजस्तम इति गुणाः प्रकृतिसंभवाः",
      transliteration: "Sattvam Rajas Tama Iti Gunaah Prakritisambhavaah",
      meaning: "Sattva (purity), Rajas (activity), and Tamas (inertia) — the three mental qualities arising from nature.",
      source: "Bhagavad Gita"
    },
    {
      sanskrit: "स्वस्थस्य स्वास्थ्य रक्षणं आतुरस्य विकार प्रशमनं",
      transliteration: "Swasthasya Swasthya Rakshanam Aaturasya Vikaara Prashamanam",
      meaning: "Maintain the health of the healthy and cure the ailments of the diseased.",
      source: "Charaka Samhita"
    },
    {
      sanskrit: "बुद्धिः कर्मानुसारिणी",
      transliteration: "Buddhih Karmānusārinī",
      meaning: "Intelligence follows action. Our wisdom grows through practice and experience.",
      source: "Sanskrit Wisdom"
    },
    {
      sanskrit: "नास्ति मूलमनौषधम्",
      transliteration: "Naasti Moolam Anaushadham",
      meaning: "There is no plant without medicinal value. Nature provides healing in every herb.",
      source: "Charaka Samhita"
    },
    {
      sanskrit: "ओजो बलं च देहस्य",
      transliteration: "Ojo Balam Cha Dehasya",
      meaning: "Ojas is the strength and vitality of the body.",
      source: "Ayurvedic Texts"
    },
    {
      sanskrit: "यथा पिंडे तथा ब्रह्माण्डे",
      transliteration: "Yatha Pinde Tatha Brahmaande",
      meaning: "As within the body, so within the universe. The microcosm reflects the macrocosm.",
      source: "Vedic Philosophy"
    },
    {
      sanskrit: "मनः शान्तं समाहितम्",
      transliteration: "Manah Shaantam Samaahitam",
      meaning: "A peaceful mind is a focused mind. Mental tranquility is the foundation of health.",
      source: "Yoga Philosophy"
    },
    {
      sanskrit: "प्राणायामः शुद्धिकरः",
      transliteration: "Praanaayaamah Shuddhikarah",
      meaning: "Pranayama (breath control) purifies the body and mind.",
      source: "Yoga Texts"
    },
    {
      sanskrit: "अन्नं ब्रह्म रसो विष्णुः भोक्ता देवो महेश्वरः",
      transliteration: "Annam Brahma Raso Vishnuh Bhokta Devo Maheshwarah",
      meaning: "Food is divine, its essence is life force, and the consumer is consciousness itself.",
      source: "Ayurvedic Blessing"
    },
    {
      sanskrit: "निद्रा स्वास्थ्यस्य रक्षकः",
      transliteration: "Nidraa Swaasthyasya Rakshakah",
      meaning: "Sleep is the guardian of health. Proper rest restores balance.",
      source: "Ayurvedic Wisdom"
    },
    {
      sanskrit: "व्यायामात् लभते स्वास्थ्यम्",
      transliteration: "Vyaayaamaat Labhate Swaasthyam",
      meaning: "Through exercise, one attains health. Movement is medicine.",
      source: "Ayurvedic Principle"
    },
    {
      sanskrit: "क्षमा परमं बलम्",
      transliteration: "Kshamaa Paramam Balam",
      meaning: "Forgiveness is the supreme strength. Letting go heals the heart.",
      source: "Sanskrit Wisdom"
    },
    {
      sanskrit: "आरोग्यं परमं लाभः",
      transliteration: "Aarogyam Paramam Laabhah",
      meaning: "Health is the greatest wealth. All prosperity begins with wellbeing.",
      source: "Sanskrit Saying"
    },
    {
      sanskrit: "मितं सात्त्विकं भोजनम्",
      transliteration: "Mitam Saattvikam Bhojanam",
      meaning: "Eat pure food in moderation. Balance in diet brings balance in life.",
      source: "Bhagavad Gita"
    },
    {
      sanskrit: "प्रातः कालं स्मरेत् धर्मम्",
      transliteration: "Praatah Kaalam Smaret Dharmam",
      meaning: "Remember righteousness in the morning. Begin each day with intention.",
      source: "Vedic Tradition"
    },
    {
      sanskrit: "शीतोष्णसुखदुःखेषु समो भूत्वा",
      transliteration: "Sheetoshna-Sukha-Duhkheshu Samo Bhootvaa",
      meaning: "Remain balanced in cold and heat, pleasure and pain. Equanimity is true strength.",
      source: "Bhagavad Gita"
    },
    {
      sanskrit: "स्वस्थ इन्द्रियमनाः प्रसन्नः",
      transliteration: "Swastha Indriyamanah Prasannah",
      meaning: "Healthy senses, mind, and spirit lead to true happiness.",
      source: "Charaka Samhita"
    },
    {
      sanskrit: "रसादीनां धातूनां वर्धनम्",
      transliteration: "Rasaadeenaam Dhaatuunaam Vardhanam",
      meaning: "Nourishment of body tissues begins with plasma (rasa). Build from the foundation.",
      source: "Ayurvedic Physiology"
    },
    {
      sanskrit: "योगः कर्मसु कौशलम्",
      transliteration: "Yogah Karmasu Kaushalam",
      meaning: "Yoga is skill in action. Mindful living is the greatest practice.",
      source: "Bhagavad Gita"
    },
    {
      sanskrit: "सर्वे भवन्तु सुखिनः",
      transliteration: "Sarve Bhavantu Sukhinah",
      meaning: "May all beings be happy. Compassion heals both giver and receiver.",
      source: "Sanskrit Prayer"
    },
    {
      sanskrit: "अतिसर्वत्र वर्जयेत्",
      transliteration: "Atisarvatra Varjayet",
      meaning: "Avoid excess in everything. Moderation is the key to lasting health.",
      source: "Charaka Samhita"
    },
    {
      sanskrit: "मनसः शान्तिः परमा सिद्धिः",
      transliteration: "Manasah Shaantih Paramaa Siddhih",
      meaning: "Peace of mind is the supreme achievement. Inner calm is ultimate success.",
      source: "Yoga Wisdom"
    }
  ])
};

// Function to seed data
const seedReferenceData = async () => {
  try {
    // Delete existing reference articles by both slug and title
    await Article.deleteMany({ 
      $or: [
        { slug: glossaryData.slug },
        { title: glossaryData.title }
      ]
    });
    await Article.create(glossaryData);
    console.log('✅ Glossary data updated successfully');
    
    await Article.deleteMany({ 
      $or: [
        { slug: quotesData.slug },
        { title: quotesData.title }
      ]
    });
    await Article.create(quotesData);
    console.log('✅ Sanskrit quotes data updated successfully (35 quotes)');
    
    console.log('🌿 Reference data seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding reference data:', error);
    process.exit(1);
  }
};

seedReferenceData();

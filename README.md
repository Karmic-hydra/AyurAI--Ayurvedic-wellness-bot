# 🌿 AyurAI - Ayurvedic Health Advisor

An intelligent Ayurvedic health consultation platform powered by AI, combining 5000+ years of Ayurvedic wisdom with modern conversational AI.

## ✨ Core Features

- 🤖 **AI-Powered Consultations**: Chat with OpenAI GPT-4o-mini for personalized Ayurvedic advice
- 🗣️ **Voice Interaction**: Speech-to-text (Indian English optimized) and text-to-speech with Ayurvedic pronunciation
- 🧬 **Prakriti Assessment**: Auto-detecting constitution (Vata, Pitta, Kapha) through conversations
- 🪷 **Wellness Card**: Custom Ayurvedic wellness profile based on birth details (zodiac-dosha integration)
- 🍽️ **Personalized Diet Recommendations**: Dosha-specific food suggestions with detailed guidelines
- 📊 **Interactive Quiz**: In-app Prakriti assessment with instant results
- 📚 **Knowledge Base**: Curated Ayurvedic articles with proper references
- 👤 **User Profiles**: Track your constitution, consultations, and wellness cards
- 🔒 **Secure Authentication**: Session-based user management

## 🌟 Enhanced Features

### 🌺 Seasonal Intelligence (Ritucharya)
- **Auto-Detects Current Season**: Automatically identifies which of the 6 Ayurvedic seasons (Ritus) you're in
- **Adaptive Recommendations**: All dietary and lifestyle advice adapts to seasonal dosha influences
- **Visual Season Badge**: See current Ritu at top of chat with seasonal guidance tooltip
- **Seasons Covered**:
  - Vasanta (Spring) - Mar-Apr: Light foods, detoxification for Kapha
  - Grishma (Summer) - May-Jun: Cooling foods, hydration for Pitta
  - Varsha (Monsoon) - Jul-Aug: Warm, digestible foods for weak Agni
  - Sharad (Autumn) - Sep-Oct: Bitter herbs, Pitta management
  - Hemanta (Early Winter) - Nov-Dec: Nourishing, strength-building foods
  - Shishira (Late Winter) - Jan-Feb: Warm oils, sweet/sour tastes

### 🌿 Herbal Companion Recommender
- **Kitchen Medicine**: Every response includes a safe, common pantry ingredient recommendation
- **Dosha-Specific**: Turmeric for Kapha, coconut water for Pitta, ginger for Vata
- **Practical Healing**: Simple daily practices with household items (no prescriptions)
- **Rationale Included**: Clear Ayurvedic explanation of why each ingredient helps

### 🪷 Wellness Card (Jataka-Ayurveda Integration)
- **Birth-Based Analysis**: Generate personalized wellness profile from birth date, time, and location
- **No External APIs**: Custom calculation system based on Vedic astrology principles
- **Astro-Ayurvedic Type**: Combines zodiac signs with dosha mapping for holistic constitution
- **Comprehensive Profile**:
  - Sun Sign, Moon Sign (Rashi), Ascendant (Lagna)
  - Dominant Element (Fire, Earth, Air, Water)
  - Ruling Planet and planetary influences
  - Personalized traits and characteristics
  - Dosha-specific balance tips
  - Daily Sanskrit mantra for wellness
- **Saved to Profile**: Wellness card stored in separate Wellness collection for easy access

### 📖 Interactive Glossary System
- **Hover-to-Learn**: Sanskrit terms (Dosha, Agni, Ama, Prakriti) show instant definitions
- **Stored in Database**: Glossary maintained as an Article category for easy updates
- **Transliteration + Meaning**: Both pronunciation and clear English explanation
- **Progressive Learning**: Build Ayurvedic vocabulary naturally while chatting

### 🪷 Daily Sanskrit Wisdom
- **Morning Greeting**: Each session opens with an authentic Sanskrit verse
- **Triple Display**: Original Devanagari + Transliteration + English meaning
- **Classical Sources**: Verses from Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya
- **Rotating Collection**: 50+ verses stored in Articles database for variety
- **Educational & Inspiring**: Connects users to Ayurveda's philosophical roots

### ⏱️ 1-Minute Balance Practice
- **Quick Wellness Button**: Instant access to micro-practices adapted to time/season
- **Breathwork & Awareness**: Simple pranayama or mindfulness exercises
- **Personalized Timing**: Morning energizers, evening wind-downs, seasonal adjustments
- **Save Favorites**: Bookmark practices that resonate for daily routine

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key (free tier: $5 credit for 3 months)

### Installation

1. **Navigate to Project**
```bash
cd AyurAI-first
```

2. **Install Dependencies**
```bash
# Install root dependencies (concurrently for running both servers)
npm install

# Install backend dependencies
npm run install:backend

# Install frontend dependencies
npm run install:frontend
```

3. **Configure Environment**

Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Note**: No external astrology API keys required - wellness card uses custom calculations!

4. **Seed Database** (Optional - adds 5 sample articles)
```bash
npm run seed
```

5. **Start Development Servers**

**Option 1: Run both servers together** ⭐ Recommended
```bash
npm run dev
```

**Option 2: Run separately**
```bash
# Terminal 1: Backend
npm run dev:backend

# Terminal 2: Frontend
npm run dev:frontend
```

6. **Open Browser**
```
http://localhost:5173
```

## 📁 Project Structure

```
AyurAI-first/
├── backend/                      # Express.js API server
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── openai.js            # OpenAI GPT configuration (1,800 token optimized prompt)
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── chatController.js    # AI chat with personalization & history
│   │   ├── profileController.js # Profile management + wellness card generation
│   │   └── articleController.js # Article CRUD (includes glossary & quotes)
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   └── validation.js        # Input validation
│   ├── models/
│   │   ├── User.js              # User schema with Prakriti
│   │   ├── Consultation.js      # Chat history
│   │   ├── Article.js           # Knowledge base (articles, glossary, quotes)
│   │   └── Wellness.js          # Wellness card data (separate collection)
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   ├── chat.js              # Chat endpoints
│   │   ├── profile.js           # Profile endpoints
│   │   └── articles.js          # Article endpoints (includes glossary API)
│   ├── utils/
│   │   ├── contextBuilder.js         # AI context building (OpenAI format)
│   │   ├── seasonDetector.js         # Ritucharya season detection
│   │   ├── kitchenHerbs.js          # Kitchen ingredient lookup
│   │   ├── userContextAnalyzer.js    # User profiling
│   │   ├── dietaryRecommendations.js # Dosha-based diet
│   │   ├── redFlags.js               # Safety checks
│   │   └── astrologyService.js       # Custom wellness calculations (no external APIs)
│   ├── .env                     # Environment variables (create this)
│   ├── server.js                # Express server entry point
│   ├── seedArticles.js          # Database seeding script
│   └── package.json             # Backend dependencies
│
├── frontend/                     # React + Vite application
│   ├── public/
│   │   └── favicon.svg          # Custom green leaf favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── PrakritiQuiz.jsx # Interactive quiz modal
│   │   │   ├── Loading.jsx      # Loading spinner
│   │   │   ├── Disclaimer.jsx   # Legal disclaimer
│   │   │   ├── GlossaryWrapper.jsx      # Sanskrit term hover definitions
│   │   │   ├── SeasonalBadge.jsx        # Current Ritu display
│   │   │   ├── SanskritQuoteGreeting.jsx # Daily wisdom greeting
│   │   │   ├── BalanceRitual.jsx        # 1-min practice button
│   │   │   └── WellnessCard.jsx         # Wellness card display component
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Register.jsx     # Registration page
│   │   │   ├── Chat.jsx         # AI consultation with voice I/O
│   │   │   ├── Profile.jsx      # User profile + Prakriti display + Wellness Card
│   │   │   ├── Articles.jsx     # Article listing (includes glossary section)
│   │   │   ├── ArticleView.jsx  # Article reader
│   │   │   └── Diet.jsx         # Diet recommendations
│   │   ├── hooks/
│   │   │   ├── useSpeechRecognition.js  # Voice input (en-IN)
│   │   │   └── useTextToSpeech.js       # Voice output with Ayurvedic pronunciations
│   │   ├── services/
│   │   │   └── api.js           # Axios API client
│   │   ├── utils/
│   │   │   ├── helpers.js       # Utility functions
│   │   │   ├── glossary.js      # Glossary data and definitions
│   │   │   └── glossaryRenderer.js # Glossary rendering logic
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Tailwind styles
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── postcss.config.js        # PostCSS configuration
│   └── package.json             # Frontend dependencies
│
├── package.json                 # Root package with convenience scripts
├── README.md                    # This file
└── PRAKRITI_QUIZ_FEATURE.md    # Quiz implementation documentation
```

## 🎯 Usage Guide

### 1. Register/Login
- Navigate to http://localhost:5173
- Click "Register" to create an account
- Or login with existing credentials

### 2. Take Prakriti Quiz (Optional but Recommended)
- Go to **Profile** page
- Click **"Take Prakriti Quiz"** button
- Answer 8 simple questions about your body and mind
- Results are automatically saved to your profile
- View your Vata, Pitta, Kapha percentages

### 3. Chat with AI
- Navigate to **Chat** page
- Describe your health concerns, symptoms, or ask questions
- AI provides personalized Ayurvedic advice based on your Prakriti
- Includes:
  - Specific food recommendations (e.g., "eat warm oats with bananas")
  - Lifestyle tips (e.g., "sleep by 10 PM")
  - Herbal remedies
  - Dosha-balancing practices

### 4. View Articles
- Browse curated Ayurvedic knowledge in **Articles** section
- Topics include:
  - Introduction to Tridosha
  - Ritucharya (Seasonal Routines)
  - Dinacharya (Daily Routines)
  - Common Ayurvedic Herbs
  - When to Seek Modern Medical Care
- All articles include proper references with clickable URLs

### 5. Track Your Profile
- View your Prakriti percentages (Vata, Pitta, Kapha)
- See consultation history
- Update personal information
- Click **"Refresh"** to update Prakriti after chatting

## 🔧 Available Scripts

From the **root directory** (`AyurAI-first/`):

```bash
# Install all dependencies (root + backend + frontend)
npm run install:all

# Run both servers concurrently (recommended for development)
npm run dev

# Run backend only (port 5000)
npm run dev:backend

# Run frontend only (port 5173)
npm run dev:frontend

# Seed database with 5 sample articles
npm run seed

# Build frontend for production
npm run build:frontend

# Start backend in production mode
npm run start:backend
```

## 🌟 Key Features Explained

### 🧬 Prakriti Auto-Detection

The system automatically detects your Ayurvedic constitution through conversation:

1. **Keyword Analysis**: Detects words like "dry", "cold", "hot", "heavy", etc.
2. **Score Calculation**: Assigns points to Vata, Pitta, Kapha
3. **Normalization**: Converts to percentages (total = 100%)
4. **Profile Update**: Saves to MongoDB
5. **Personalized Advice**: AI uses your Prakriti for recommendations

**Example**:
- User: "I have dry skin and feel cold"
- System detects: Vata keywords
- Updates: Vata 60%, Pitta 30%, Kapha 10%
- AI suggests: "Add ghee to meals, drink warm ginger tea, avoid cold foods"

### 🍽️ Personalized Diet Recommendations

Based on your dominant dosha:

**Vata (Air + Ether)**
- Eat: Warm, moist foods (oats, bananas, cooked vegetables, ghee)
- Avoid: Cold, dry foods (raw salads, iced drinks, crackers)
- Spices: Ginger, black pepper, cinnamon, cumin

**Pitta (Fire + Water)**
- Eat: Cool, sweet foods (cucumbers, melons, coconut, leafy greens)
- Avoid: Spicy, sour foods (chili, tomatoes, vinegar, alcohol)
- Spices: Coriander, fennel, cardamom, mint

**Kapha (Water + Earth)**
- Eat: Spicy, light foods (vegetables, whole grains, apples, pears)
- Avoid: Heavy, fatty foods (fried foods, dairy, sweets, nuts)
- Spices: Ginger, black pepper, cayenne, mustard

### 📊 Interactive Prakriti Quiz

**8 Questions covering**:
1. Body frame and weight tendencies
2. Skin type and texture
3. Digestion and appetite patterns
4. Sleep quality and duration
5. Energy levels throughout day
6. Emotional tendencies
7. Climate preferences
8. Stress response patterns

**Results**: Instant calculation of Vata/Pitta/Kapha percentages saved to profile

### 🤖 AI Context Awareness

The chatbot remembers and considers:
- ✅ Your conversation history (last 10 consultations)
- ✅ Recurring health concerns
- ✅ Health progress over time
- ✅ Current medications and allergies
- ✅ Seasonal and time-of-day context
- ✅ Your dominant dosha and imbalances
- ✅ Previous symptoms and follow-ups


**Important Notes**:
- Replace `username:password` with your MongoDB credentials
- Get OpenAI API key from https://platform.openai.com/api-keys
- Free tier: $5 credit (expires after 3 months), supports ~15,000 messages
- Encode special characters in password (@ → %40)
- **No external astrology API keys required** - wellness card uses custom calculations

### Cost Optimization
**Current Configuration (Free Tier Friendly)**:
- System Prompt: ~1,800 tokens (ultra-compressed)
- Per Request: ~3,600 tokens total (prompt + context + response)
- Cost per message: ~$0.00065
- $5 credit lasts: ~15,000 messages or 750 users (20 messages each)
- Perfect for: Testing, demos, small-scale deployment

**Upgrade Option Available**:
- Full prompt archived in `backend/config/openai.js` comments
- 8,500 tokens for maximum Ayurvedic depth
- Use when scaling beyond free tier

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database (MongoDB Atlas)
- **Mongoose** - Object Data Modeling (ODM)
- **OpenAI GPT-4o-mini** - AI language model (cost-optimized with 1,800 token prompt)
- **Custom Wellness System** - Zodiac-to-dosha calculations (no external APIs)
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Marked** - Markdown to HTML parser
- **React Icons** - Icon library (including Font Awesome leaf favicon)
- **Web Speech API** - Native browser speech recognition & synthesis

### AI Architecture
- **Prompt Engineering**: 1,800-token ultra-optimized system prompt (79% smaller than full version)
- **Context Management**: Last 5 conversations + user profile + seasonal context
- **Response Format**: Structured 150-200 word responses with citations
- **Safety Protocols**: Emergency detection, medical escalation, red flag system
- **Knowledge Base**: Tridosha theory, Ritucharya (6 seasons), Six Tastes, Dinacharya

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  prakriti: {
    assessed: Boolean,
    doshaScores: {
      vata: Number,
      pitta: Number,
      kapha: Number
    },
    assessmentDate: Date,
    dominantDosha: String
  },
  medicalHistory: {
    chronicConditions: [String],
    allergies: [String],
    currentMedications: [String]
  }
}
```

### Consultation Model
```javascript
{
  user: ObjectId (ref: User),
  userMessage: String,
  aiResponse: String,
  symptoms: [String],
  vitals: Object,
  triageLevel: String,
  articlesReferenced: [ObjectId]
}
```

### Article Model
```javascript
{
  title: String,
  slug: String (unique),
  body: String (markdown),
  category: String,
  sources: [{
    name: String,
    url: String
  }],
  tags: [String],
  readingTime: Number
}
```

### Wellness Model
```javascript
{
  userId: ObjectId (ref: User),
  birthDetails: {
    birthDate: Date,
    birthTime: String,
    birthPlace: String,
    latitude: Number,
    longitude: Number
  },
  wellnessCard: {
    astroType: String,        // e.g., "Pitta"
    sunSign: String,          // e.g., "Leo"
    moonSign: String,         // e.g., "Taurus"
    ascendant: String,        // e.g., "Aquarius"
    dominantElement: String,  // e.g., "Fire"
    dominantPlanet: String,   // e.g., "Sun"
    traits: [String],         // Personality traits
    balanceTips: [String],    // Dosha-balancing recommendations
    planetaryInsight: String, // Ruling planet wisdom
    dailyMantra: String       // Sanskrit mantra
  },
  isActive: Boolean,
  createdAt: Date
}
```

## 🚨 Important Notes

### ⚠️ Medical Disclaimer
- **AyurAI is for educational purposes only**
- **NOT a medical device or replacement for healthcare professionals**
- **Always consult qualified doctors for medical diagnosis and treatment**
- Emergency symptoms trigger automatic referral messages

### 🔒 Privacy & Security
- Passwords hashed with bcryptjs
- Session-based authentication
- User data stored securely in MongoDB
- No data shared with third parties

### 💰 API Costs
- OpenAI API usage may incur costs after free tier
- Free tier: $5 credit for 3 months, then pay-as-you-go
- Current optimization: ~$0.00065 per message (very affordable)
- Check pricing: https://openai.com/api/pricing/
- Monitor usage: https://platform.openai.com/usage

## 🐛 Troubleshooting

### Backend won't start

**Check if port 5000 is in use**:
```powershell
# Windows
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

**Solution**:
```bash
cd backend
npm run dev
```

### Frontend won't start

**Clear and reinstall**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### MongoDB connection fails

**Check**:
- ✅ MONGODB_URI in `.env` is correct
- ✅ MongoDB Atlas network access allows your IP
- ✅ Username/password are correct (encode @ as %40)
- ✅ Database name is included in URI

**Test connection**:
```bash
cd backend
node -e "require('./config/database'); console.log('Testing...')"
```

### OpenAI API errors

**Check**:
- ✅ OPENAI_API_KEY is valid and active
- ✅ API key has billing enabled (after free tier)
- ✅ Model name is correct: `gpt-4o-mini`
- ✅ Not exceeding rate limits (3 RPM on free tier)
- ✅ API key not exposed in public repositories

### Prakriti not updating

**Solutions**:
1. Chat with strong keywords: "dry", "cold", "hot", "heavy"
2. Click **"Refresh"** button in Profile page
3. Check backend console for detection logs (🔍 emoji)
4. Take the Prakriti quiz for instant results

### Articles show markdown symbols

**Solutions**:
1. Hard refresh browser: `Ctrl + Shift + R`
2. Check if `marked` is installed: `cd frontend && npm list marked`
3. Clear browser cache

## 📚 Documentation

- **README.md** - This file (setup, usage, troubleshooting)
- **PRAKRITI_QUIZ_FEATURE.md** - Detailed quiz implementation documentation

## 🤝 Contributing

This is a personal educational project. For suggestions or issues, please contact the developer


## 📚 Resources for Content Population

### Sanskrit Verses (50+ authentic sources):
- **Charaka Samhita**: https://www.carakasamhitaonline.com
- **AYUSH Digital Library**: https://www.ayushportal.nic.in
- **National Institute of Ayurveda**: https://www.nia.nic.in

### Glossary Terms (100+ comprehensive list):
- **Dosha, Agni, Ama, Ojas, Prana, Tejas**
- **Vata, Pitta, Kapha** + subtypes
- **Seven Dhatus**: Rasa, Rakta, Mamsa, Meda, Asthi, Majja, Shukra
- **Srotas** (body channels)
- **Malas** (waste products)
- **Gunas** (qualities: hot, cold, heavy, light, etc.)

### Kitchen Herbs Database:
- **Vata**: Ginger, cinnamon, cumin, turmeric, cardamom
- **Pitta**: Coconut, coriander, fennel, mint, aloe
- **Kapha**: Black pepper, ginger, mustard, cayenne, garlic

---

## 🌿 Ayurvedic Disclaimer

This application provides educational information about Ayurveda based on traditional knowledge and is **NOT** intended to diagnose, treat, cure, or prevent any disease.

**Always consult qualified healthcare professionals** for:
- Medical diagnosis
- Treatment plans
- Medication changes
- Health emergencies

**Key Safety Features Built-In**:
- ✅ Red flag detection for emergencies
- ✅ Caution flags for serious symptoms
- ✅ Automatic referrals to modern medicine when needed
- ✅ Disclaimers throughout the application
- ✅ Educational focus, not medical advice

---

**Built with ❤️ combining Ayurvedic wisdom and modern AI technology**

**For educational purposes • Not a substitute for medical care • Consult healthcare professionals**

=======
# 🌿 AyurAI - Ayurvedic Health Advisor

An intelligent Ayurvedic health consultation platform powered by AI, combining 5000+ years of Ayurvedic wisdom with modern conversational AI.

## ✨ Core Features

- 🤖 **AI-Powered Consultations**: Chat with OpenAI GPT-4o-mini for personalized Ayurvedic advice
- 🗣️ **Voice Interaction**: Speech-to-text (Indian English optimized) and text-to-speech with Ayurvedic pronunciation
- 🧬 **Prakriti Assessment**: Auto-detecting constitution (Vata, Pitta, Kapha) through conversations
- 🪷 **Wellness Card**: Custom Ayurvedic wellness profile based on birth details (zodiac-dosha integration)
- 🍽️ **Personalized Diet Recommendations**: Dosha-specific food suggestions with detailed guidelines
- 📊 **Interactive Quiz**: In-app Prakriti assessment with instant results
- 📚 **Knowledge Base**: Curated Ayurvedic articles with proper references
- 👤 **User Profiles**: Track your constitution, consultations, and wellness cards
- 🔒 **Secure Authentication**: Session-based user management

## 🌟 Enhanced Features

### 🌺 Seasonal Intelligence (Ritucharya)
- **Auto-Detects Current Season**: Automatically identifies which of the 6 Ayurvedic seasons (Ritus) you're in
- **Adaptive Recommendations**: All dietary and lifestyle advice adapts to seasonal dosha influences
- **Visual Season Badge**: See current Ritu at top of chat with seasonal guidance tooltip
- **Seasons Covered**:
  - Vasanta (Spring) - Mar-Apr: Light foods, detoxification for Kapha
  - Grishma (Summer) - May-Jun: Cooling foods, hydration for Pitta
  - Varsha (Monsoon) - Jul-Aug: Warm, digestible foods for weak Agni
  - Sharad (Autumn) - Sep-Oct: Bitter herbs, Pitta management
  - Hemanta (Early Winter) - Nov-Dec: Nourishing, strength-building foods
  - Shishira (Late Winter) - Jan-Feb: Warm oils, sweet/sour tastes

### 🌿 Herbal Companion Recommender
- **Kitchen Medicine**: Every response includes a safe, common pantry ingredient recommendation
- **Dosha-Specific**: Turmeric for Kapha, coconut water for Pitta, ginger for Vata
- **Practical Healing**: Simple daily practices with household items (no prescriptions)
- **Rationale Included**: Clear Ayurvedic explanation of why each ingredient helps

### 🪷 Wellness Card (Jataka-Ayurveda Integration)
- **Birth-Based Analysis**: Generate personalized wellness profile from birth date, time, and location
- **No External APIs**: Custom calculation system based on Vedic astrology principles
- **Astro-Ayurvedic Type**: Combines zodiac signs with dosha mapping for holistic constitution
- **Comprehensive Profile**:
  - Sun Sign, Moon Sign (Rashi), Ascendant (Lagna)
  - Dominant Element (Fire, Earth, Air, Water)
  - Ruling Planet and planetary influences
  - Personalized traits and characteristics
  - Dosha-specific balance tips
  - Daily Sanskrit mantra for wellness
- **Saved to Profile**: Wellness card stored in separate Wellness collection for easy access

### 📖 Interactive Glossary System
- **Hover-to-Learn**: Sanskrit terms (Dosha, Agni, Ama, Prakriti) show instant definitions
- **Stored in Database**: Glossary maintained as an Article category for easy updates
- **Transliteration + Meaning**: Both pronunciation and clear English explanation
- **Progressive Learning**: Build Ayurvedic vocabulary naturally while chatting

### 🪷 Daily Sanskrit Wisdom
- **Morning Greeting**: Each session opens with an authentic Sanskrit verse
- **Triple Display**: Original Devanagari + Transliteration + English meaning
- **Classical Sources**: Verses from Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya
- **Rotating Collection**: 50+ verses stored in Articles database for variety
- **Educational & Inspiring**: Connects users to Ayurveda's philosophical roots

### ⏱️ 1-Minute Balance Practice
- **Quick Wellness Button**: Instant access to micro-practices adapted to time/season
- **Breathwork & Awareness**: Simple pranayama or mindfulness exercises
- **Personalized Timing**: Morning energizers, evening wind-downs, seasonal adjustments
- **Save Favorites**: Bookmark practices that resonate for daily routine


**For educational purposes • Not a substitute for medical care • Consult healthcare professionals**


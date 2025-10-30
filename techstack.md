<<<<<<< HEAD
# 🛠️ Technology Stack

AyurAI is built using the **MERN Stack** with **OpenAI GPT-4o-mini** integration for intelligent Ayurvedic consultations.

---

## 🎯 Core Technologies (MERN Stack)

### **M - MongoDB**
**NoSQL Database for Data Storage**

**Where it's used:**
- `backend/config/database.js` - Database connection configuration
- `backend/models/` - Data schemas and models
  - `User.js` - User profiles and Prakriti (constitution) data
  - `Consultation.js` - Chat history and conversation records
  - `Article.js` - Ayurvedic knowledge base articles
  - `Wellness.js` - Wellness card data (separate collection)

**Key Features:**
- Stores user authentication data
- Maintains chat conversation history
- Manages Ayurvedic articles and content
- Tracks user's health assessments and Prakriti results
- Stores wellness cards with astro-Ayurvedic profiles

---

### **E - Express.js**
**Backend Web Framework**

**Where it's used:**
- `backend/server.js` - Main server configuration and startup
- `backend/routes/` - API endpoint definitions
  - `auth.js` - Login/Register/Logout routes
  - `chat.js` - AI consultation endpoints
  - `profile.js` - User profile management
  - `articles.js` - Article CRUD operations
- `backend/controllers/` - Business logic handlers
- `backend/middleware/` - Authentication and validation

**Key Features:**
- Handles all HTTP requests and responses
- Manages RESTful API endpoints
- Implements authentication middleware
- Processes form validation and error handling

---

### **R - React**
**Frontend User Interface Library**

**Where it's used:**
- `frontend/src/` - All UI components and pages
  - `App.jsx` - Main application component
  - `pages/` - Page components
    - `Chat.jsx` - AI consultation interface
    - `Profile.jsx` - User profile and Prakriti display
    - `Articles.jsx` - Knowledge base listing
    - `Home.jsx` - Landing page
    - `Login.jsx` & `Register.jsx` - Authentication forms
  - `components/` - Reusable UI components
    - `Navbar.jsx` - Navigation bar
    - `PrakritiQuiz.jsx` - Ayurvedic constitution assessment
    - `Disclaimer.jsx` - Medical disclaimer
    - `Loading.jsx` - Loading states

**Key Features:**
- Renders dynamic user interface
- Manages component state and user interactions
- Implements routing for multi-page navigation
- Handles form submissions and data display

---

### **N - Node.js**
**JavaScript Runtime Environment**

**Where it's used:**
- Powers the entire backend server
- `backend/` - All backend code runs on Node.js
- Manages package dependencies via npm
- Executes server-side JavaScript code

**Key Features:**
- Runs Express.js server
- Handles asynchronous operations
- Manages file system operations (seeding, configs)
- Executes build and development scripts

---

## 🤖 AI Integration

### **OpenAI GPT-4o-mini**
**AI-Powered Conversational Intelligence**

**Where it's used:**
- `backend/config/openai.js` - OpenAI client initialization and configuration
- `backend/controllers/chatController.js` - Main chat logic with AI integration
- `backend/utils/` - AI context enhancement utilities
  - `contextBuilder.js` - Builds personalized conversation context
  - `userContextAnalyzer.js` - Analyzes user's Prakriti and health data
  - `dietaryRecommendations.js` - Generates dosha-specific food suggestions
  - `redFlags.js` - Identifies serious health concerns
  - `seasonDetector.js` - Ritucharya seasonal intelligence
  - `kitchenHerbs.js` - Kitchen ingredient remedies

**Model Used:** `gpt-4o-mini`

**Key Features:**
- Provides personalized Ayurvedic health advice
- Analyzes user's Prakriti (Vata, Pitta, Kapha)
- Generates context-aware responses based on user profile
- Offers dietary recommendations aligned with dosha
- Maintains conversation history for better context
- Identifies red flags requiring medical attention
- 1,800 token optimized system prompt for Ayurvedic expertise

**How it works:**
1. User sends a message from `Chat.jsx` (frontend)
2. Request goes to `/api/chat` endpoint (backend)
3. `chatController.js` retrieves user's Prakriti and consultation history
4. Context builders enrich the prompt with personalized data
5. OpenAI GPT-4o-mini generates Ayurvedic advice
6. Response is sent back to frontend and stored in MongoDB

---

## 🪷 Custom Wellness System

### **Astro-Ayurvedic Calculations (No External APIs)**
**Birth-Based Wellness Card Generation**

**Where it's used:**
- `backend/utils/astrologyService.js` - Custom zodiac-to-dosha mapping system
- `backend/controllers/profileController.js` - Wellness card generation endpoint
- `backend/models/Wellness.js` - Wellness card data storage

**Key Features:**
- **Custom calculations** - No external astrology APIs required
- **Zodiac calculation** - Birth date → zodiac sign (12 signs)
- **Ascendant calculation** - Birth hour → ascendant sign (2-hour windows)
- **Dosha mapping** - Zodiac signs mapped to Vata/Pitta/Kapha
- **Element mapping** - Fire/Earth/Air/Water from zodiac
- **Ruling planet** - Mars/Venus/Mercury/etc. from sign
- **Personalized traits** - 6 personality traits based on astro-type
- **Balance tips** - 3-4 dosha-balancing recommendations
- **Daily mantra** - Sanskrit mantra for each sign
- **Planetary insight** - Wisdom based on ruling planet

**How it works:**
1. User submits birth details (date, time, location) on Profile page
2. Request goes to `/api/profile/wellness` endpoint
3. `astrologyService.js` calculates zodiac sign from month/day
4. System maps zodiac to dosha (e.g., Aries→Pitta, Gemini→Vata)
5. Ascendant calculated from birth hour (e.g., 6-8 AM→Gemini)
6. Comprehensive wellness card generated with all attributes
7. Card saved to separate Wellness collection in MongoDB
8. User sees astro-Ayurvedic profile on Profile page

---

## 🎨 Supporting Technologies

### **Tailwind CSS**
- **Used in:** `frontend/src/` - All component styling
- **Purpose:** Utility-first CSS framework for responsive, modern UI design

### **React Router**
- **Used in:** `frontend/src/App.jsx` - Page navigation and routing
- **Purpose:** Multi-page application navigation (Home, Chat, Profile, Articles)

### **Axios**
- **Used in:** `frontend/src/services/api.js` - HTTP requests
- **Purpose:** Communication between React frontend and Express backend

### **Mongoose**
- **Used in:** `backend/models/` - Database schemas
- **Purpose:** MongoDB object modeling and data validation

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────┐
│                       Frontend (React)                   │
│  - User Interface Components                            │
│  - Chat, Profile, Articles Pages                        │
│  - Prakriti Quiz                                         │
│  - Wellness Card Display                                 │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTP Requests (Axios)
                  ↓
┌─────────────────────────────────────────────────────────┐
│                    Backend (Express + Node.js)           │
│  - RESTful API Endpoints                                │
│  - Authentication & Validation Middleware               │
│  - Business Logic Controllers                           │
│  - Custom Wellness Calculations (No External APIs)      │
└─────────┬───────────────────────────────┬───────────────┘
          │                               │
          ↓                               ↓
┌─────────────────────┐     ┌────────────────────────────┐
│  MongoDB Database   │     │  OpenAI GPT-4o-mini API    │
│  - User Data        │     │  - AI Consultations        │
│  - Chat History     │     │  - Prakriti Analysis       │
│  - Articles         │     │  - Dietary Advice          │
│  - Wellness Cards   │     └────────────────────────────┘
└─────────────────────┘
```

---

## 📦 Development & Build Tools

- **Vite** - Fast frontend build tool and dev server
- **Nodemon** - Auto-restarts backend on code changes
- **Concurrently** - Runs frontend and backend simultaneously

---

## 🚀 Quick Summary

| Technology | Role | Main Location |
|------------|------|---------------|
| **MongoDB** | Database | `backend/models/`, `backend/config/database.js` |
| **Express.js** | Backend API | `backend/server.js`, `backend/routes/`, `backend/controllers/` |
| **React** | Frontend UI | `frontend/src/`, `frontend/src/pages/`, `frontend/src/components/` |
| **Node.js** | Runtime | Powers entire `backend/` |
| **OpenAI GPT-4o-mini** | AI Intelligence | `backend/config/openai.js`, `backend/controllers/chatController.js` |
| **Custom Wellness System** | Astro-Ayurveda | `backend/utils/astrologyService.js` (No external APIs) |

---

=======
# 🛠️ Technology Stack

AyurAI is built using the **MERN Stack** with **OpenAI GPT-4o-mini** integration for intelligent Ayurvedic consultations.

---

## 🎯 Core Technologies (MERN Stack)

### **M - MongoDB**
**NoSQL Database for Data Storage**

**Where it's used:**
- `backend/config/database.js` - Database connection configuration
- `backend/models/` - Data schemas and models
  - `User.js` - User profiles and Prakriti (constitution) data
  - `Consultation.js` - Chat history and conversation records
  - `Article.js` - Ayurvedic knowledge base articles
  - `Wellness.js` - Wellness card data (separate collection)

**Key Features:**
- Stores user authentication data
- Maintains chat conversation history
- Manages Ayurvedic articles and content
- Tracks user's health assessments and Prakriti results
- Stores wellness cards with astro-Ayurvedic profiles

---

### **E - Express.js**
**Backend Web Framework**

**Where it's used:**
- `backend/server.js` - Main server configuration and startup
- `backend/routes/` - API endpoint definitions
  - `auth.js` - Login/Register/Logout routes
  - `chat.js` - AI consultation endpoints
  - `profile.js` - User profile management
  - `articles.js` - Article CRUD operations
- `backend/controllers/` - Business logic handlers
- `backend/middleware/` - Authentication and validation

**Key Features:**
- Handles all HTTP requests and responses
- Manages RESTful API endpoints
- Implements authentication middleware
- Processes form validation and error handling

---

### **R - React**
**Frontend User Interface Library**

**Where it's used:**
- `frontend/src/` - All UI components and pages
  - `App.jsx` - Main application component
  - `pages/` - Page components
    - `Chat.jsx` - AI consultation interface
    - `Profile.jsx` - User profile and Prakriti display
    - `Articles.jsx` - Knowledge base listing
    - `Home.jsx` - Landing page
    - `Login.jsx` & `Register.jsx` - Authentication forms
  - `components/` - Reusable UI components
    - `Navbar.jsx` - Navigation bar
    - `PrakritiQuiz.jsx` - Ayurvedic constitution assessment
    - `Disclaimer.jsx` - Medical disclaimer
    - `Loading.jsx` - Loading states

**Key Features:**
- Renders dynamic user interface
- Manages component state and user interactions
- Implements routing for multi-page navigation
- Handles form submissions and data display

---

### **N - Node.js**
**JavaScript Runtime Environment**

**Where it's used:**
- Powers the entire backend server
- `backend/` - All backend code runs on Node.js
- Manages package dependencies via npm
- Executes server-side JavaScript code

**Key Features:**
- Runs Express.js server
- Handles asynchronous operations
- Manages file system operations (seeding, configs)
- Executes build and development scripts

---

## 🤖 AI Integration

### **OpenAI GPT-4o-mini**
**AI-Powered Conversational Intelligence**

**Where it's used:**
- `backend/config/openai.js` - OpenAI client initialization and configuration
- `backend/controllers/chatController.js` - Main chat logic with AI integration
- `backend/utils/` - AI context enhancement utilities
  - `contextBuilder.js` - Builds personalized conversation context
  - `userContextAnalyzer.js` - Analyzes user's Prakriti and health data
  - `dietaryRecommendations.js` - Generates dosha-specific food suggestions
  - `redFlags.js` - Identifies serious health concerns
  - `seasonDetector.js` - Ritucharya seasonal intelligence
  - `kitchenHerbs.js` - Kitchen ingredient remedies

**Model Used:** `gpt-4o-mini`

**Key Features:**
- Provides personalized Ayurvedic health advice
- Analyzes user's Prakriti (Vata, Pitta, Kapha)
- Generates context-aware responses based on user profile
- Offers dietary recommendations aligned with dosha
- Maintains conversation history for better context
- Identifies red flags requiring medical attention
- 1,800 token optimized system prompt for Ayurvedic expertise

**How it works:**
1. User sends a message from `Chat.jsx` (frontend)
2. Request goes to `/api/chat` endpoint (backend)
3. `chatController.js` retrieves user's Prakriti and consultation history
4. Context builders enrich the prompt with personalized data
5. OpenAI GPT-4o-mini generates Ayurvedic advice
6. Response is sent back to frontend and stored in MongoDB

---

## 🪷 Custom Wellness System

### **Astro-Ayurvedic Calculations (No External APIs)**
**Birth-Based Wellness Card Generation**

**Where it's used:**
- `backend/utils/astrologyService.js` - Custom zodiac-to-dosha mapping system
- `backend/controllers/profileController.js` - Wellness card generation endpoint
- `backend/models/Wellness.js` - Wellness card data storage

**Key Features:**
- **Custom calculations** - No external astrology APIs required
- **Zodiac calculation** - Birth date → zodiac sign (12 signs)
- **Ascendant calculation** - Birth hour → ascendant sign (2-hour windows)
- **Dosha mapping** - Zodiac signs mapped to Vata/Pitta/Kapha
- **Element mapping** - Fire/Earth/Air/Water from zodiac
- **Ruling planet** - Mars/Venus/Mercury/etc. from sign
- **Personalized traits** - 6 personality traits based on astro-type
- **Balance tips** - 3-4 dosha-balancing recommendations
- **Daily mantra** - Sanskrit mantra for each sign
- **Planetary insight** - Wisdom based on ruling planet

**How it works:**
1. User submits birth details (date, time, location) on Profile page
2. Request goes to `/api/profile/wellness` endpoint
3. `astrologyService.js` calculates zodiac sign from month/day
4. System maps zodiac to dosha (e.g., Aries→Pitta, Gemini→Vata)
5. Ascendant calculated from birth hour (e.g., 6-8 AM→Gemini)
6. Comprehensive wellness card generated with all attributes
7. Card saved to separate Wellness collection in MongoDB
8. User sees astro-Ayurvedic profile on Profile page

---

## 🎨 Supporting Technologies

### **Tailwind CSS**
- **Used in:** `frontend/src/` - All component styling
- **Purpose:** Utility-first CSS framework for responsive, modern UI design

### **React Router**
- **Used in:** `frontend/src/App.jsx` - Page navigation and routing
- **Purpose:** Multi-page application navigation (Home, Chat, Profile, Articles)

### **Axios**
- **Used in:** `frontend/src/services/api.js` - HTTP requests
- **Purpose:** Communication between React frontend and Express backend

### **Mongoose**
- **Used in:** `backend/models/` - Database schemas
- **Purpose:** MongoDB object modeling and data validation

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────┐
│                       Frontend (React)                   │
│  - User Interface Components                            │
│  - Chat, Profile, Articles Pages                        │
│  - Prakriti Quiz                                         │
│  - Wellness Card Display                                 │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTP Requests (Axios)
                  ↓
┌─────────────────────────────────────────────────────────┐
│                    Backend (Express + Node.js)           │
│  - RESTful API Endpoints                                │
│  - Authentication & Validation Middleware               │
│  - Business Logic Controllers                           │
│  - Custom Wellness Calculations (No External APIs)      │
└─────────┬───────────────────────────────┬───────────────┘
          │                               │
          ↓                               ↓
┌─────────────────────┐     ┌────────────────────────────┐
│  MongoDB Database   │     │  OpenAI GPT-4o-mini API    │
│  - User Data        │     │  - AI Consultations        │
│  - Chat History     │     │  - Prakriti Analysis       │
│  - Articles         │     │  - Dietary Advice          │
│  - Wellness Cards   │     └────────────────────────────┘
└─────────────────────┘
```

---

## 📦 Development & Build Tools

- **Vite** - Fast frontend build tool and dev server
- **Nodemon** - Auto-restarts backend on code changes
- **Concurrently** - Runs frontend and backend simultaneously

---

## 🚀 Quick Summary

| Technology | Role | Main Location |
|------------|------|---------------|
| **MongoDB** | Database | `backend/models/`, `backend/config/database.js` |
| **Express.js** | Backend API | `backend/server.js`, `backend/routes/`, `backend/controllers/` |
| **React** | Frontend UI | `frontend/src/`, `frontend/src/pages/`, `frontend/src/components/` |
| **Node.js** | Runtime | Powers entire `backend/` |
| **OpenAI GPT-4o-mini** | AI Intelligence | `backend/config/openai.js`, `backend/controllers/chatController.js` |
| **Custom Wellness System** | Astro-Ayurveda | `backend/utils/astrologyService.js` (No external APIs) |

---

>>>>>>> a2cf8be3231414d8dda9edc9e7035b7cb14ba96c

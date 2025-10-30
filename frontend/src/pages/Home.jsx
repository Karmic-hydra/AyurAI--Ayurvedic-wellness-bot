import { Link } from 'react-router-dom';
import { FaLeaf, FaComments, FaShieldAlt, FaBook, FaBrain, FaHeart } from 'react-icons/fa';

export default function Home({ user }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ayur-primary to-green-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <FaLeaf className="text-6xl text-ayur-secondary animate-pulse-soft" />
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Welcome to AyurAI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Your Evidence-Minded Ayurvedic Wellness Assistant
          </p>
          <p className="text-lg mb-10 max-w-3xl mx-auto">
            Receive personalized Ayurvedic guidance powered by AI, combining ancient wisdom 
            with modern safety standards. Track your wellness journey with context-aware recommendations.
          </p>
          
          {user ? (
            <Link
              to="/chat"
              className="inline-flex items-center space-x-2 bg-ayur-secondary text-ayur-primary px-8 py-4 rounded-lg text-xl font-bold hover:bg-opacity-90 transition transform hover:scale-105"
            >
              <FaComments />
              <span>Start Chatting</span>
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center space-x-2 bg-ayur-secondary text-ayur-primary px-8 py-4 rounded-lg text-xl font-bold hover:bg-opacity-90 transition transform hover:scale-105"
              >
                <span>Get Started Free</span>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center space-x-2 bg-white bg-opacity-20 backdrop-blur text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-opacity-30 transition"
              >
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-ayur-primary">
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4 text-ayur-primary">
                <FaBrain />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3 text-ayur-primary">
                AI-Powered Guidance
              </h3>
              <p className="text-gray-700">
                Get personalized Ayurvedic recommendations powered by OpenAI, 
                considering your unique constitution (Prakriti) and current state.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4 text-ayur-danger">
                <FaShieldAlt />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3 text-ayur-primary">
                Safety First
              </h3>
              <p className="text-gray-700">
                Automatic detection of urgent symptoms with immediate medical referral. 
                We prioritize your safety with built-in red flag alerts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4 text-blue-600">
                <FaBook />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3 text-ayur-primary">
                Knowledge Base
              </h3>
              <p className="text-gray-700">
                Access curated Ayurvedic articles covering Tridosha, herbs, seasonal routines, 
                and safety guidelines reviewed by practitioners.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4 text-purple-600">
                <FaLeaf />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3 text-ayur-primary">
                Dosha Assessment
              </h3>
              <p className="text-gray-700">
                Discover your unique constitution (Prakriti) with our comprehensive 
                Vata-Pitta-Kapha assessment tool.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4 text-ayur-accent">
                <FaHeart />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3 text-ayur-primary">
                Wellness Tracking
              </h3>
              <p className="text-gray-700">
                Track vitals, symptoms, diet, and sleep patterns. Monitor your wellness 
                journey with detailed health readings.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4 text-green-600">
                <FaComments />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3 text-ayur-primary">
                Context-Aware
              </h3>
              <p className="text-gray-700">
                Recommendations adapt to season, time of day, your medical history, 
                and current symptoms for truly personalized advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gradient-to-br from-ayur-bg to-green-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-ayur-primary">
            How It Works
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-ayur-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-ayur-primary">Create Your Profile</h3>
                <p className="text-gray-700">
                  Sign up and complete your Prakriti (constitution) assessment to help us understand your unique Ayurvedic profile.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-ayur-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-ayur-primary">Chat with AyurAI</h3>
                <p className="text-gray-700">
                  Describe your concerns or questions. Our AI analyzes your symptoms considering season, time, and your constitution.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-ayur-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-ayur-primary">Get Personalized Advice</h3>
                <p className="text-gray-700">
                  Receive Ayurvedic guidance with article citations, lifestyle tips, and clear safety warnings when medical care is needed.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-ayur-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-ayur-primary">Track Your Progress</h3>
                <p className="text-gray-700">
                  Monitor your wellness journey with health readings, chat history, and progress tracking over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 px-4 bg-yellow-50 border-t-4 border-yellow-400">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-4">
            <FaShieldAlt className="text-3xl text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Important Disclaimer</h3>
              <p className="text-gray-700 mb-3">
                <strong>AyurAI is an educational tool and does NOT replace medical professionals.</strong>
              </p>
              <p className="text-gray-700 mb-3">
                If you have severe symptoms (chest pain, severe breathlessness, sudden weakness, 
                high fever with confusion, severe bleeding, or signs of emergency), please seek 
                immediate medical attention or call emergency services.
              </p>
              <p className="text-gray-700">
                Always consult qualified healthcare providers before starting any new health regimen, 
                especially if pregnant, nursing, taking medications, or have chronic conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-16 px-4 bg-ayur-primary text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-6">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl mb-8">
              Join AyurAI today and discover personalized Ayurvedic guidance.
            </p>
            <Link
              to="/register"
              className="inline-block bg-ayur-secondary text-ayur-primary px-8 py-4 rounded-lg text-xl font-bold hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

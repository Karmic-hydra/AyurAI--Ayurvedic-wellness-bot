import { useState, useEffect } from 'react';
import { FaLeaf, FaTimes } from 'react-icons/fa';
import api from '../services/api';

/**
 * Sanskrit Quote Greeting Modal
 * Displays a random Ayurvedic Sanskrit verse when chat page loads
 * Shows: Sanskrit text + Transliteration + English meaning + Source
 */
const SanskritQuoteGreeting = ({ onClose }) => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await api.get('/articles/reference/quote');
      if (response.data.success) {
        setQuote(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching Sanskrit quote:', error);
      // Fallback quote if API fails
      setQuote({
        sanskrit: "शरीरमाद्यं खलु धर्मसाधनम्",
        transliteration: "Shareeram Aadyam Khalu Dharmasadhanam",
        meaning: "The body is indeed the primary instrument for all pursuits of life.",
        source: "Charaka Samhita"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-amber-50 via-white to-green-50 rounded-2xl shadow-2xl p-8 max-w-2xl w-full animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-gradient-to-br from-amber-50 via-white to-green-50 rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative border-2 border-green-300 transform transition-all duration-300 hover:scale-[1.02]"
        style={{ backgroundColor: '#FFF8E7' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-2 hover:bg-white rounded-full"
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>

        {/* Header with Lotus Icons */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaLeaf className="text-3xl text-amber-600" />
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-700 to-amber-700 bg-clip-text text-transparent">
              AyurAI Daily Wisdom
            </h2>
            <FaLeaf className="text-3xl text-amber-600" />
          </div>
          <p className="text-sm text-gray-600 italic">
            Ancient Ayurvedic Knowledge for Modern Living
          </p>
        </div>

        {/* Quote Card */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-inner border-2 border-amber-100 relative overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full opacity-30 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-50 rounded-full opacity-30 -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            {/* Sanskrit Text in Devanagari */}
            <p 
              className="text-2xl md:text-3xl font-serif text-center mb-5 leading-relaxed"
              style={{ 
                color: '#5B4636',
                fontFamily: "'Noto Sans Devanagari', 'Noto Serif', serif"
              }}
            >
              "{quote.sanskrit}"
            </p>

            {/* Transliteration */}
            <p 
              className="text-lg md:text-xl italic text-center mb-5 leading-relaxed"
              style={{ color: '#3B7A57' }}
            >
              <em>{quote.transliteration}</em>
            </p>

            {/* Meaning */}
            <div className="border-t-2 border-gray-200 pt-5">
              <p 
                className="text-base md:text-lg text-center leading-relaxed"
                style={{ color: '#444444' }}
              >
                → {quote.meaning}
              </p>
            </div>

            {/* Source Citation */}
            {quote.source && (
              <p className="text-sm text-gray-500 text-center mt-5 italic font-medium">
                — {quote.source}
              </p>
            )}
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <FaLeaf />
            Begin Your Wellness Journey
            <FaLeaf />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SanskritQuoteGreeting;


import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaUser, FaSignOutAlt, FaBook, FaInfoCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { articlesAPI } from '../services/api';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [showRituInfo, setShowRituInfo] = useState(false);
  const [rituData, setRituData] = useState(null);

  useEffect(() => {
    fetchRituData();
  }, []);

  const fetchRituData = async () => {
    try {
      const response = await articlesAPI.getRitu();
      if (response.data.success) {
        setRituData(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch Ritu data:', error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const getRituEmoji = (name) => {
    const emojiMap = {
      'Shishira': '❄️',
      'Vasanta': '🌸',
      'Grishma': '☀️',
      'Varsha': '🌧️',
      'Sharad': '🍂',
      'Hemanta': '🌙'
    };
    return emojiMap[name] || '🌿';
  };

  return (
    <nav className="bg-ayur-primary text-white shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <FaLeaf className="text-2xl text-ayur-secondary" />
            <span className="text-xl font-heading font-bold">AyurAI</span>
          </Link>

          {/* Center - Seasonal Badge (Ritu) with expandable info */}
          {rituData && (
            <div className="relative">
              <button
                onClick={() => setShowRituInfo(!showRituInfo)}
                className="flex items-center space-x-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{getRituEmoji(rituData.name)}</span>
                <div className="text-left">
                  <div className="text-xs font-medium opacity-80">Current Season</div>
                  <div className="text-sm font-bold">{rituData.name}</div>
                </div>
                <FaInfoCircle className={`text-sm opacity-60 group-hover:opacity-100 transition-all ${showRituInfo ? 'rotate-180' : ''}`} />
              </button>

              {/* Expandable Info Card */}
              {showRituInfo && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-96 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-200 z-50 animate-fadeIn">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-t-xl border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <span className="text-4xl">{getRituEmoji(rituData.name)}</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{rituData.name}</h3>
                        <p className="text-xs text-gray-500">{rituData.months}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                    {/* Description */}
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <p className="text-sm text-gray-700 leading-relaxed">{rituData.description}</p>
                    </div>

                    {/* Dosha Influence */}
                    <div>
                      <h4 className="font-semibold text-gray-700 text-sm mb-1 flex items-center">
                        <span className="mr-2">⚖️</span>
                        Dominant Dosha
                      </h4>
                      <p className="text-sm text-gray-600 pl-6 bg-yellow-50 rounded p-2 border border-yellow-200">
                        <span className="font-bold text-yellow-800">{rituData.dosha}</span> - {rituData.qualities}
                      </p>
                    </div>

                    {/* Seasonal Advice */}
                    <div>
                      <h4 className="font-semibold text-gray-700 text-sm mb-1 flex items-center">
                        <span className="mr-2">💡</span>
                        Key Advice
                      </h4>
                      <p className="text-sm text-gray-600 pl-6">{rituData.advice}</p>
                    </div>

                    {/* Recommended Foods */}
                    <div>
                      <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center">
                        <span className="mr-2">🥘</span>
                        Food Guidelines
                      </h4>
                      <p className="text-xs text-gray-600 pl-6 leading-relaxed">{rituData.foods}</p>
                    </div>

                    {/* Lifestyle Practices */}
                    <div>
                      <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center">
                        <span className="mr-2">🧘</span>
                        Lifestyle Practices
                      </h4>
                      <p className="text-xs text-gray-600 pl-6 leading-relaxed">{rituData.lifestyle}</p>
                    </div>

                    {/* Tips */}
                    {rituData.tips && (
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <p className="text-xs text-gray-700">
                          <span className="font-semibold">✨ Pro Tips: </span>{rituData.tips}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-50 p-3 rounded-b-xl text-center border-t border-gray-200">
                    <p className="text-xs text-gray-500">Living in harmony with nature's rhythms 🌿</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/articles" 
              className="flex items-center space-x-1 hover:text-ayur-secondary transition"
            >
              <FaBook />
              <span>Articles</span>
            </Link>

            {user ? (
              <>
                <Link 
                  to="/chat" 
                  className="bg-ayur-secondary text-ayur-primary px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
                >
                  Chat
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-1 hover:text-ayur-secondary transition"
                >
                  <FaUser />
                  <span className="hidden sm:inline">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-ayur-secondary transition"
                >
                  <FaSignOutAlt />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:text-ayur-secondary transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-ayur-secondary text-ayur-primary px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

import { useState, useEffect } from 'react';
import { FaSun, FaCloudRain, FaSnowflake, FaLeaf, FaInfoCircle } from 'react-icons/fa';
import api from '../services/api';

const SeasonalBadge = () => {
  const [rituInfo, setRituInfo] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchRitu = async () => {
      try {
        const response = await api.get('/articles/reference/ritu');
        setRituInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching Ritu:', error);
      }
    };
    fetchRitu();
  }, []);

  if (!rituInfo) return null;

  const getSeasonIcon = (seasonName) => {
    if (seasonName.includes('Summer') || seasonName.includes('Grishma')) return <FaSun className="text-yellow-500" />;
    if (seasonName.includes('Monsoon') || seasonName.includes('Varsha')) return <FaCloudRain className="text-blue-500" />;
    if (seasonName.includes('Winter') || seasonName.includes('Hemanta') || seasonName.includes('Shishira')) return <FaSnowflake className="text-blue-300" />;
    return <FaLeaf className="text-green-500" />;
  };

  return (
    <div className="relative">
      {/* Badge */}
      <div 
        className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg px-4 py-3 cursor-pointer hover:shadow-md transition-all"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            {getSeasonIcon(rituInfo.name)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-green-800">
                Current Ritu: {rituInfo.name}
              </span>
              <FaInfoCircle className="text-green-600 text-xs cursor-pointer hover:text-green-800" />
            </div>
            <span className="text-xs text-gray-600">
              {rituInfo.dosha} dominant
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Tooltip */}
      {showDetails && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-green-200 rounded-lg shadow-xl p-4 z-50 animate-fadeIn">
          <button
            onClick={() => setShowDetails(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          
          <h4 className="font-bold text-green-800 mb-2">{rituInfo.name}</h4>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold text-gray-700">Qualities:</span>
              <p className="text-gray-600">{rituInfo.qualities}</p>
            </div>
            
            <div>
              <span className="font-semibold text-gray-700">Seasonal Guidance:</span>
              <p className="text-gray-600">{rituInfo.advice}</p>
            </div>
            
            <div>
              <span className="font-semibold text-gray-700">Recommended Foods:</span>
              <p className="text-gray-600">{rituInfo.foods}</p>
            </div>
            
            <div>
              <span className="font-semibold text-gray-700">Lifestyle Tips:</span>
              <p className="text-gray-600">{rituInfo.lifestyle}</p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 italic">
              Living in harmony with {rituInfo.name} helps maintain dosha balance naturally.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonalBadge;

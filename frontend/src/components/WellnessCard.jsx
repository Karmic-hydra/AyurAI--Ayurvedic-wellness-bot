import { FaStar, FaMapMarkerAlt, FaClock, FaCalendar, FaFire, FaWind, FaWater, FaSyncAlt } from 'react-icons/fa';

export default function WellnessCard({ wellnessCard, profile, birthDetails, onRefresh, isRefreshing }) {
  
  // Debug logging
  console.log('WellnessCard received data:');
  console.log('- wellnessCard:', wellnessCard);
  console.log('- profile:', profile);
  console.log('- birthDetails:', birthDetails);
  console.log('- profile.dob:', profile.dob);
  console.log('- birthDetails.date:', birthDetails.date);
  console.log('WellnessCard dates:', {
    generatedDate: wellnessCard.generatedDate,
    lastUpdated: wellnessCard.lastUpdated,
    generated: wellnessCard.generated
  });
  
  const getElementIcon = (element) => {
    const icons = {
      'Fire': <FaFire className="text-orange-500" />,
      'Earth': <span className="text-green-700">🌍</span>,
      'Air': <FaWind className="text-blue-400" />,
      'Water': <FaWater className="text-blue-600" />
    };
    return icons[element] || '🌿';
  };

  if (!wellnessCard || !wellnessCard.generated) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-xl p-6 border-2 border-purple-200 relative">
        {/* Refresh Button */}
        {onRefresh && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onRefresh(e);
            }}
            disabled={isRefreshing}
            className="absolute top-4 right-4 p-2 bg-white hover:bg-purple-50 text-purple-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            title="Refresh card with current astrological data"
          >
            <FaSyncAlt className={`text-lg ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          </button>
        )}
        
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-purple-900 mb-2">{profile.name}</h3>
          <p className="text-sm text-gray-600 flex items-center justify-center space-x-2 flex-wrap">
            <span className="flex items-center space-x-1">
              <FaCalendar className="text-purple-600" />
              <span>
                {(() => {
                  const dateValue = profile.dob || birthDetails.date;
                  if (dateValue) {
                    try {
                      return new Date(dateValue).toLocaleDateString('en-GB');
                    } catch (e) {
                      return 'N/A';
                    }
                  }
                  return 'N/A';
                })()}
              </span>
            </span>
            {birthDetails.time && (
              <span className="flex items-center space-x-1">
                <FaClock className="text-purple-600" />
                <span>{birthDetails.time}</span>
              </span>
            )}
            {birthDetails.place && (
              <span className="flex items-center space-x-1">
                <FaMapMarkerAlt className="text-purple-600" />
                <span>{birthDetails.place}</span>
              </span>
            )}
          </p>
        </div>

        {/* Ayurvedic-Astro Type */}
        <div className="bg-white/80 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-1">Ayurvedic–Astro Constitution:</p>
          <p className="text-3xl font-bold text-purple-700">{wellnessCard.astroType}</p>
          <p className="text-sm text-gray-600 mt-1 flex items-center justify-center space-x-2">
            <span>Dominant Element:</span>
            {getElementIcon(wellnessCard.dominantElement)}
            <span className="font-semibold">{wellnessCard.dominantElement}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Moon Sign */}
          <div className="bg-white/80 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Moon Sign (Chandra Rashi)</p>
            <p className="text-lg font-bold text-gray-800">🌙 {wellnessCard.moonSign}</p>
          </div>

          {/* Ascendant */}
          <div className="bg-white/80 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Ascendant (Lagna)</p>
            <p className="text-lg font-bold text-gray-800">⬆️ {wellnessCard.ascendant}</p>
          </div>
        </div>
      </div>

      {/* Key Traits */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">✨</span>
          Key Traits:
        </h4>
        <div className="flex flex-wrap gap-2">
          {wellnessCard.traits && wellnessCard.traits.map((trait, index) => (
            <span key={index} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-700 border border-blue-300">
              {trait}
            </span>
          ))}
        </div>
      </div>

      {/* Balance Tips */}
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">🌿</span>
          Balance Tips:
        </h4>
        <ul className="space-y-2">
          {wellnessCard.balanceTips && wellnessCard.balanceTips.map((tip, index) => (
            <li key={index} className="flex items-start text-sm text-gray-700">
              <span className="mr-2 text-green-600">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Planetary Insight */}
      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h4 className="font-bold text-gray-800 mb-2 flex items-center">
          <span className="mr-2">🔮</span>
          Planetary Insight:
        </h4>
        <p className="text-sm text-gray-700 italic leading-relaxed">
          {wellnessCard.planetaryInsight}
        </p>
      </div>

      {/* Daily Mantra */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-5 border-2 border-orange-200">
        <h4 className="font-bold text-gray-800 mb-2 text-center flex items-center justify-center">
          <span className="mr-2">🕉️</span>
          Daily Mantra:
        </h4>
        <p className="text-center text-lg font-semibold text-orange-900 italic">
          "{wellnessCard.dailyMantra}"
        </p>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        {isRefreshing ? (
          <span className="text-purple-600 font-semibold">♻️ Refreshing with current astrological data...</span>
        ) : (
          <>
            Last updated: {(() => {
              // Try multiple possible date locations
              const dateValue = wellnessCard.generatedDate || wellnessCard.lastUpdated || wellnessCard.generated || new Date();
              try {
                return new Date(dateValue).toLocaleDateString('en-GB', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });
              } catch (e) {
                return 'Just now';
              }
            })()}
          </>
        )}
      </p>
    </div>
  );
}

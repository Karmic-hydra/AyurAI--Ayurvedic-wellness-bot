import { FaStar, FaCalendar } from 'react-icons/fa';

export default function WellnessCardForm({ 
  birthDetails, 
  profileDob,
  onBirthDetailsChange,
  onProfileDobChange,
  onSubmit, 
  generatingCard
}) {
  return (
    <div className="space-y-6">
      <div className="text-center py-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <FaStar className="text-6xl text-purple-300 mx-auto mb-4" />
        <p className="text-gray-700 mb-2 font-semibold">
          Generate Your Personalized Wellness Card
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Discover your unique Ayurvedic-Astrological constitution
        </p>
      </div>

        {/* Birth Details Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Date of Birth */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <FaCalendar className="mr-2 text-blue-600" />
            Birth Details for Astrological Analysis
          </h3>          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={profileDob ? new Date(profileDob).toISOString().split('T')[0] : ''}
                onChange={onProfileDobChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="birthTime" className="block text-sm font-medium text-gray-700 mb-1">
                Time of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="birthTime"
                name="time"
                value={birthDetails.time}
                onChange={onBirthDetailsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700 mb-1">
                Place of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="birthPlace"
                name="place"
                value={birthDetails.place}
                onChange={onBirthDetailsChange}
                placeholder="e.g., Mumbai, India"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Coordinates Section */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
              Latitude <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="any"
              id="latitude"
              name="latitude"
              value={birthDetails.latitude}
              onChange={onBirthDetailsChange}
              placeholder="e.g., 19.0760"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
              Longitude <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="any"
              id="longitude"
              name="longitude"
              value={birthDetails.longitude}
              onChange={onBirthDetailsChange}
              placeholder="e.g., 72.8777"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <p className="text-xs text-gray-600">
            <span className="font-semibold">💡 Tip:</span> You can find latitude and longitude by searching your birth city on{' '}
            <a href="https://www.latlong.net/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              LatLong.net
            </a>
          </p>
        </div>

        <button
          type="submit"
          disabled={generatingCard || !profileDob}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaStar />
          <span>{generatingCard ? 'Generating Wellness Card...' : 'Generate Wellness Card'}</span>
        </button>

        {!profileDob && (
          <p className="text-xs text-red-500 text-center">
            Please set your date of birth above first
          </p>
        )}
      </form>
    </div>
  );
}

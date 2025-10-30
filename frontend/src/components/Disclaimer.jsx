import { FaExclamationTriangle } from 'react-icons/fa';

export default function Disclaimer({ onAccept }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <FaExclamationTriangle className="text-3xl text-ayur-danger" />
            <h2 className="text-2xl font-heading font-bold text-gray-800">
              Important Medical Disclaimer
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-4 text-gray-700">
            <p className="text-lg font-semibold">
              AyurAI is an educational tool and does NOT replace medical professionals.
            </p>

            <div className="bg-red-50 border-l-4 border-ayur-danger p-4 rounded">
              <h3 className="font-semibold text-ayur-danger mb-2">
                🚨 Seek IMMEDIATE Medical Attention if you have:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Chest pain or severe shortness of breath</li>
                <li>Sudden weakness, facial droop, or slurred speech</li>
                <li>Severe bleeding or head injury</li>
                <li>High fever (&gt;39.5°C/103°F) with confusion</li>
                <li>Loss of consciousness, fainting, or seizures</li>
                <li>Severe abdominal pain or vomiting blood</li>
                <li>Signs of poisoning or severe allergic reactions</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <h3 className="font-semibold text-yellow-800 mb-2">
                ⚠️ What AyurAI Provides:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Educational information about Ayurvedic principles</li>
                <li>General lifestyle and wellness suggestions</li>
                <li>Traditional knowledge for reference purposes</li>
                <li>Guidance to seek professional medical care when needed</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-ayur-primary p-4 rounded">
              <h3 className="font-semibold text-ayur-primary mb-2">
                ✅ What AyurAI Does NOT Do:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Make medical diagnoses</li>
                <li>Prescribe medications or treatments</li>
                <li>Replace consultations with qualified practitioners</li>
                <li>Provide emergency medical care</li>
              </ul>
            </div>

            <p className="text-sm">
              <strong>Important:</strong> Always consult with qualified healthcare providers 
              before starting any new health regimen, especially if you are pregnant, nursing, 
              taking medications, or have chronic health conditions.
            </p>

            <p className="text-sm">
              By using AyurAI, you acknowledge that this is an educational resource and you 
              will seek appropriate medical care when needed.
            </p>
          </div>

          {/* Accept Button */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onAccept}
              className="bg-ayur-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition"
            >
              I Understand and Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

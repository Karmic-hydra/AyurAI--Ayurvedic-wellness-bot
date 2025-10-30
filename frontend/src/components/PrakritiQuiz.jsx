import { useState } from 'react';
import { FaLeaf, FaArrowRight, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const prakritiQuestions = [
  {
    id: 1,
    question: "What best describes your body frame?",
    options: [
      { text: "Thin, light frame - hard to gain weight", dosha: "vata", points: 2 },
      { text: "Medium, athletic build - moderate weight", dosha: "pitta", points: 2 },
      { text: "Large, heavy frame - gains weight easily", dosha: "kapha", points: 2 }
    ]
  },
  {
    id: 2,
    question: "How would you describe your skin?",
    options: [
      { text: "Dry, rough, cool to touch", dosha: "vata", points: 2 },
      { text: "Warm, oily, prone to rashes or acne", dosha: "pitta", points: 2 },
      { text: "Thick, smooth, cool and moist", dosha: "kapha", points: 2 }
    ]
  },
  {
    id: 3,
    question: "What's your appetite like?",
    options: [
      { text: "Irregular - sometimes hungry, sometimes not", dosha: "vata", points: 2 },
      { text: "Strong appetite - get irritable if I skip meals", dosha: "pitta", points: 2 },
      { text: "Low appetite - can skip meals easily", dosha: "kapha", points: 2 }
    ]
  },
  {
    id: 4,
    question: "How do you handle stress?",
    options: [
      { text: "Get anxious and worried easily", dosha: "vata", points: 2 },
      { text: "Get irritable and angry", dosha: "pitta", points: 2 },
      { text: "Stay calm, can become withdrawn", dosha: "kapha", points: 2 }
    ]
  },
  {
    id: 5,
    question: "What's your sleep pattern like?",
    options: [
      { text: "Light sleeper, wake up easily, sometimes insomnia", dosha: "vata", points: 2 },
      { text: "Moderate sleep, wake up refreshed", dosha: "pitta", points: 2 },
      { text: "Deep, heavy sleep - love sleeping long hours", dosha: "kapha", points: 2 }
    ]
  },
  {
    id: 6,
    question: "How would you describe your energy?",
    options: [
      { text: "Energy comes in bursts, can get tired quickly", dosha: "vata", points: 2 },
      { text: "High energy, very active and intense", dosha: "pitta", points: 2 },
      { text: "Steady energy, can be lethargic", dosha: "kapha", points: 2 }
    ]
  },
  {
    id: 7,
    question: "What's your body temperature preference?",
    options: [
      { text: "I feel cold easily and prefer warmth", dosha: "vata", points: 2 },
      { text: "I feel hot easily and prefer cool environments", dosha: "pitta", points: 2 },
      { text: "Comfortable in most temperatures", dosha: "kapha", points: 2 }
    ]
  },
  {
    id: 8,
    question: "How do you typically speak?",
    options: [
      { text: "Fast, lots of talking, enthusiastic", dosha: "vata", points: 2 },
      { text: "Sharp, precise, clear communication", dosha: "pitta", points: 2 },
      { text: "Slow, calm, thoughtful speech", dosha: "kapha", points: 2 }
    ]
  }
];

export default function PrakritiQuiz({ onComplete, onCancel }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnswer = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
  };

  const handleNext = () => {
    if (currentQuestion < prakritiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const scores = { vata: 0, pitta: 0, kapha: 0 };

    Object.values(answers).forEach(answer => {
      scores[answer.dosha] += answer.points;
    });

    const total = scores.vata + scores.pitta + scores.kapha;
    const percentages = {
      vata: Math.round((scores.vata / total) * 100),
      pitta: Math.round((scores.pitta / total) * 100),
      kapha: 0
    };
    percentages.kapha = 100 - percentages.vata - percentages.pitta;

    // Determine dominant dosha
    const dominant = Object.entries(percentages).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    const dominantDosha = dominant.charAt(0).toUpperCase() + dominant.slice(1);

    const finalResults = {
      vata: percentages.vata,
      pitta: percentages.pitta,
      kapha: percentages.kapha,
      dominantDosha: dominantDosha,
      assessed: true
    };

    setResults(finalResults);
    setShowResults(true);
  };

  const currentQ = prakritiQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / prakritiQuestions.length) * 100;
  const isAnswered = answers[currentQ.id] !== undefined;

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-heading font-bold text-ayur-dark mb-2">
                Assessment Complete!
              </h2>
              <p className="text-gray-600">Here's your Ayurvedic constitution</p>
            </div>

            <div className="space-y-6">
              {/* Vata */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium text-gray-700">
                    🌬️ Vata (Air + Ether)
                  </span>
                  <span className="text-2xl font-bold text-blue-600">{results.vata}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${results.vata}%` }}
                  ></div>
                </div>
              </div>

              {/* Pitta */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium text-gray-700">
                    🔥 Pitta (Fire + Water)
                  </span>
                  <span className="text-2xl font-bold text-red-600">{results.pitta}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-red-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${results.pitta}%` }}
                  ></div>
                </div>
              </div>

              {/* Kapha */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium text-gray-700">
                    🌍 Kapha (Water + Earth)
                  </span>
                  <span className="text-2xl font-bold text-green-600">{results.kapha}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${results.kapha}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
              <p className="text-center text-lg">
                <span className="font-bold text-gray-800">Your Dominant Dosha:</span>
                <span className="text-2xl font-bold text-ayur-primary ml-2">
                  {results.dominantDosha}
                </span>
              </p>
              <p className="text-center text-sm text-gray-600 mt-2">
                This is your primary Ayurvedic constitution
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => onComplete(results)}
                className="flex-1 px-6 py-3 bg-ayur-primary text-white rounded-lg font-bold hover:bg-opacity-90 transition"
              >
                Save to Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <FaLeaf className="text-5xl text-ayur-primary mx-auto mb-4" />
            <h2 className="text-3xl font-heading font-bold text-ayur-dark mb-2">
              Prakriti Assessment
            </h2>
            <p className="text-gray-600">Discover your Ayurvedic body type</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1} of {prakritiQuestions.length}
              </span>
              <span className="text-sm font-medium text-ayur-primary">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-ayur-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQ.question}
            </h3>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = answers[currentQ.id]?.text === option.text;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQ.id, option)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-ayur-primary bg-ayur-light text-ayur-dark'
                        : 'border-gray-200 hover:border-ayur-primary hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          isSelected ? 'border-ayur-primary bg-ayur-primary' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className={isSelected ? 'font-medium' : ''}>
                        {option.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2 px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaArrowLeft />
              <span>Previous</span>
            </button>

            {currentQuestion === prakritiQuestions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaCheckCircle />
                <span>Get Results</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="flex items-center space-x-2 px-6 py-3 bg-ayur-primary text-white rounded-lg font-bold hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <FaArrowRight />
              </button>
            )}
          </div>

          {/* Cancel Button */}
          <div className="mt-6 text-center">
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Cancel Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

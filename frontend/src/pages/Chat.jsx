import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaLeaf, FaExclamationTriangle, FaRobot, FaUser, FaMicrophone, FaStop, FaVolumeUp, FaVolumeMute, FaWind } from 'react-icons/fa';
import { chatAPI, articlesAPI } from '../services/api';
import { getErrorMessage, formatTime } from '../utils/helpers';
import Loading from '../components/Loading';
import SanskritQuoteGreeting from '../components/SanskritQuoteGreeting';
import { marked } from 'marked';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

// Configure marked for beautiful rendering
marked.setOptions({
  breaks: true, // Convert \n to <br>
  gfm: true, // GitHub Flavored Markdown
});

// 1-Minute Balance Exercises with audio cues
const BALANCE_EXERCISES = [
  {
    id: 'deep-breath',
    name: 'Deep Breathing',
    subtitle: 'Calming Breath',
    duration: 60,
    icon: '🫁',
    isDefault: true,
    phases: [
      { duration: 4, instruction: 'Breathe in slowly through your nose', audio: 'inhale', posture: 'Sit comfortably with spine straight' },
      { duration: 2, instruction: 'Hold gently', audio: 'hold', posture: 'Relax shoulders' },
      { duration: 6, instruction: 'Breathe out slowly through your mouth', audio: 'exhale', posture: 'Feel tension release' }
    ],
    benefits: 'Reduces stress instantly, calms nervous system'
  },
  {
    id: 'calm-tension',
    name: 'Tension Release',
    subtitle: 'Progressive Relaxation',
    duration: 60,
    icon: '🤲',
    phases: [
      { duration: 3, instruction: 'Tense shoulders up to ears', audio: 'tense', posture: 'Squeeze tight' },
      { duration: 3, instruction: 'Release and drop shoulders', audio: 'release', posture: 'Feel the relief' },
      { duration: 3, instruction: 'Tense fists tight', audio: 'tense', posture: 'Squeeze hard' },
      { duration: 3, instruction: 'Release and shake out hands', audio: 'release', posture: 'Let go completely' }
    ],
    benefits: 'Releases physical tension, reduces nervousness'
  },
  {
    id: 'cooling-breath',
    name: 'Cooling Breath',
    subtitle: 'Anger Management',
    duration: 60,
    icon: '❄️',
    phases: [
      { duration: 4, instruction: 'Inhale through curled tongue', audio: 'inhale', posture: 'Curl tongue like a straw' },
      { duration: 2, instruction: 'Hold breath gently', audio: 'hold', posture: 'Close mouth' },
      { duration: 4, instruction: 'Exhale slowly through nose', audio: 'exhale', posture: 'Feel coolness spread' }
    ],
    benefits: 'Cools body temperature, reduces anger and frustration'
  },
  {
    id: 'grounding',
    name: 'Grounding Exercise',
    subtitle: 'Anxiety Relief',
    duration: 60,
    icon: '🌍',
    phases: [
      { duration: 5, instruction: 'Feel feet on ground', audio: 'aware', posture: 'Press feet firmly down' },
      { duration: 5, instruction: 'Notice 5 things you see', audio: 'observe', posture: 'Look around slowly' },
      { duration: 2, instruction: 'Deep breath in', audio: 'inhale', posture: 'Fill your lungs' },
      { duration: 3, instruction: 'Slow breath out', audio: 'exhale', posture: 'Release worry' }
    ],
    benefits: 'Grounds you in present moment, reduces anxiety'
  },
  {
    id: 'heart-coherence',
    name: 'Heart Coherence',
    subtitle: 'Emotional Balance',
    duration: 60,
    icon: '💚',
    phases: [
      { duration: 5, instruction: 'Place hand on heart', audio: 'touch', posture: 'Feel your heartbeat' },
      { duration: 5, instruction: 'Breathe into your heart', audio: 'inhale', posture: 'Imagine breath entering heart' },
      { duration: 5, instruction: 'Breathe out from heart', audio: 'exhale', posture: 'Send warmth outward' }
    ],
    benefits: 'Balances emotions, creates inner peace'
  }
];

export default function Chat({ user, loginTimestamp }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [showQuoteGreeting, setShowQuoteGreeting] = useState(false);
  const [showBalanceMode, setShowBalanceMode] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [exercisePhaseIndex, setExercisePhaseIndex] = useState(0);
  const [exercisePhaseTimer, setExercisePhaseTimer] = useState(0);
  const [isPracticing, setIsPracticing] = useState(false);
  const [glossary, setGlossary] = useState({});
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const audioRef = useRef(null);

  // Speech recognition hook
  const { 
    isListening, 
    transcript, 
    isSupported: isSpeechRecognitionSupported,
    startListening, 
    stopListening, 
    resetTranscript 
  } = useSpeechRecognition();

  // Text-to-speech hook
  const { speak, stop: stopSpeaking, isSpeaking, isSupported: isTTSSupported } = useTextToSpeech();

  // Update input when speech transcript changes
  useEffect(() => {
    if (transcript) {
      setInputMessage(transcript);
      
      // Resize textarea after setting message
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
      }
    }
  }, [transcript]);

  // Function to safely render markdown
  const renderMarkdown = (content) => {
    return { __html: marked(content) };
  };

  // Function to wrap Ayurvedic terms with tooltips
  const addGlossaryTooltips = (htmlContent) => {
    if (!glossary || Object.keys(glossary).length === 0) return htmlContent;
    
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Function to recursively process text nodes
    const processTextNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent;
        
        // Sort terms by length (longest first) to avoid partial matches
        const sortedTerms = Object.keys(glossary).sort((a, b) => b.length - a.length);
        
        let hasMatch = false;
        sortedTerms.forEach(term => {
          const definition = glossary[term];
          const regex = new RegExp(`\\b(${term})\\b`, 'gi');
          
          if (regex.test(text)) {
            hasMatch = true;
            text = text.replace(regex, (match) => {
              return `<span class="ayur-term" data-tooltip="${definition.definition.replace(/"/g, '&quot;')}">${match}</span>`;
            });
          }
        });
        
        if (hasMatch) {
          const span = document.createElement('span');
          span.innerHTML = text;
          node.parentNode.replaceChild(span, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'CODE' && node.tagName !== 'PRE') {
        // Don't process code blocks
        Array.from(node.childNodes).forEach(processTextNode);
      }
    };
    
    processTextNode(tempDiv);
    return tempDiv.innerHTML;
  };

  // Function to render markdown with glossary tooltips
  const renderMarkdownWithGlossary = (content) => {
    const markedContent = marked(content);
    const contentWithTooltips = addGlossaryTooltips(markedContent);
    return { __html: contentWithTooltips };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchChatHistory();
    fetchSuggestions();
    fetchGlossary();
    
    // Show Sanskrit quote only once per login session
    const quoteShownForSession = sessionStorage.getItem(`quoteShown_${loginTimestamp}`);
    if (!quoteShownForSession && loginTimestamp) {
      setShowQuoteGreeting(true);
      sessionStorage.setItem(`quoteShown_${loginTimestamp}`, 'true');
    }
  }, [loginTimestamp]);

  // Balance exercise timer effects
  useEffect(() => {
    if (!selectedExercise || exerciseTimer <= 0 || !isPracticing) return;

    const interval = setInterval(() => {
      setExerciseTimer(prev => {
        if (prev <= 1) {
          // Exercise completed
          setIsPracticing(false);
          setShowBalanceMode(false);
          return 0;
        }
        return prev - 1;
      });

      setExercisePhaseTimer(prev => {
        if (prev <= 1) {
          // Move to next phase
          const phases = selectedExercise.phases;
          const nextIndex = (exercisePhaseIndex + 1) % phases.length;
          setExercisePhaseIndex(nextIndex);
          
          // Play audio cue
          playAudioCue(phases[nextIndex].audio);
          
          return phases[nextIndex].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedExercise, exerciseTimer, exercisePhaseTimer, exercisePhaseIndex, isPracticing]);

  const playAudioCue = (type) => {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different frequencies for different cues
      switch(type) {
        case 'inhale':
          oscillator.frequency.value = 523; // C note - higher for inhale
          break;
        case 'exhale':
          oscillator.frequency.value = 392; // G note - lower for exhale
          break;
        case 'hold':
          oscillator.frequency.value = 440; // A note - middle
          break;
        case 'tense':
          oscillator.frequency.value = 330; // E note
          break;
        case 'release':
          oscillator.frequency.value = 293; // D note - low and calming
          break;
        case 'aware':
        case 'observe':
        case 'touch':
          oscillator.frequency.value = 349; // F note - gentle
          break;
        default:
          oscillator.frequency.value = 440;
      }
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    } catch (error) {
      console.log('Audio cue not available');
    }
  };

  const startExercise = (exercise) => {
    setSelectedExercise(exercise);
    setExerciseTimer(exercise.duration);
    setExercisePhaseIndex(0);
    setExercisePhaseTimer(exercise.phases[0].duration);
    setIsPracticing(true);
    playAudioCue(exercise.phases[0].audio);
  };

  const stopExercise = () => {
    setSelectedExercise(null);
    setExerciseTimer(0);
    setExercisePhaseIndex(0);
    setExercisePhaseTimer(0);
    setIsPracticing(false);
    setShowBalanceMode(false);
  };

  const openBalanceMode = () => {
    // Open selector view with default exercise selected
    const defaultExercise = BALANCE_EXERCISES.find(ex => ex.isDefault);
    setSelectedExercise(defaultExercise);
    setShowBalanceMode(true);
    setIsPracticing(false);
    setExerciseTimer(0);
  };

  const fetchSuggestions = async () => {
    try {
      const response = await chatAPI.getSuggestions();
      if (response.data.success) {
        setSuggestions(response.data.data.suggestions);
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  const fetchGlossary = async () => {
    try {
      const response = await articlesAPI.getGlossary();
      if (response.data.success && Array.isArray(response.data.data)) {
        // Convert array to object with term as key for faster lookup
        const glossaryMap = {};
        response.data.data.forEach(item => {
          glossaryMap[item.term] = item;
          // Also add transliteration as a key if different from term
          if (item.transliteration && item.transliteration !== item.term) {
            glossaryMap[item.transliteration] = item;
          }
        });
        setGlossary(glossaryMap);
      }
    } catch (error) {
      console.error('Failed to fetch glossary:', error);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await chatAPI.getHistory({ limit: 20 });
      if (response.data.success) {
        const history = response.data.data.consultations.map(consultation => [
          {
            type: 'user',
            content: consultation.chiefComplaint,
            timestamp: consultation.timestamp
          },
          {
            type: 'ai',
            content: consultation.aiResponse,
            timestamp: consultation.timestamp,
            triageFlag: consultation.triageFlag
          }
        ]).flat().reverse();
        
        setMessages(history);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    // Stop listening and any ongoing speech
    if (isListening) {
      stopListening();
    }
    if (isSpeaking) {
      stopSpeaking();
    }

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    resetTranscript(); // Clear transcript after sending
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage({ message: inputMessage });
      
      if (response.data.success) {
        const aiMessage = {
          type: 'ai',
          content: response.data.data.response,
          timestamp: new Date(),
          triageFlag: response.data.data.triageLevel,
          articles: response.data.data.articlesReferenced,
          id: response.data.data.consultationId // Add unique ID for TTS
        };
        setMessages(prev => [...prev, aiMessage]);
        
        // Refresh suggestions after conversation
        fetchSuggestions();
      }
    } catch (error) {
      const errorMessage = {
        type: 'error',
        content: `Error: ${getErrorMessage(error)}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Send on Enter, new line on Shift+Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSpeakMessage = (messageId, content) => {
    if (isSpeaking && speakingMessageId === messageId) {
      stopSpeaking();
      setSpeakingMessageId(null);
    } else {
      stopSpeaking(); // Stop any other message
      speak(content);
      setSpeakingMessageId(messageId);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    textareaRef.current?.focus();
  };

  if (loadingHistory) {
    return <Loading message="Loading your chat history..." />;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Sanskrit Quote Greeting Modal - Shows once per login */}
      {showQuoteGreeting && (
        <SanskritQuoteGreeting onClose={() => setShowQuoteGreeting(false)} />
      )}

      {/* Hidden audio element for exercise cues */}
      <audio ref={audioRef} />

      {/* Compact Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center shadow">
              <FaLeaf className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-lg font-heading font-bold text-gray-800">AyurAI</h1>
              <p className="text-xs text-gray-500">Your Ayurvedic Wellness Companion</p>
            </div>
          </div>
          
          {/* 1-Minute Balance Mode Button - Top Right */}
          <button
            onClick={openBalanceMode}
            className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-lg">🧘</span>
            <span className="hidden sm:inline">1-Minute Balance</span>
          </button>
        </div>
      </div>

      {/* Messages Area - Takes Center Stage */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-br from-green-50/30 via-white to-blue-50/30">
        <div className="max-w-5xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              {/* Welcome Section */}
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FaRobot className="text-4xl text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to AyurAI</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                  Get personalized Ayurvedic guidance for your wellness journey. Ask about digestion, sleep, stress, nutrition, or any health concern.
                </p>
                
                {/* Seasonal Awareness Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-teal-50 rounded-full border border-green-200 shadow-sm">
                  <span className="text-lg">🌿</span>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 font-medium">Season-Aware AI</p>
                    <p className="text-xs text-gray-700">
                      Automatically adapting to current <span className="font-semibold">Ritu</span> (see navbar)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-3xl ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.type === 'user'
                        ? 'bg-ayur-primary text-white'
                        : message.type === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-ayur-secondary text-ayur-primary'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <FaUser />
                    ) : message.type === 'error' ? (
                      <FaExclamationTriangle />
                    ) : (
                      <FaLeaf />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`px-4 py-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-ayur-primary text-white'
                        : message.type === 'error'
                        ? 'bg-red-50 text-red-800 border border-red-200'
                        : message.triageFlag === 'urgent'
                        ? 'bg-red-50 border-2 border-red-500'
                        : message.triageFlag === 'caution'
                        ? 'bg-yellow-50 border-2 border-yellow-500'
                        : 'bg-white shadow'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        {message.type === 'user' ? (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        ) : (
                          <div 
                            className="markdown-content prose prose-sm max-w-none ayur-glossary-content"
                            dangerouslySetInnerHTML={renderMarkdownWithGlossary(message.content)}
                          />
                        )}
                      </div>
                      
                      {/* Speaker button for AI messages */}
                      {message.type === 'ai' && isTTSSupported && (
                        <button
                          onClick={() => handleSpeakMessage(message.id || index, message.content)}
                          className="flex-shrink-0 p-2 rounded-full hover:bg-gray-200 transition-colors"
                          title={isSpeaking && speakingMessageId === (message.id || index) ? "Stop speaking" : "Read aloud"}
                        >
                          {isSpeaking && speakingMessageId === (message.id || index) ? (
                            <FaVolumeMute className="text-ayur-primary animate-pulse" />
                          ) : (
                            <FaVolumeUp className="text-gray-600 hover:text-ayur-primary" />
                          )}
                        </button>
                      )}
                    </div>
                    
                    {/* Articles Referenced */}
                    {message.articles && message.articles.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-600 mb-2">📚 Referenced Articles:</p>
                        {message.articles.map((article, idx) => (
                          <p key={idx} className="text-xs text-gray-600">• {article.title}</p>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs mt-2 opacity-70">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg shadow">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-ayur-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-ayur-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-ayur-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600">AyurAI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
            {/* Microphone Button */}
            {isSpeechRecognitionSupported && (
              <button
                type="button"
                onClick={handleMicClick}
                className={`flex-shrink-0 p-3 rounded-lg transition ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isListening ? "Stop recording" : "Start voice input"}
              >
                {isListening ? <FaStop /> : <FaMicrophone />}
              </button>
            )}

            {/* Textarea Input */}
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your wellness concern or ask a question... (Shift+Enter for new line)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-primary focus:border-transparent resize-none overflow-y-auto"
              disabled={loading}
              rows="1"
              style={{ minHeight: '48px', maxHeight: '150px' }}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="flex-shrink-0 bg-ayur-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <FaPaperPlane />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

          {/* Status indicators */}
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              {isListening && (
                <span className="text-red-500 font-semibold animate-pulse">🎤 Listening...</span>
              )}
              {!isListening && (
                <>⚠️ AyurAI is educational only. Seek immediate medical care for severe symptoms.</>
              )}
            </p>
            <p className="text-xs text-gray-400">
              Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> to send, 
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs ml-1">Shift+Enter</kbd> for new line
            </p>
          </div>


        </div>
      </div>

      {/* Balance Mode Modal */}
      {showBalanceMode && selectedExercise && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-green-50 via-white to-teal-50 rounded-3xl shadow-2xl max-w-md w-full relative border-2 border-green-300">
            {/* Close Button */}
            <button
              onClick={stopExercise}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-light w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors z-10"
            >
              ×
            </button>

            {!isPracticing ? (
              /* Selector View - Initial State */
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-3">{selectedExercise.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{selectedExercise.name}</h2>
                  <p className="text-sm text-gray-600 mb-4">{selectedExercise.subtitle}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                    <span className="text-sm font-semibold text-green-800">⏱️ {selectedExercise.duration}s Session</span>
                  </div>
                </div>

                {/* Exercise Selector Dropdown */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Choose Your Practice</label>
                  <div className="grid grid-cols-5 gap-2">
                    {BALANCE_EXERCISES.map(exercise => (
                      <button
                        key={exercise.id}
                        onClick={() => setSelectedExercise(exercise)}
                        className={`p-3 rounded-xl text-2xl transition-all transform hover:scale-110 ${
                          selectedExercise.id === exercise.id 
                            ? 'bg-green-500 shadow-lg scale-110 ring-2 ring-green-300' 
                            : 'bg-white hover:bg-green-50 shadow'
                        }`}
                        title={exercise.name}
                      >
                        {exercise.icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Steps Summary */}
                <div className="bg-white rounded-2xl p-4 shadow-inner border-2 border-green-100 mb-6">
                  <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span>📋</span> Practice Steps
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    {selectedExercise.phases.map((phase, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="font-semibold text-green-600 min-w-[20px]">{idx + 1}.</span>
                        <span>{phase.instruction} <span className="text-gray-500">({phase.duration}s)</span></span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-3 mb-6 border border-green-200">
                  <p className="text-xs text-gray-700">
                    <span className="font-semibold">✨ Benefits: </span>{selectedExercise.benefits}
                  </p>
                </div>

                {/* Start Button */}
                <button
                  onClick={() => startExercise(selectedExercise)}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Begin Practice
                </button>
              </div>
            ) : (
              /* Practice View - Active Timer */
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="text-6xl mb-3 animate-pulse">{selectedExercise.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{selectedExercise.name}</h2>
                  <p className="text-sm text-gray-600">{selectedExercise.subtitle}</p>
                </div>

                {/* Countdown Timer */}
                <div className="mb-6">
                  <div className="text-6xl font-bold text-green-600 tabular-nums mb-2">
                    {exerciseTimer}s
                  </div>
                  <div className="w-full bg-green-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-1000 ease-linear"
                      style={{ width: `${(exerciseTimer / selectedExercise.duration) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((exerciseTimer / selectedExercise.duration) * 100)}% Complete
                  </p>
                </div>

                {/* Current Instruction */}
                <div className="bg-white rounded-2xl p-6 shadow-inner border-2 border-green-100 mb-4">
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    {selectedExercise.phases[exercisePhaseIndex].instruction}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    {selectedExercise.phases[exercisePhaseIndex].posture}
                  </p>
                </div>

                {/* Stop Button */}
                <button
                  onClick={stopExercise}
                  className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300"
                >
                  Stop Practice
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

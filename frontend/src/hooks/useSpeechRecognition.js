import { useState, useRef } from 'react';

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);
  const isActiveRef = useRef(false);
  const fullTranscriptRef = useRef('');

  const startListening = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true
      });
      
      streamRef.current = stream;

      // Initialize Web Speech API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        alert('⚠️ Speech recognition not supported. Please use Chrome or Edge browser.');
        stream.getTracks().forEach(track => track.stop());
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian English for better accent recognition
      recognition.maxAlternatives = 1; // Limit alternatives for better performance

      recognition.onstart = () => {
        setIsListening(true);
        isActiveRef.current = true;
        fullTranscriptRef.current = '';
        setTranscript(''); // Clear on start
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        // Only process NEW results starting from resultIndex
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptText = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcriptText + ' ';
          } else {
            interimTranscript += transcriptText;
          }
        }
        
        // Only update full transcript with NEW final results
        if (finalTranscript) {
          fullTranscriptRef.current += finalTranscript;
        }
        
        // Update state with accumulated final + current interim
        setTranscript(fullTranscriptRef.current + interimTranscript);
      };

      recognition.onerror = (event) => {
        // Silently ignore network errors
        if (event.error === 'network') {
          return;
        }
        
        if (event.error === 'not-allowed') {
          alert('🎤 Microphone permission denied');
          stopListening();
        }
      };

      recognition.onend = () => {
        // Auto-restart if still active
        if (isActiveRef.current) {
          setTimeout(() => {
            if (isActiveRef.current && recognitionRef.current) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                // Silent fail
              }
            }
          }, 200); // Increased delay to reduce CPU load
        } else {
          setIsListening(false);
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
          }
        }
      };

      recognitionRef.current = recognition;
      recognition.start();

    } catch (error) {
      if (error.name === 'NotAllowedError') {
        alert('🎤 Please allow microphone access in your browser settings');
      } else if (error.name === 'NotFoundError') {
        alert('🎤 No microphone found');
      }
      
      setIsListening(false);
      isActiveRef.current = false;
    }
  };

  const stopListening = () => {
    isActiveRef.current = false;
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      } catch (error) {
        // Silent
      }
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setIsListening(false);
  };

  const resetTranscript = () => {
    setTranscript('');
    fullTranscriptRef.current = '';
  };

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  };
};

import { useState, useEffect } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
    
    // Load available voices
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = (text) => {
    if (!isSupported) {
      console.error('Text-to-speech not supported in this browser');
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Pronunciation corrections for common Ayurvedic terms
    // Using subtle phonetic adjustments that flow naturally
    const ayurvedicPronunciations = {
      'vata': 'vaata',
      'pitta': 'pitta',
      'kapha': 'kaffa',
      'dosha': 'doasha',
      'doshas': 'doashas',
      'agni': 'aagni',
      'ama': 'aama',
      'ojas': 'ojus',
      'prana': 'praana',
      'prakriti': 'prakritee',
      'vikriti': 'vikritee',
      'dhatu': 'daatu',
      'dhatus': 'daatus',
      'srotas': 'srotas',
      'rasayana': 'rasaayana',
      'panchakarma': 'pancha karma',
      'triphala': 'tri fala',
      'ashwagandha': 'ashwa gandha',
      'turmeric': 'turmeric',
      'ghee': 'ghee',
      'khichdi': 'khichree',
      'khichadi': 'khichree',
      'ayurveda': 'ayur veda',
      'ayurvedic': 'ayur vedic',
      'brahmi': 'braamee',
      'shatavari': 'shata varee',
      'tulsi': 'tulsee',
      'neem': 'neem',
      'guduchi': 'gudoochee',
      'amalaki': 'aamala kee'
    };

    // Clean and apply pronunciation hints
    let cleanText = text
      .replace(/[#*_`~]/g, '') // Remove markdown symbols
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\n+/g, '. '); // Replace newlines with pauses

    // Apply Ayurvedic term pronunciations (case-insensitive)
    Object.entries(ayurvedicPronunciations).forEach(([term, pronunciation]) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      cleanText = cleanText.replace(regex, pronunciation);
    });

    cleanText = cleanText.trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Try to use the best quality voice available
    const bestVoice = voices.find(voice => 
      (voice.lang === 'en-US' || voice.lang === 'en-GB') && 
      (voice.name.includes('Microsoft') || voice.name.includes('Google')) &&
      !voice.name.includes('Basic')
    );
    
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    
    utterance.lang = 'en-US'; // US English for smooth delivery
    utterance.rate = 0.9; // Natural speaking pace
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return {
    speak,
    stop,
    isSpeaking,
    isSupported
  };
};

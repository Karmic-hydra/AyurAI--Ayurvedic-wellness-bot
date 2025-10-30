import { useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import api from '../services/api';

/**
 * GlossaryWrapper Component
 * Detects Ayurvedic/Sanskrit terms in text and adds interactive tooltips
 * Fetches glossary data from backend and wraps detected terms
 */
const GlossaryWrapper = ({ children, content }) => {
  const [glossary, setGlossary] = useState({});
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    fetchGlossary();
  }, []);

  const fetchGlossary = async () => {
    try {
      const response = await api.get('/articles/reference/glossary');
      if (response.data.success) {
        // Convert array to object for faster lookup
        const glossaryMap = {};
        response.data.data.forEach(item => {
          glossaryMap[item.term.toLowerCase()] = item;
        });
        setGlossary(glossaryMap);
      }
    } catch (error) {
      console.error('Error fetching glossary:', error);
      // Use fallback glossary
      setGlossary(getFallbackGlossary());
    }
  };

  const getFallbackGlossary = () => {
    return {
      'dosha': {
        term: 'Dosha',
        sanskrit: 'दोष',
        transliteration: 'Dosha',
        definition: 'Bio-energetic forces (Vata, Pitta, Kapha) governing body and mind.'
      },
      'agni': {
        term: 'Agni',
        sanskrit: 'अग्नि',
        transliteration: 'Agni',
        definition: 'Digestive fire; transforms food into energy and consciousness.'
      },
      'ama': {
        term: 'Ama',
        sanskrit: 'आम',
        transliteration: 'Ama',
        definition: 'Toxic residue from incomplete digestion or unprocessed emotions.'
      },
      'vata': {
        term: 'Vata',
        sanskrit: 'वात',
        transliteration: 'Vata',
        definition: 'Air + Space element. Governs movement, circulation, breathing.'
      },
      'pitta': {
        term: 'Pitta',
        sanskrit: 'पित्त',
        transliteration: 'Pitta',
        definition: 'Fire + Water element. Governs transformation, metabolism, digestion.'
      },
      'kapha': {
        term: 'Kapha',
        sanskrit: 'कफ',
        transliteration: 'Kapha',
        definition: 'Water + Earth element. Governs structure, lubrication, immunity.'
      },
      'prakriti': {
        term: 'Prakriti',
        sanskrit: 'प्रकृति',
        transliteration: 'Prakriti',
        definition: 'Birth constitution; your unique dosha combination.'
      },
      'ojas': {
        term: 'Ojas',
        sanskrit: 'ओजस्',
        transliteration: 'Ojas',
        definition: 'Vital essence; subtle energy of immunity and vitality.'
      }
    };
  };

  const wrapGlossaryTerms = (text) => {
    if (!text || Object.keys(glossary).length === 0) return text;

    // Create regex pattern from glossary terms (case-insensitive)
    const terms = Object.keys(glossary).sort((a, b) => b.length - a.length); // Sort by length to match longer terms first
    const pattern = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');

    const parts = [];
    let lastIndex = 0;
    let match;
    let keyCounter = 0;

    // Find all matches
    while ((match = pattern.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index),
          key: `text-${keyCounter++}`
        });
      }

      // Add glossary term
      const term = match[0];
      const termKey = term.toLowerCase();
      parts.push({
        type: 'glossary',
        content: term,
        data: glossary[termKey],
        key: `glossary-${keyCounter++}`
      });

      lastIndex = match.index + term.length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex),
        key: `text-${keyCounter++}`
      });
    }

    return parts;
  };

  const renderContent = () => {
    const parts = wrapGlossaryTerms(content);
    
    if (!parts || parts.length === 0) return <span>{content}</span>;
    
    return parts.map((part) => {
      if (part.type === 'text') {
        return <span key={part.key} dangerouslySetInnerHTML={{ __html: part.content }} />;
      }

      if (part.type === 'glossary' && part.data) {
        return (
          <span
            key={part.key}
            className="relative inline-block"
          >
            <span
              className="glossary-term cursor-help border-b-2 border-dotted border-green-500 text-green-700 font-medium hover:bg-green-50 transition-colors px-0.5"
              onMouseEnter={() => setActiveTooltip(part.key)}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => setActiveTooltip(activeTooltip === part.key ? null : part.key)}
            >
              {part.content}
              <FaInfoCircle className="inline ml-0.5 text-xs" />
            </span>

            {/* Tooltip */}
            {activeTooltip === part.key && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 bg-white border-2 border-green-300 rounded-lg shadow-xl p-4 z-50 animate-fadeIn">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                  <div className="border-8 border-transparent border-t-green-300"></div>
                </div>
                
                <div className="text-center mb-2">
                  <h4 className="font-bold text-green-800 text-lg">{part.data.term}</h4>
                  {part.data.sanskrit && (
                    <p className="text-amber-700 text-xl font-serif mt-1">{part.data.sanskrit}</p>
                  )}
                  {part.data.transliteration && (
                    <p className="text-green-600 text-sm italic">({part.data.transliteration})</p>
                  )}
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed border-t border-gray-200 pt-2">
                  {part.data.definition}
                </p>
              </div>
            )}
          </span>
        );
      }

      return null;
    });
  };

  return (
    <div className="glossary-content">
      {content ? <div>{renderContent()}</div> : children}
    </div>
  );
};

export default GlossaryWrapper;

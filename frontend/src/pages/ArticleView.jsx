import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaLeaf, FaExternalLinkAlt, FaCalendar, FaUserMd } from 'react-icons/fa';
import { marked } from 'marked';
import { articlesAPI } from '../services/api';
import { getErrorMessage, formatDate } from '../utils/helpers';
import Loading from '../components/Loading';

export default function ArticleView() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await articlesAPI.getArticle(id);
      if (response.data.success) {
        const articleData = response.data.data.article;
        // Convert markdown to HTML
        if (articleData.body) {
          articleData.bodyHTML = marked(articleData.body);
        }
        setArticle(articleData);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'basics': 'bg-blue-100 text-blue-800',
      'seasonal': 'bg-green-100 text-green-800',
      'safety': 'bg-red-100 text-red-800',
      'lifestyle': 'bg-purple-100 text-purple-800',
      'herbs': 'bg-yellow-100 text-yellow-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/articles" className="text-ayur-primary hover:underline">
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Article not found</p>
          <Link to="/articles" className="text-ayur-primary hover:underline">
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/articles"
          className="inline-flex items-center space-x-2 text-ayur-primary hover:text-ayur-dark transition mb-6"
        >
          <FaArrowLeft />
          <span>Back to Articles</span>
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-ayur-primary to-green-800 p-8 text-white">
            <FaLeaf className="text-5xl text-ayur-secondary mb-4" />
            
            {/* Category Badge */}
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl font-heading font-bold mb-4">
              {article.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap gap-6 text-sm text-green-100">
              {article.lastReviewed && (
                <div className="flex items-center space-x-2">
                  <FaCalendar />
                  <span>Last Reviewed: {formatDate(article.lastReviewed)}</span>
                </div>
              )}
              {article.reviewedBy && (
                <div className="flex items-center space-x-2">
                  <FaUserMd />
                  <span>Reviewed by: {article.reviewedBy}</span>
                </div>
              )}
            </div>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {/* Summary */}
            {article.summary && (
              <div className="bg-ayur-light border-l-4 border-ayur-primary p-4 mb-8">
                <p className="text-gray-700 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            )}

            {/* Main Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.bodyHTML || article.body }}
            />

            {/* Sources */}
            {article.sources && article.sources.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-heading font-bold text-ayur-dark mb-4">
                  References & Sources
                </h2>
                <ul className="space-y-3">
                  {article.sources.map((source, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-ayur-primary font-bold flex-shrink-0">
                        [{index + 1}]
                      </span>
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ayur-primary hover:underline flex items-center space-x-2"
                        >
                          <span>{source.name}</span>
                          <FaExternalLinkAlt className="text-xs" />
                        </a>
                      ) : (
                        <span className="text-gray-700">{source.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-bold text-yellow-900 mb-2">Important Disclaimer</h3>
              <p className="text-sm text-yellow-800">
                This article is for educational purposes only and does not constitute medical advice. 
                Always consult qualified healthcare professionals before making health decisions or 
                starting new treatments. If you experience medical emergencies, seek immediate medical attention.
              </p>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            to="/chat"
            className="inline-flex items-center space-x-2 bg-ayur-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            <FaLeaf />
            <span>Discuss with AyurAI</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

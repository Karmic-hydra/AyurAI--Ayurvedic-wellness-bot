import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaSearch, FaLeaf, FaArrowRight } from 'react-icons/fa';
import { articlesAPI } from '../services/api';
import { getErrorMessage } from '../utils/helpers';
import Loading from '../components/Loading';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [searchTerm, selectedCategory, articles]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await articlesAPI.getArticles();
      if (response.data.success) {
        const articleData = response.data.data.articles;
        setArticles(articleData);
        setFilteredArticles(articleData);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(articleData.map(a => a.category))];
        setCategories(['all', ...uniqueCategories]);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
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
    return colors[category.toLowerCase()] || colors.default;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaBook className="text-5xl text-ayur-primary" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-ayur-dark mb-4">
            Ayurvedic Knowledge Base
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore evidence-based articles on Ayurvedic principles, seasonal routines, 
            safety guidelines, and wellness practices.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <FaLeaf className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Link
                key={article._id}
                to={`/articles/${article._id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
              >
                {/* Article Header */}
                <div className="bg-gradient-to-br from-ayur-primary to-green-800 p-6">
                  <FaLeaf className="text-4xl text-ayur-secondary mb-2" />
                </div>

                {/* Article Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-ayur-dark mb-2 group-hover:text-ayur-primary transition">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  {article.summary && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {article.lastReviewed && new Date(article.lastReviewed).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-2 text-ayur-primary font-bold group-hover:translate-x-2 transition-transform">
                      <span>Read More</span>
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-ayur-light rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <FaLeaf className="text-2xl text-ayur-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-ayur-dark mb-2">Evidence-Based Information</h3>
              <p className="text-sm text-gray-700">
                All articles are reviewed for accuracy and cite authoritative sources including 
                classical Ayurvedic texts, peer-reviewed research, and recognized Ayurvedic institutions. 
                This knowledge base is designed to complement, not replace, professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

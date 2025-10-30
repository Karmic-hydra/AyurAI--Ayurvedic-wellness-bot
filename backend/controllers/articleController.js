import Article from '../models/Article.js';

// @desc    Get all articles
// @route   GET /api/articles
// @access  Public
export const getArticles = async (req, res) => {
  try {
    const { category, featured, search, limit = 20, page = 1 } = req.query;

    const query = { status: 'published' };
    
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const skip = (page - 1) * limit;

    const articles = await Article.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-body'); // Exclude full body from list

    const total = await Article.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        articles,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching articles',
      error: error.message
    });
  }
};

// @desc    Get single article
// @route   GET /api/articles/:id
// @access  Public
export const getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Increment views
    await article.incrementViews();

    res.status(200).json({
      success: true,
      data: { article }
    });

  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching article',
      error: error.message
    });
  }
};

// @desc    Get article by slug
// @route   GET /api/articles/slug/:slug
// @access  Public
export const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Increment views
    await article.incrementViews();

    res.status(200).json({
      success: true,
      data: { article }
    });

  } catch (error) {
    console.error('Get article by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching article',
      error: error.message
    });
  }
};

// @desc    Get article categories
// @route   GET /api/articles/categories/list
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Article.distinct('category', { status: 'published' });

    res.status(200).json({
      success: true,
      data: { categories }
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

export default {
  getArticles,
  getArticle,
  getArticleBySlug,
  getCategories
};

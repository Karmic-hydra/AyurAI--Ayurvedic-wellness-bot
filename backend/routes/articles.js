import express from 'express';
import {
  getArticles,
  getArticle,
  getArticleBySlug,
  getCategories
} from '../controllers/articleController.js';
import Article from '../models/Article.js';

const router = express.Router();

// Public routes
router.get('/', getArticles);
router.get('/categories/list', getCategories);

// Get glossary data
router.get('/reference/glossary', async (req, res) => {
  try {
    const glossary = await Article.findOne({ slug: 'ayurvedic-glossary-reference' });
    if (!glossary) {
      return res.status(404).json({ success: false, message: 'Glossary not found' });
    }
    res.json({ success: true, data: JSON.parse(glossary.content) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get random Sanskrit quote
router.get('/reference/quote', async (req, res) => {
  try {
    const quotes = await Article.findOne({ slug: 'ayurvedic-sanskrit-quotes' });
    if (!quotes) {
      return res.status(404).json({ success: false, message: 'Quotes not found' });
    }
    const quotesArray = JSON.parse(quotes.content);
    const randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
    res.json({ success: true, data: randomQuote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get current Ritu (season) info
router.get('/reference/ritu', async (req, res) => {
  try {
    const { getCurrentRitu } = await import('../utils/seasonDetector.js');
    const rituInfo = getCurrentRitu();
    res.json({ success: true, data: rituInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/slug/:slug', getArticleBySlug);
router.get('/:id', getArticle);

export default router;

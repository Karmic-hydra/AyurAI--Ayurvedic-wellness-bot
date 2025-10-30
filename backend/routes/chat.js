import express from 'express';
import {
  sendMessage,
  getChatHistory,
  getConsultation,
  submitFeedback,
  getSmartSuggestions,
  getQuickPractice
} from '../controllers/chatController.js';
import { protect } from '../middleware/auth.js';
import { chatMessageValidation } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/message', chatMessageValidation, sendMessage);
router.get('/history', getChatHistory);
router.get('/suggestions', getSmartSuggestions);
router.get('/quick-practice', getQuickPractice);
router.get('/:id', getConsultation);
router.put('/:id/feedback', submitFeedback);

export default router;

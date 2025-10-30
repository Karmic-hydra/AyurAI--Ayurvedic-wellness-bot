import express from 'express';
import {
  getProfile,
  updateProfile,
  submitPrakritiAssessment,
  getPrakriti,
  generateWellnessCardController
} from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js';
import { prakritiValidation } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/', getProfile);
router.put('/', updateProfile);

router.get('/prakriti', getPrakriti);
router.post('/prakriti', prakritiValidation, submitPrakritiAssessment);

router.post('/wellness-card', generateWellnessCardController);

export default router;

import { body, validationResult } from 'express-validator';

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
export const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  
  body('consentGiven')
    .isBoolean().withMessage('Consent must be provided')
    .equals('true').withMessage('You must agree to the terms and consent to use AyurAI'),
  
  validate
];

// Login validation
export const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  validate
];

// Chat message validation
export const chatMessageValidation = [
  body('message')
    .trim()
    .notEmpty().withMessage('Message cannot be empty')
    .isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters'),
  
  validate
];

// Prakriti assessment validation
export const prakritiValidation = [
  body('doshaScores.vata')
    .isInt({ min: 0, max: 100 }).withMessage('Vata score must be between 0 and 100'),
  
  body('doshaScores.pitta')
    .isInt({ min: 0, max: 100 }).withMessage('Pitta score must be between 0 and 100'),
  
  body('doshaScores.kapha')
    .isInt({ min: 0, max: 100 }).withMessage('Kapha score must be between 0 and 100'),
  
  validate
];

// Vitals validation
export const vitalsValidation = [
  body('temp')
    .optional()
    .isFloat({ min: 35, max: 42 }).withMessage('Temperature must be between 35-42°C'),
  
  body('bp')
    .optional()
    .matches(/^\d{2,3}\/\d{2,3}$/).withMessage('BP must be in format 120/80'),
  
  body('hr')
    .optional()
    .isInt({ min: 40, max: 200 }).withMessage('Heart rate must be between 40-200'),
  
  body('spo2')
    .optional()
    .isInt({ min: 70, max: 100 }).withMessage('SpO2 must be between 70-100'),
  
  validate
];

export default {
  validate,
  registerValidation,
  loginValidation,
  chatMessageValidation,
  prakritiValidation,
  vitalsValidation
};

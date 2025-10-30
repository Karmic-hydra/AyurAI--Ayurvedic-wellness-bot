import User from '../models/User.js';
import Wellness from '../models/Wellness.js';
import { calculateDominantDosha } from '../utils/contextBuilder.js';
import { generateWellnessCard } from '../utils/astrologyService.js';

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Fetch active wellness card data
    const wellnessCard = await Wellness.getActiveWellnessCard(req.user.id);
    
    console.log('📋 Profile fetched for user:', user.name);
    if (user.prakriti?.doshaScores) {
      console.log('🌿 Current Prakriti:', user.prakriti.doshaScores);
    } else {
      console.log('⚠️  No Prakriti data found for user');
    }

    // Return user with wellness card data
    res.status(200).json({
      success: true,
      data: { 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          dob: user.dob,
          contact: user.contact,
          birthDetails: wellnessCard?.birthDetails || null,
          wellnessCard: wellnessCard ? {
            generated: true,
            ...wellnessCard.wellnessCard,
            generatedDate: wellnessCard.generatedDate,
            lastUpdated: wellnessCard.lastUpdated
          } : { generated: false },
          profileCompletion: user.profileCompletion,
          prakriti: user.prakriti,
          preferences: user.preferences,
          medicalHistory: user.medicalHistory
        }
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, contact, preferences, medicalHistory, prakriti } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (contact) updateData.contact = contact;
    if (preferences) updateData.preferences = preferences;
    if (medicalHistory) updateData.medicalHistory = medicalHistory;
    if (prakriti) updateData.prakriti = prakriti;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    );

    // Return user with consistent id field
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          dob: user.dob,
          contact: user.contact,
          prakriti: user.prakriti,
          preferences: user.preferences,
          medicalHistory: user.medicalHistory
        }
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

// @desc    Submit Prakriti assessment
// @route   POST /api/profile/prakriti
// @access  Private
export const submitPrakritiAssessment = async (req, res) => {
  try {
    const { doshaScores } = req.body;

    console.log('📊 Submitting Prakriti assessment for user:', req.user.id);
    console.log('📊 Dosha scores received:', doshaScores);

    // Validate that scores sum to approximately 100 (with some tolerance for rounding)
    const sum = doshaScores.vata + doshaScores.pitta + doshaScores.kapha;
    if (sum < 98 || sum > 102) {
      console.warn('⚠️  Warning: Dosha scores sum to', sum, '(expected ~100)');
    }

    // Calculate dominant dosha
    const dominantDosha = calculateDominantDosha(doshaScores);
    console.log('🌿 Dominant dosha calculated:', dominantDosha);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        'prakriti.assessed': true,
        'prakriti.doshaScores': doshaScores,
        'prakriti.dominantDosha': dominantDosha,
        'prakriti.assessmentDate': new Date(),
        'profileCompletion.prakritiAssessed': true
      },
      { new: true }
    );

    console.log('✅ Prakriti assessment saved successfully');
    console.log('🌿 Updated Prakriti:', user.prakriti);

    res.status(200).json({
      success: true,
      message: 'Prakriti assessment saved successfully',
      data: {
        prakriti: user.prakriti,
        dominantDosha
      }
    });

  } catch (error) {
    console.error('❌ Submit prakriti error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving prakriti assessment',
      error: error.message
    });
  }
};

// @desc    Get Prakriti assessment
// @route   GET /api/profile/prakriti
// @access  Private
export const getPrakriti = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('prakriti');

    res.status(200).json({
      success: true,
      data: {
        prakriti: user.prakriti
      }
    });

  } catch (error) {
    console.error('Get prakriti error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching prakriti',
      error: error.message
    });
  }
};

// @desc    Generate Astrological Ayurvedic Wellness Card
// @route   POST /api/profile/wellness-card
// @access  Private
// @note    Regenerates card with current time and astrological positions when called
export const generateWellnessCardController = async (req, res) => {
  try {
    const { birthDate, birthTime, birthPlace, latitude, longitude } = req.body;

    console.log('🌟 Wellness card generation/refresh request:', { birthDate, birthTime, birthPlace, latitude, longitude });
    console.log('⏰ Using current time for astrological calculations');

    // Validate inputs
    if (!birthDate || !birthTime || !birthPlace || !latitude || !longitude) {
      console.error('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide all birth details: date, time, place, latitude, and longitude'
      });
    }

    // Validate latitude and longitude
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      console.error('❌ Invalid coordinates');
      return res.status(400).json({
        success: false,
        message: 'Invalid latitude or longitude values'
      });
    }

    // Generate wellness card using Prokerala API
    const result = await generateWellnessCard(birthDate, birthTime, birthPlace, latitude, longitude);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message || 'Failed to generate wellness card'
      });
    }

    // Deactivate old wellness cards for this user
    await Wellness.deactivateOldCards(req.user.id);

    // Create new wellness card in Wellness collection
    const wellnessCard = await Wellness.create({
      userId: req.user.id,
      birthDetails: {
        date: new Date(birthDate),
        time: birthTime,
        place: birthPlace,
        latitude: lat,
        longitude: lon,
        timezone: 'Asia/Kolkata'
      },
      wellnessCard: {
        astroType: result.data.astroType,
        moonSign: result.data.moonSign,
        ascendant: result.data.ascendant,
        dominantElement: result.data.dominantElement,
        dominantPlanet: result.data.dominantPlanet,
        traits: result.data.traits,
        balanceTips: result.data.balanceTips,
        planetaryInsight: result.data.planetaryInsight,
        dailyMantra: result.data.dailyMantra
      },
      generatedDate: result.data.generatedDate || new Date(),
      lastUpdated: new Date(),
      isActive: true
    });

    // Update user profile completion status
    await User.findByIdAndUpdate(
      req.user.id,
      {
        'profileCompletion.wellnessCardGenerated': true
      },
      { new: true }
    );

    console.log('🌟 Wellness Card generated for user:', req.user.id);
    console.log('🔮 Astro-Ayurvedic Type:', result.data.astroType);

    res.status(200).json({
      success: true,
      message: 'Wellness card generated successfully',
      data: {
        wellnessCard: {
          generated: true,
          ...wellnessCard.wellnessCard,
          generatedDate: wellnessCard.generatedDate,
          lastUpdated: wellnessCard.lastUpdated
        },
        birthDetails: wellnessCard.birthDetails
      }
    });

  } catch (error) {
    console.error('Generate wellness card error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating wellness card',
      error: error.message
    });
  }
};

export default {
  getProfile,
  updateProfile,
  submitPrakritiAssessment,
  getPrakriti,
  generateWellnessCardController
};

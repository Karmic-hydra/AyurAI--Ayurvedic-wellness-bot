import mongoose from 'mongoose';

const wellnessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  // Birth Details
  birthDetails: {
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true // Format: "HH:MM" (24-hour)
    },
    place: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    timezone: {
      type: String,
      default: 'Asia/Kolkata'
    }
  },
  // Wellness Card Data
  wellnessCard: {
    astroType: {
      type: String,
      required: true // e.g., "Pitta-Kapha"
    },
    moonSign: {
      type: String,
      required: true // Chandra Rashi
    },
    ascendant: {
      type: String,
      required: true // Lagna
    },
    dominantElement: {
      type: String,
      required: true // Fire, Earth, Air, Water
    },
    dominantPlanet: {
      type: String,
      required: true // Mars, Venus, etc.
    },
    traits: [{
      type: String
    }],
    balanceTips: [{
      type: String
    }],
    planetaryInsight: {
      type: String
    },
    dailyMantra: {
      type: String
    }
  },
  // Metadata
  generatedDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
wellnessSchema.index({ userId: 1, isActive: 1 });

// Get active wellness card for a user
wellnessSchema.statics.getActiveWellnessCard = function(userId) {
  return this.findOne({ userId, isActive: true }).sort({ lastUpdated: -1 });
};

// Deactivate old wellness cards when generating a new one
wellnessSchema.statics.deactivateOldCards = async function(userId) {
  return this.updateMany(
    { userId, isActive: true },
    { $set: { isActive: false } }
  );
};

const Wellness = mongoose.model('Wellness', wellnessSchema);

export default Wellness;

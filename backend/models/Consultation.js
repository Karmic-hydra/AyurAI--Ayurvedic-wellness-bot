import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  chiefComplaint: {
    type: String,
    required: [true, 'Chief complaint is required']
  },
  symptoms: [{
    name: { type: String, required: true },
    onset: { type: Date },
    severity: { type: Number, min: 1, max: 10 },
    duration: { type: String },
    description: { type: String }
  }],
  vitals: {
    temp: { type: Number }, // Celsius
    bp: { type: String }, // e.g., "120/80"
    hr: { type: Number }, // Heart rate
    spo2: { type: Number }, // Oxygen saturation
    weight: { type: Number }, // kg
    height: { type: Number } // cm
  },
  vikriti: {
    vata: { type: Number, min: 0, max: 10, default: 5 },
    pitta: { type: Number, min: 0, max: 10, default: 5 },
    kapha: { type: Number, min: 0, max: 10, default: 5 }
  },
  dietLog: [{
    meal: { type: String },
    time: { type: Date },
    items: [String],
    notes: { type: String }
  }],
  sleepLog: {
    hours: { type: Number },
    quality: { type: String, enum: ['poor', 'fair', 'good', 'excellent'] },
    notes: { type: String }
  },
  medications: [{
    name: { type: String },
    dosage: { type: String },
    frequency: { type: String }
  }],
  pulseNotes: {
    type: String
  },
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter']
  },
  localWeather: {
    type: String
  },
  aiResponse: {
    type: String,
    required: true
  },
  adviceGiven: [{
    type: String
  }],
  articlesReferenced: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }],
  triageFlag: {
    type: String,
    enum: ['none', 'caution', 'urgent'],
    default: 'none',
    required: true
  },
  redFlagsDetected: [{
    category: String,
    keyword: String,
    severity: String
  }],
  cautionFlagsDetected: [{
    category: String,
    keyword: String
  }],
  followUp: {
    needed: { type: Boolean, default: false },
    date: { type: Date },
    reason: { type: String }
  },
  userFeedback: {
    helpful: { type: Boolean },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String }
  }
}, {
  timestamps: true
});

// Index for efficient querying
consultationSchema.index({ userId: 1, timestamp: -1 });
consultationSchema.index({ triageFlag: 1 });

// Get recent consultations for a user
consultationSchema.statics.getRecentByUser = function(userId, limit = 10) {
  return this.find({ userId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .populate('articlesReferenced', 'title slug');
};

// Get urgent consultations
consultationSchema.statics.getUrgentCases = function(limit = 50) {
  return this.find({ triageFlag: 'urgent' })
    .sort({ timestamp: -1 })
    .limit(limit)
    .populate('userId', 'name email contact');
};

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;

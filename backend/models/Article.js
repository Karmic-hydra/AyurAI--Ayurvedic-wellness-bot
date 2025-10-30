import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Article title is required'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    enum: ['tridosha', 'herbs', 'ritucharya', 'dinacharya', 'diet', 'lifestyle', 'safety', 'pranayama', 'yoga', 'general']
  },
  body: {
    type: String,
    required: [true, 'Article body is required']
  },
  summary: {
    type: String,
    maxlength: [500, 'Summary cannot exceed 500 characters']
  },
  sources: [{
    name: {
      type: String,
      required: true
    },
    url: {
      type: String
    }
  }],
  tags: [{
    type: String
  }],
  doshaRelevance: {
    vata: { type: Boolean, default: false },
    pitta: { type: Boolean, default: false },
    kapha: { type: Boolean, default: false }
  },
  contraindications: [{
    condition: String,
    warning: String
  }],
  lastReviewed: {
    type: Date,
    default: Date.now
  },
  reviewedBy: {
    type: String,
    required: [true, 'Reviewer information is required']
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create slug from title
articleSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Increment view count
articleSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

const Article = mongoose.model('Article', articleSchema);

export default Article;

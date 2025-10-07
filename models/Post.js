import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserTennis',
    required: true
  },
  level: {
    type: String,
    enum: ['Principiante', 'Intermedio', 'Avanzado', 'Profesional', 'Cualquiera'],
    required: true
  },
  gameDetails: {
    preferredTime: {
      type: String,
      required: true
    },
    courtType: {
      type: String,
      enum: ['Arcilla', 'Dura', 'Césped', 'Cualquiera'],
      default: 'Cualquiera'
    },
    gameType: {
      type: String,
      enum: ['Individual', 'Dobles', 'Cualquiera'],
      default: 'Individual'
    },
    duration: {
      type: String,
      enum: ['1 hora', '1.5 horas', '2 horas', '2+ horas'],
      default: '1.5 horas'
    }
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    },
    venueName: String
  },
  communication: {
    allowChat: {
      type: Boolean,
      default: true
    },
    allowWhatsApp: {
      type: Boolean,
      default: false
    },
    whatsappNumber: {
      type: String,
      default: null
    }
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'completed', 'expired'],
    default: 'active'
  },
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }
  },
  responses: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserTennis'
    },
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  views: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

postSchema.index({ 'location.coordinates': '2dsphere' });
postSchema.index({ status: 1, createdAt: -1 });
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Post || mongoose.model('Post', postSchema);

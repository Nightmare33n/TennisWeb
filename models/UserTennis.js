import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId;
    },
    minlength: 6
  },
  googleId: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  profileImage: {
    type: String,
    default: null
  },
  location: {
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    coordinates: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null }
    }
  },
  tennisInfo: {
    level: {
      type: String,
      enum: ['Principiante', 'Intermedio', 'Avanzado', 'Profesional'],
      default: 'Principiante'
    },
    playStyle: {
      type: String,
      enum: ['Ofensivo', 'Defensivo', 'Variado'],
      default: 'Variado'
    },
    experience: {
      type: String,
      enum: ['Menos de 1 año', '1-3 años', '3-5 años', 'Más de 5 años'],
      default: 'Menos de 1 año'
    },
    availability: [{
      day: {
        type: String,
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
      },
      timeSlots: [{
        start: String,
        end: String
      }]
    }],
    preferredCourts: [String]
  },
  preferences: {
    maxDistance: { type: Number, default: 10 }, // km
    preferredLevels: [{
      type: String,
      enum: ['Principiante', 'Intermedio', 'Avanzado', 'Profesional']
    }],
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    }
  },
  stats: {
    matchesPlayed: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  onboardingCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for location-based queries
userSchema.index({ 'location.coordinates': '2dsphere' });

export default mongoose.models.UserTennis || mongoose.model('UserTennis', userSchema);

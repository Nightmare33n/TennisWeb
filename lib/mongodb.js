import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Validate MongoDB URI format
if (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://')) {
  throw new Error('Invalid MongoDB URI format. Must start with mongodb:// or mongodb+srv://');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Retry function for connection attempts
async function connectWithRetry(retries = 3, delay = 2000) {
  const opts = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 15000, // 15 seconds timeout
    socketTimeoutMS: 45000, // 45 seconds socket timeout
    connectTimeoutMS: 30000, // 30 seconds connection timeout
    maxPoolSize: 10, // Maintain up to 10 socket connections
    minPoolSize: 1, // Minimum pool size
    retryWrites: true, // Enable retryable writes
    retryReads: true, // Enable retryable reads
    w: 'majority', // Write concern
    heartbeatFrequencyMS: 5000, // Send a ping every 5 seconds
    family: 4, // Use IPv4, skip trying IPv6
  };

  for (let i = 0; i < retries; i++) {
    try {
      console.log(`MongoDB connection attempt ${i + 1}/${retries}`);
      const connection = await mongoose.connect(MONGODB_URI, opts);
      console.log('MongoDB connected successfully');
      return connection;
    } catch (error) {
      console.error(`Connection attempt ${i + 1} failed:`, error.message);

      if (i === retries - 1) {
        // Last attempt failed
        throw error;
      }

      // Wait before retry
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 1.5; // Exponential backoff
    }
  }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connectWithRetry()
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection failed after all retries:', error);
        // Reset promise so it can retry next time
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;

    // Provide more specific error messages
    if (e.name === 'MongooseServerSelectionError') {
      console.error('MongoDB Atlas connection failed. Please check:');
      console.error('1. Your cluster is running and accessible');
      console.error('2. Your credentials are correct');
      console.error('3. Your network/firewall allows connections to MongoDB Atlas');
      console.error('4. The cluster is not paused or suspended');

      const customError = new Error('No se pudo conectar a MongoDB Atlas después de varios intentos. Verifica el estado del cluster.');
      customError.name = 'DatabaseConnectionError';
      customError.originalError = e;
      throw customError;
    }

    throw e;
  }

  return cached.conn;
}

export default connectDB;
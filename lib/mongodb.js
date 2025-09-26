import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 5, // Maintain a minimum of 5 socket connections
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
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
      console.error('1. Your IP is whitelisted in MongoDB Atlas');
      console.error('2. Your credentials are correct');
      console.error('3. Your network allows connections to MongoDB Atlas');

      const customError = new Error('No se pudo conectar a MongoDB Atlas. Verifica que tu IP esté en la lista blanca.');
      customError.name = 'DatabaseConnectionError';
      customError.originalError = e;
      throw customError;
    }

    throw e;
  }

  return cached.conn;
}

export default connectDB;
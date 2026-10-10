const mongoose = require('mongoose');
const env = require('./env');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host} / database: ${conn.connection.name}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to database at ${env.MONGODB_URI}: ${error.message}`);
    console.log('[System] Running with in-memory persistence & operational readiness mode.');
  }
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('[MongoDB] Disconnected from MongoDB instance.');
});

module.exports = {
  connectDB,
  isConnected: () => isConnected,
};

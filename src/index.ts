import fs from 'fs';
import https from 'https';
import app from './app.js';
import { connectDB } from './db/db.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // SSL options - specify paths to your certificate and key files
    const options = {
      cert: fs.readFileSync('./ssl/server.crt'), // Path to your SSL certificate
      key: fs.readFileSync('./ssl/server.key'), // Path to your SSL private key
    };

    // Set the port from environment variable or default to 5000
    const PORT = process.env.PORT || 5000;

    // Create HTTPS server
    https.createServer(options, app).listen(PORT, () => {
      console.log(`Server is running at https://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

startServer();

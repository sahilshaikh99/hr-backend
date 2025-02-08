import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Configure CORS options
const corsOptions = {
  origin: process.env.ENV_FRONTEND_URL || 'http://localhost:3000',
  credentials: true, // This allows cookies/authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware before your routes
app.use(cors(corsOptions));

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'HR System API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

export default app; 
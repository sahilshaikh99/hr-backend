import { Router } from 'express';
import { handleSignIn } from '../controllers/authController.js';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { UserRole } from '../utils/types.js';
import { IUserDocument } from '../models/User.js';

const router = Router();

router.post('/signin', handleSignIn);

// Temporary route to create admin - remove in production
router.post('/create-admin', async (req, res) => {
  try {
    await User.deleteOne({ email: 'admin@example.com' });

    const admin = new User({
      email: 'admin@example.com',
      password: 'admin123', // Will be hashed by pre-save middleware
      role: UserRole.ADMIN
    });

    const savedAdmin = await admin.save();
    console.log('Admin created with hash:', (savedAdmin as IUserDocument).password);

    res.json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Admin creation error:', error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

export default router; 
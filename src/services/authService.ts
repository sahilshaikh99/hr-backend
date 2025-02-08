import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/types.js';
import { IUserDocument } from '../models/User.js';

export async function signIn(email: string, password: string): Promise<ApiResponse<{ token: string, user: { name: string, email: string, role: string } }>> {
  try {
    const user = await User.findOne({ email });
    
    if (!user || !await user.comparePassword(password)) {
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '24h'
    });

    return {
      success: true,
      data: { 
        token,
        user: {
          name: (user as IUserDocument).name,
          email: (user as IUserDocument).email,
          role: (user as IUserDocument).role.toUpperCase()
        }
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Authentication failed'
    };
  }
} 
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

interface AuthRequest extends Request {
  user?: any;
}

export async function auth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Please authenticate'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findOne({ _id: (decoded as any)._id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Please authenticate'
    });
  }
} 
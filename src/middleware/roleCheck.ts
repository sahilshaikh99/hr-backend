import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../utils/types.js';

interface AuthRequest extends Request {
  user?: any;
}

export function checkRole(roles: UserRole[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }
    next();
  };
} 
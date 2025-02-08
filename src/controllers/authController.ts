import { Request, Response } from 'express';
import { signIn } from '../services/authService.js';

export async function handleSignIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await signIn(email, password);
  
  if (!result.success) {
    return res.status(401).json(result);
  }

  res.json(result);
} 
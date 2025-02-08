import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/types.js';

const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'IT',
  'Customer Support'
];

export const validateEmployee = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, position, department, salary } = req.body;
  const errors: string[] = [];

  // Name validation
  if (!name?.trim()) {
    errors.push('Name is required');
  } else if (name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (name.length > 50) {
    errors.push('Name must be less than 50 characters');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push('Email is required');
  } else if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }

  // Position validation
  if (!position?.trim()) {
    errors.push('Position is required');
  } else if (position.length < 2) {
    errors.push('Position must be at least 2 characters long');
  }

  // Department validation
  if (!department) {
    errors.push('Department is required');
  } else if (!DEPARTMENTS.includes(department)) {
    errors.push('Invalid department selected');
  }

  // Salary validation
  if (!salary && salary !== 0) {
    errors.push('Salary is required');
  } else if (salary <= 0) {
    errors.push('Salary must be greater than 0');
  } else if (salary > 1000000) {
    errors.push('Salary cannot exceed 1,000,000');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join(', ')
    } as ApiResponse<null>);
  }

  next();
}; 
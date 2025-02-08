import mongoose, { Schema, Document } from 'mongoose';
import { IEmployee } from '../utils/types.js';

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

const employeeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name must be less than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
    minlength: [2, 'Position must be at least 2 characters long']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: {
      values: DEPARTMENTS,
      message: 'Invalid department selected'
    }
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0.01, 'Salary must be greater than 0'],
    max: [1000000, 'Salary cannot exceed 1,000,000']
  },
  imageUrl: {
    type: String,
    trim: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export const Employee = mongoose.model<IEmployee & Document>('Employee', employeeSchema); 
import mongoose, { Schema, Document } from 'mongoose';
import { IUser, UserRole } from '../utils/types.js';
import bcrypt from 'bcryptjs';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  role: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.EMPLOYEE
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  // Only hash if password is being modified and it's not already hashed
  if (this.isModified('password') && !this.password.startsWith('$2a$')) {
    console.log('Hashing password in pre-save');
    this.password = await bcrypt.hash(this.password, 10);
  } else {
    console.log('Password already hashed or not modified');
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  console.log('Comparing passwords:');
  console.log('Candidate password:', candidatePassword);
  console.log('Stored hash:', this.password);
  const result = await bcrypt.compare(candidatePassword, this.password);
  console.log('Compare result:', result);
  return result;
};

export const User = mongoose.model<IUserDocument>('User', userSchema); 
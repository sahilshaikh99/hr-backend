import mongoose from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee'
}

export interface IUser {
  email: string;
  password: string;
  role: UserRole;
  employeeId?: string;
}

export interface IEmployee {
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  userId?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 
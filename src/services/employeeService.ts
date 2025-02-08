import { Employee } from '../models/Employee.js';
import { User } from '../models/User.js';
import { ApiResponse, IEmployee, UserRole } from '../utils/types.js';
import mongoose from 'mongoose';

export async function createEmployee(employeeData: IEmployee): Promise<ApiResponse<IEmployee>> {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log('Creating employee with data:', employeeData);
    
    const employee = new Employee(employeeData);
    await employee.save({ session });

    const user = new User({
      email: employeeData.email,
      password: Math.random().toString(36).slice(-8),
      role: UserRole.EMPLOYEE,
      employeeId: employee._id
    });
    
    console.log('Creating user for employee:', user);
    await user.save({ session });

    employee.userId = user._id;
    await employee.save({ session });

    await session.commitTransaction();
    
    return {
      success: true,
      data: employee.toObject()
    };
  } catch (error) {
    console.error('Employee creation error:', error);
    await session.abortTransaction();
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create employee'
    };
  } finally {
    session.endSession();
  }
}

export async function updateEmployee(id: string, updates: Partial<IEmployee>): Promise<ApiResponse<IEmployee>> {
  try {
    const employee = await Employee.findById(id);
    
    if (!employee) {
      return {
        success: false,
        error: 'Employee not found'
      };
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    return {
      success: true,
      data: updatedEmployee!.toObject()
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update employee'
    };
  }
}

export async function deleteEmployee(id: string): Promise<ApiResponse<null>> {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const employee = await Employee.findById(id);
    
    if (!employee) {
      return {
        success: false,
        error: 'Employee not found'
      };
    }

    await Employee.findByIdAndDelete(id, { session });
    if (employee.userId) {
      await User.findByIdAndDelete(employee.userId, { session });
    }

    await session.commitTransaction();
    
    return {
      success: true,
      message: 'Employee deleted successfully'
    };
  } catch (error) {
    await session.abortTransaction();
    return {
      success: false,
      error: 'Failed to delete employee'
    };
  } finally {
    session.endSession();
  }
}

export async function getEmployeeById(id: string): Promise<ApiResponse<IEmployee>> {
  try {
    const employee = await Employee.findById(id);
    
    if (!employee) {
      return {
        success: false,
        error: 'Employee not found'
      };
    }

    return {
      success: true,
      data: employee.toObject()
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch employee'
    };
  }
} 
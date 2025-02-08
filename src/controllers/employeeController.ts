import { Request, Response } from 'express';
import { createEmployee, updateEmployee, deleteEmployee, getEmployeeById } from '../services/employeeService.js';
import { Employee } from '../models/Employee.js';

export async function handleCreateEmployee(req: Request, res: Response) {
  try {
    // Log the request body to debug
    console.log('Create Employee Request:', req.body);
    
    const result = await createEmployee(req.body);
    
    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error('Create Employee Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create employee'
    });
  }
}

export async function handleUpdateEmployee(req: Request, res: Response) {
  const result = await updateEmployee(req.params.id, req.body);
  
  if (!result.success) {
    return res.status(404).json(result);
  }

  res.json(result);
}

export async function handleDeleteEmployee(req: Request, res: Response) {
  const result = await deleteEmployee(req.params.id);
  
  if (!result.success) {
    return res.status(404).json(result);
  }

  res.json(result);
}

export async function handleGetEmployeeById(req: Request, res: Response) {
  const result = await getEmployeeById(req.params.id);
  
  if (!result.success) {
    return res.status(404).json(result);
  }

  res.json(result);
}

export async function handleGetAllEmployees(req: Request, res: Response) {
  const employees = await Employee.find({})
    .select('-password')  // Exclude password field
    .sort({ createdAt: -1 }); // Sort by newest first
    
  res.status(200).json({
    success: true,
    data: employees,
    count: employees.length
  });
} 
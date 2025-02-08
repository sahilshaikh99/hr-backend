import { Router } from 'express';
import { handleCreateEmployee, handleUpdateEmployee, handleDeleteEmployee, handleGetEmployeeById, handleGetAllEmployees } from '../controllers/employeeController.js';
import { auth } from '../middleware/auth.js';
import { checkRole } from '../middleware/roleCheck.js';
import { UserRole } from '../utils/types.js';
import { validateEmployee } from '../middleware/validateEmployee.js';

const router = Router();

// Admin routes
router.post(
  '/',
  auth,
  checkRole([UserRole.ADMIN]),
  validateEmployee,
  handleCreateEmployee
);

router.put(
  '/:id',
  auth,
  checkRole([UserRole.ADMIN]),
  validateEmployee,
  handleUpdateEmployee
);

router.delete(
  '/:id',
  auth,
  checkRole([UserRole.ADMIN]),
  handleDeleteEmployee
);

// Admin route to get all employees
router.get(
  '/',
  auth,
  checkRole([UserRole.ADMIN]),
  handleGetAllEmployees
);

// Both Admin and Employee can view employee details
router.get(
  '/:id',
  auth,
  checkRole([UserRole.ADMIN, UserRole.EMPLOYEE]),
  handleGetEmployeeById
);

export default router; 
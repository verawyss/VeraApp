import { Router } from 'express';
import { getAllUsers, toggleUserStatus } from '../controllers/usersController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getAllUsers);
router.patch('/:userId/status', authenticate, requireAdmin, toggleUserStatus);

export default router;

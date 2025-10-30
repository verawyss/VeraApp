import { Router } from 'express';
import {
  createOrUpdateAttendance,
  deleteAttendance,
} from '../controllers/attendanceController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/:eventId', authenticate, createOrUpdateAttendance);
router.delete('/:eventId', authenticate, deleteAttendance);

export default router;

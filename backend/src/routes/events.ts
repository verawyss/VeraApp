import { Router } from 'express';
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventEquipment,
} from '../controllers/eventsController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getAllEvents);
router.post('/', authenticate, requireAdmin, createEvent);
router.patch('/:eventId', authenticate, requireAdmin, updateEvent);
router.delete('/:eventId', authenticate, requireAdmin, deleteEvent);
router.get('/:eventId/equipment', authenticate, getEventEquipment);

export default router;

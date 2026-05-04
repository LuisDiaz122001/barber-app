import { Router } from 'express';
import { availabilityController } from '../controllers/availability.controller.js';

const router = Router();

// GET /barbers/:id/availability?date=YYYY-MM-DD
router.get('/barbers/:id/availability', availabilityController);

export default router;
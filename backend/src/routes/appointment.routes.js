import express from 'express';
import {
    createAppointment
} from '../appointment/appointment.service.js';
import {
    authMiddleware
} from '../middleware/auth.middleware.js';

const router = express.Router();

// CLIENTES crean citas
router.post('/', authMiddleware, async (req, res) => {
    try {
        const appointment = await createAppointment(
            req.user.userId,
            req.body
        );
        res.json(appointment);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

export default router;
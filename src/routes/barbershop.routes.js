import express from 'express';
import {
    createBarbershop
} from '../barbershop/barbershop.service.js';
import {
    authMiddleware
} from '../middleware/auth.middleware.js';
import {
    roleMiddleware
} from '../middleware/role.middleware.js';

const router = express.Router();

// SOLO ADMIN puede crear barbería
router.post(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN', 'SUPER_ADMIN']),
    async (req, res) => {
        try {
            const barbershop = await createBarbershop(req.user.userId, req.body);
            res.json(barbershop);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
);

export default router;
import express from 'express';
import {
    createService
} from '../services/service.service.js';
import {
    authMiddleware
} from '../middleware/auth.middleware.js';
import {
    roleMiddleware
} from '../middleware/role.middleware.js';

const router = express.Router();

// SOLO ADMIN
router.post(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN', 'SUPER_ADMIN']),
    async (req, res) => {
        try {
            const service = await createService(req.user.userId, req.body);
            res.json(service);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
);

export default router;
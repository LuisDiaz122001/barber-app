import express from 'express';
import {
    registerUser,
    loginUser
} from '../auth/auth.service.js';
import {
    authMiddleware
} from '../middleware/auth.middleware.js';

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const result = await loginUser(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// 👇 ESTA ES LA QUE TE FALTA
router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        message: 'Perfil protegido',
        user: req.user,
    });
});

export default router;
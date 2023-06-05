import { Router } from 'express';
import AuthController from '../controllers/auth_controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

/* GET home page. */
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', authMiddleware, AuthController.logout);

export default router;

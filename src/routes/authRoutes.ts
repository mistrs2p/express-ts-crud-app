import { Router } from 'express';
import { login, registerUser } from '../controllers/authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);

export default router;
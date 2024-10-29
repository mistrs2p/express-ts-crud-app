import { Router } from 'express';
import { getUsers, deleteUser } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';

const router = Router();

router.get('/', authMiddleware, roleMiddleware('admin'), getUsers);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteUser);

export default router;
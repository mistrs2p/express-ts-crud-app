import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import { deleteUser } from '@/controllers/User/Delete';
import { show } from '@/controllers/User/Show';
import { update } from '@/controllers/User/Update';


const router = Router();

router.get('/', authMiddleware, roleMiddleware('admin'), show);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteUser);
router.patch('/:id', authMiddleware, update);

export default router;
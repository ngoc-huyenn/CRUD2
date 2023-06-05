import { Router } from 'express';
import UsersController from '../controllers/users_controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

/* GET home page. */
router.get('/', authMiddleware, UsersController.index);
router.get('/:id', UsersController.show);
router.post('/', UsersController.create);
router.post('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);

export default router;

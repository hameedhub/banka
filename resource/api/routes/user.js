import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/auth/signup', userController.signUp);
router.post('/auth/login', userController.loginUser);
router.post('/auth/token', userController.sendToken);
router.patch('/auth/token/:email', userController.setPassword);
router.delete('/:id', userController.deleteUser);

export default router;

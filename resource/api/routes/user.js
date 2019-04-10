import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.post('/auth/signup', UserController.signUp);
router.post('/auth/signin', UserController.signIn);

export default router;

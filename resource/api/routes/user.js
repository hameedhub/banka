import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.post('/auth/signup', UserController.signUp);

export default router;

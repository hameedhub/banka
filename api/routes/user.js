import { Router } from 'express';
import UserController from '../controllers/userController';
import Auth from '../helper/checkAuth';

const router = Router();

router.post('/auth/signup', UserController.signUp);
router.post('/auth/signin', UserController.signIn);
router.get('/user/:email/accounts', Auth.checkToken, UserController.getAccounts);

export default router;

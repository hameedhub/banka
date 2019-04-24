import { Router } from 'express';
import UserController from '../controllers/userController';
import Auth from '../helper/checkAuth';
import validate from '../middleware/validation';

const router = Router();

router.post('/auth/signup', validate.signupData, UserController.signUp);
router.post('/auth/signin', validate.signinData, UserController.signIn);
router.get('/user/:email/accounts', Auth.checkToken, UserController.getAccounts);

export default router;

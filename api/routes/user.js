import { Router } from 'express';
import UserController from '../controllers/userController';
import Authentication from '../helper/checkAuth';
import validate from '../middleware/validation';

const router = Router();

router.post('/auth/signup', validate.signup, UserController.signUp);
router.post('/auth/signupadmin', Authentication.checkToken, validate.signupAdmin, UserController.signUpAdmin);
router.post('/auth/signin', validate.signin, UserController.signIn);
router.get('/user/:email/accounts', validate.getAccountParams, Authentication.checkToken, UserController.getAccounts);
export default router;

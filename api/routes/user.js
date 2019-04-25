import { Router } from 'express';
import UserController from '../controllers/userController';
import Authentication from '../helper/checkAuth';
import validate from '../middleware/validation';

const router = Router();

router.post('/auth/signup', validate.signupData, UserController.signUp);
router.post('/auth/signupadmin', Authentication.checkToken, validate.signupData, UserController.signUpAdmin);
router.post('/auth/signin', validate.signinData, UserController.signIn);
router.get('/user/:email/accounts', Authentication.checkToken, UserController.getAccounts);
export default router;

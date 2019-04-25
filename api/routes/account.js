import { Router } from 'express';
import Authentication from '../helper/checkAuth';
import Controller from '../controllers/accountController';
import validate from '../middleware/validation';


const router = Router();

router.post('/accounts', validate.accountData, Authentication.checkToken, Controller.createAccount);
router.patch('/accounts/:accountNumber', Authentication.checkToken, Controller.accountStatus);
router.delete('/accounts/:accountNumber', Authentication.checkToken, Controller.deleteAccount);
router.get('/accounts/:accountNumber/transactions', Authentication.checkToken, Controller.getTransaction);
router.get('/accounts/:accountNumber', Authentication.checkToken, Controller.getDetails);
router.get('/accounts/', Authentication.checkToken, Controller.getAllAccount);

export default router;
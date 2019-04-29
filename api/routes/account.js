import { Router } from 'express';
import Authentication from '../helper/checkAuth';
import Controller from '../controllers/accountController';
import validate from '../middleware/validation';


const router = Router();

router.post('/accounts', Authentication.checkToken, validate.accountData, Controller.createAccount);
router.patch('/accounts/:accountNumber', Authentication.checkToken, validate.accountNumber, validate.accountStatus, Controller.accountStatus);
router.delete('/accounts/:accountNumber', Authentication.checkToken, validate.accountNumber, Controller.deleteAccount);
router.get('/accounts/:accountNumber/transactions', Authentication.checkToken, validate.accountNumber, Controller.getTransaction);
router.get('/accounts/:accountNumber', Authentication.checkToken, validate.accountNumber, Controller.getDetails);
router.get('/accounts/', Authentication.checkToken, Controller.getAllAccount);

export default router;
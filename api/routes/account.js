import { Router } from 'express';
import Auth from '../helper/checkAuth';
import Controller from '../controllers/accountController';
import validate from '../middleware/validation';


const router = Router();

router.post('/accounts', validate.accountData, Auth.checkToken, Controller.createAccount);
router.patch('/accounts/:accountNumber', Auth.checkToken, Controller.accountStatus);
router.delete('/accounts/:accountNumber', Auth.checkToken, Controller.deleteAccount);
router.get('/accounts/:accountNumber/transactions', Auth.checkToken, Controller.getTrans);
router.get('/accounts/:accountNumber', Auth.checkToken, Controller.getDetails);
router.get('/accounts/', Auth.checkToken, Controller.getAll);

export default router;
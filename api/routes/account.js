import { Router } from 'express';
import Auth from '../helper/checkAuth';
import Controller from '../controllers/accountController';

const router = Router();

router.post('/', Auth.checkToken, Controller.createAccount);
router.patch('/:accountNumber', Auth.checkToken, Controller.accountStatus);
router.delete('/:accountNumber', Auth.checkToken, Controller.deleteAccount);
router.get('/:accountNumber/transactions', Controller.getTrans);
router.get('/:accountNumber', Auth.checkToken, Controller.getDetails);


export default router;
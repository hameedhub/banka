import { Router } from 'express';
import Auth from '../helper/checkAuth';
import Controller from '../controllers/transController';

const router = Router();

router.post('/:accountNumber/debit', Auth.checkToken, Controller.debitTrans);
router.post('/:accountNumber/credit', Auth.checkToken, Controller.creditTrans);
router.get('/:id', Auth.checkToken, Controller.getTransById);

export default router;
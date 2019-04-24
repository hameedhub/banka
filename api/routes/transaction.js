import { Router } from 'express';
import Auth from '../helper/checkAuth';
import Controller from '../controllers/transController';
import validate from '../middleware/validation';

const router = Router();

router.post('/:accountNumber/debit', validate.transData, Auth.checkToken, Controller.debitTrans);
router.post('/:accountNumber/credit', validate.transData, Auth.checkToken, Controller.creditTrans);
router.get('/:id', Auth.checkToken, Controller.getTransById);

export default router;
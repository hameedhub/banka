import { Router } from 'express';
import Authentication from '../helper/checkAuth';
import Controller from '../controllers/transController';
import validate from '../middleware/validation';

const router = Router();

router.post('/:accountNumber/debit', validate.transactionData, Authentication.checkToken, Controller.debitTransaction);
router.post('/:accountNumber/credit', validate.transactionData, Authentication.checkToken, Controller.creditTransaction);
router.get('/:id', Authentication.checkToken, Controller.getTransactionById);

export default router;
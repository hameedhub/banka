import { Router } from 'express';
import Authentication from '../helper/checkAuth';
import Controller from '../controllers/transactionController';
import validate from '../middleware/validation';

const router = Router();

router.post('/:accountNumber/debit', validate.accountNumber, validate.transactionData, Authentication.checkToken, Controller.debitTransaction);
router.post('/:accountNumber/credit', validate.accountNumber, validate.transactionData, Authentication.checkToken, Controller.creditTransaction);
router.get('/:id', validate.getTransactionById, Authentication.checkToken, Controller.getTransactionById);

export default router;
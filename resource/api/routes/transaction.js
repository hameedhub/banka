import { Router } from 'express';
import Controller from '../controllers/transController';

const router = Router();

router.post('/:accountNumber/debit', Controller.debitTrans);
router.post('/:accountNumber/credit', Controller.creditTrans);

export default router;
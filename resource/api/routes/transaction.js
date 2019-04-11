import { Router } from 'express';
import Controller from '../controllers/transController';

const router = Router();

router.post('/:accountNumber/debit', Controller.debitTrans);

export default router;
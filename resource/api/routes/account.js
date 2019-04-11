import { Router } from 'express';
import Controller from '../controllers/accountController';

const router = Router();

router.post('/', Controller.createAccount);

export default router;
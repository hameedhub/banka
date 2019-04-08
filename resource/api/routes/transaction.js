const express = require('express');

const router = express.Router();

const Transaction = require ("../controllers/Transaction");

// GET TRANSACTION
router.get('/', Transaction.getTrans);

// GET SPECIFIC TRANSACTION
router.get('/:id', Transaction.getTransById);

// GET TRANSACTION BY ACCOUNT
router.get('/account/:accountNumber', Transaction.getTransByAccount);

// POST TRANSACTION
router.post('/', Transaction.postTrans);

// DELETE TRANSACTION
router.delete('/:id', Transaction.deleteTrans);

module.exports = router;
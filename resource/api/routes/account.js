const express = require('express');

const router = express.Router();

const Accounts = require ('../controllers/Accounts');

// GET ACCOUNTS
router.get('/', Accounts.getAccounts);

// GET SPECIFIC ACCOUNT
router.get('/:id', Accounts.getAccountById);

// POST ACCOUNT
router.post('/', Accounts.postAccount);

// PATCH ACCOUNT
router.patch('/:id', Accounts.patchAccount);

// DELETE ACOUNT
router.delete('/:id', Accounts.deleteAccount)

module.exports = router;

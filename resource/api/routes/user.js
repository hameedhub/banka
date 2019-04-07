const express = require('express');

const router = express.Router();

const Users = require ("../controllers/Users");

// GET USERS
router.get('/', Users.getUsers);

// GET SPECIFIC USER
router.get('/:id', Users.getUserById);

// POST USER
router.post('/', Users.postUser);

// LOGIN USER
router.post('/login', Users.loginUser);

// PUT USER
router.put('/:id', Users.putUser);

// DELETE USER
router.delete('/:id', Users.deleteUser)

module.exports = router;

const express = require('express');
const { createUser, getAllUsers, updateUser, deleteUser } = require('../controllers/user.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticateToken, authorizeRole(['ADMIN']));

router.post('/', createUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

const express = require('express');
const { createUser } = require('../controllers/user.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authenticateToken, authorizeRole(['ADMIN']), createUser);

module.exports = router;

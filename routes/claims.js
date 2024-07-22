const express = require('express');
const { createClaim, getClaims } = require('../controllers/claimController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createClaim);
router.get('/', authMiddleware, getClaims);

module.exports = router;

const express = require('express');
const { createClaim, getClaims, adminGetAllClaims, updateClaim, deleteClaim } = require('../controllers/claimController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createClaim);
router.get('/', authMiddleware, getClaims);
router.get('/admin', authMiddleware, authMiddleware.isAdmin, adminGetAllClaims); // Middleware admin ditambahkan
router.put('/admin', authMiddleware, authMiddleware.isAdmin, updateClaim); // Middleware admin ditambahkan
router.delete('/admin', authMiddleware, authMiddleware.isAdmin, deleteClaim); // Middleware admin ditambahkan

module.exports = router;

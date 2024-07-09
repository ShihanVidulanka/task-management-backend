// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

module.exports = router;

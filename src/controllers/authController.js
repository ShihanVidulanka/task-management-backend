// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signUp({ email, password });
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signIn({ email, password });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};

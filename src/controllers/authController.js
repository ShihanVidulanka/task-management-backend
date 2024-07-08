const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("email, password : ", email, password);
    const user = await User.create({ email, password: hashedPassword });
    console.log("response : ",res);
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOneByEmail({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};

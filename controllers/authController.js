const bcrypt = require('bcryptjs');


const jwt = require('jsonwebtoken');


const User = require('../models/User');

exports.register = async (req, res) => {

  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });

    if (existing) return res.status(400).json({ message: 'Email exists' });



    const hashed = await bcrypt.hash(password, 10);


    const user = await User.create({ name, email, password: hashed, role });

    res.status(201).json({ message: 'User registered', user });

  } catch (err) {
    res.status(500).json({ message: 'Register failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
       if (!user) return res.status(400).json({ message: 'Invalid Email...' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Wrong password....' });

    const token = jwt.sign({ id: user._id }, 'jwt_secret', { expiresIn: '2d' });

    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {

    res.status(500).json({ message: 'failed login.,', error: error.message });


  }
};

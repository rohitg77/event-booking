const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthenticated = async (req, res, next) => {

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, 'jwt_secret');

    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch {

    res.status(401).json({ message: 'Invalid token' });

  }
};

exports.isAdmin = (req, res, next) => {

  if (req.user.role === 'admin') next();

  else res.status(403).json({ message: 'Admins only' });


  
};

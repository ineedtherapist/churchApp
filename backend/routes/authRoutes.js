const express = require('express');
const { check, validationResult } = require('express-validator');
const { Login, Passwd, User } = require('../models/User');
const { generateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('username', 'Username must be at least 3 characters').isLength({ min: 3 }),
    check('password', 'Password is required').not().isEmpty()
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Check if user already exists in login collection
      let existingLogin = await Login.findOne({ name: username });

      if (existingLogin) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user in login collection
      const newLogin = await Login.create({
        name: username
      });

      // Create new password in passwd collection with reference to the user
      const newPasswd = await Passwd.create({
        passwd: password,
        userId: newLogin._id,
        isActive: true
      });

      // Return JWT token
      res.status(201).json({
        _id: newLogin._id,
        username: newLogin.name,
        role: 'user',
        token: generateToken(newLogin._id)
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Find user by username in login collection
      const loginUser = await Login.findOne({ name: username });

      if (!loginUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Find password in passwd collection that either:
      // 1. Belongs to this user (userId matches) and is active, or
      // 2. Has no userId (for backward compatibility) and matches the password
      const passwdDoc = await Passwd.findOne({
        $and: [
          { passwd: password },
          { 
            $or: [
              { userId: loginUser._id, isActive: true },
              { userId: { $exists: false } },
              { userId: null }
            ]
          }
        ]
      });

      if (!passwdDoc) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Determine role (admin or user)
      const role = username === 'admin' ? 'admin' : 'user';

      // Return JWT token
      res.json({
        _id: loginUser._id,
        username: loginUser.name,
        role: role,
        token: generateToken(loginUser._id)
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Create admin user on server start
router.get('/init-admin', async (req, res) => {
  try {
    // Check if admin exists in login collection
    const adminLogin = await Login.findOne({ name: 'admin' });

    if (!adminLogin) {
      // Create admin in login collection
      const newAdmin = await Login.create({ name: 'admin' });
      // Create admin in passwd collection with reference to the admin user
      await Passwd.create({ 
        passwd: 'admin',
        userId: newAdmin._id,
        isActive: true
      });
      console.log('Admin user created');
    }

    res.json({ message: 'Admin user initialized' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const { check, validationResult } = require('express-validator');
const { Login, Passwd, User } = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    // Get all users from login collection
    const logins = await Login.find({});

    // Map logins to user objects
    const users = logins.map(login => {
      return {
        _id: login._id,
        username: login.name,
        role: login.name === 'admin' ? 'admin' : 'user'
      };
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile/me', protect, async (req, res) => {
  try {
    // Get user from login collection
    const login = await Login.findById(req.user._id);

    if (!login) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create user object
    const user = {
      _id: login._id,
      username: login.name,
      role: login.name === 'admin' ? 'admin' : 'user'
    };

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private/Admin
router.get('/:id', protect, admin, async (req, res) => {
  try {
    // Get user from login collection
    const login = await Login.findById(req.params.id);

    if (!login) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create user object
    const user = {
      _id: login._id,
      username: login.name,
      role: login.name === 'admin' ? 'admin' : 'user'
    };

    res.json(user);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users
// @desc    Create a new user (admin only)
// @access  Private/Admin
router.post(
  '/',
  [
    protect,
    admin,
    check('username', 'Username is required').not().isEmpty(),
    check('username', 'Username must be at least 3 characters').isLength({ min: 3 }),
    check('password', 'Password is required').not().isEmpty(),
    check('role', 'Role must be either user or admin').isIn(['user', 'admin'])
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;

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

      res.status(201).json({
        _id: newLogin._id,
        username: newLogin.name,
        role: role || 'user'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/users/:id
// @desc    Update a user
// @access  Private/Admin
router.put(
  '/:id',
  [
    protect,
    admin,
    check('username', 'Username must be at least 3 characters if provided').optional().isLength({ min: 3 }),
    check('password', 'Password is required if provided').optional(),
    check('role', 'Role must be either user or admin if provided').optional().isIn(['user', 'admin'])
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Find user in login collection
      let login = await Login.findById(req.params.id);

      if (!login) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if username is being changed and if it already exists
      if (req.body.username && req.body.username !== login.name) {
        const existingLogin = await Login.findOne({ name: req.body.username });
        if (existingLogin) {
          return res.status(400).json({ message: 'Username already exists' });
        }
      }

      // Update user fields
      if (req.body.username) {
        login.name = req.body.username;
        await login.save();
      }

      // Update password if provided
      if (req.body.password) {
        // Find existing active passwords for this user and mark them as still active
        // (we don't deactivate old passwords to allow both old and new passwords to work)

        // Check if this exact password already exists for this user
        let existingUserPassword = await Passwd.findOne({ 
          passwd: req.body.password,
          userId: login._id
        });

        // If this exact password doesn't exist for this user, create it
        if (!existingUserPassword) {
          // Create a new password entry for this user
          await Passwd.create({ 
            passwd: req.body.password,
            userId: login._id,
            isActive: true
          });
        }
      }

      res.json({
        _id: login._id,
        username: login.name,
        role: login.name === 'admin' ? 'admin' : (req.body.role || 'user')
      });
    } catch (error) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    // Find user in login collection
    const login = await Login.findById(req.params.id);

    if (!login) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent deleting the admin user
    if (login.name === 'admin') {
      return res.status(400).json({ message: 'Cannot delete admin user' });
    }

    // Delete user from login collection
    await Login.findByIdAndDelete(req.params.id);

    // Find and remove all passwords associated with this user
    await Passwd.deleteMany({ userId: req.params.id });

    res.json({ message: 'User removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

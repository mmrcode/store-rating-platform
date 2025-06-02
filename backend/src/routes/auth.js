const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { auth } = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');
const { Op } = require('sequelize');

const router = express.Router();

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Register new user
router.post('/register',
  [
    body('name').isLength({ min: 20, max: 60 }),
    body('email').isEmail(),
    body('password')
      .isLength({ min: 8, max: 16 })
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/),
    body('address').isLength({ min: 1, max: 400 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, address } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const user = await User.create({
        name,
        email,
        password,
        address,
        role: 'user' // Default role
      });

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  }
);

// Login user
router.post('/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await user.checkPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }
);

// Update password
router.put('/update-password',
  auth,
  [
    body('currentPassword').notEmpty(),
    body('newPassword')
      .isLength({ min: 8, max: 16 })
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/)
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { currentPassword, newPassword } = req.body;
      const user = req.user;

      // Verify current password
      const isMatch = await user.checkPassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }

      // Update password
      user.password = newPassword;
      await user.save();

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating password', error: error.message });
    }
  }
);

// Request password reset
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // Save reset token to user
    await user.update({
      resetToken,
      resetTokenExpiry,
    });

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="${resetUrl}">link</a> to set a new password.</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    logger.info(`Password reset email sent to ${email}`);
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    logger.error('Error in forgot password:', error);
    res.status(500).json({ message: 'Error processing password reset request' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and clear reset token
    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    logger.info(`Password reset successful for user ${user.email}`);
    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    logger.error('Error in reset password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
});

// Basic route for testing
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working' });
});

module.exports = router; 
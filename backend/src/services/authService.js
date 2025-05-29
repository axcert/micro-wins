const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const emailService = require('./emailService');
const redis = require('../config/redis');

const generateToken = (userId, expiresIn) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
};

exports.register = async (email, password, name) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(20).toString('hex');

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
    });

    await emailService.sendVerificationEmail(email, verificationToken);

  } catch (err) {
    console.error('Error registering user:', err);
    throw err;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    if (!user.isEmailVerified) {
      throw new Error('Email not verified');
    }

    const token = generateToken(user._id, '1h');
    const refreshToken = generateToken(user._id, '30d');

    await redis.set(refreshToken, user._id.toString(), 'EX', 30 * 24 * 60 * 60);

    return { token, refreshToken };
  } catch (err) {
    console.error('Error logging in:', err);
    throw err;
  }
};

exports.logout = async (refreshToken) => {
  try {
    await redis.del(refreshToken);
  } catch (err) {
    console.error('Error logging out:', err);
    throw err;
  }
};

exports.refreshTokens = async (refreshToken) => {
  try {
    const userId = await redis.get(refreshToken);
    if (!userId) {
      throw new Error('Invalid refresh token');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newToken = generateToken(user._id, '1h');
    const newRefreshToken = generateToken(user._id, '30d');

    await redis.set(newRefreshToken, user._id.toString(), 'EX', 30 * 24 * 60 * 60);
    await redis.del(refreshToken);

    return { token: newToken, refreshToken: newRefreshToken };
  } catch (err) {
    console.error('Error refreshing tokens:', err);
    throw err;
  }
};

exports.sendPasswordResetEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await emailService.sendPasswordResetEmail(email, resetToken);
  } catch (err) {
    console.error('Error sending password reset email:', err);
    throw err;
  }
};

exports.resetPassword = async (token, newPassword) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  } catch (err) {
    console.error('Error resetting password:', err);
    throw err;
  }
};

exports.verifyEmail = async (token) => {
  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      throw new Error('Invalid verification token');
    }

    user.isEmailVerified = true;
    user.verificationToken = undefined;
    await user.save();
  } catch (err) {
    console.error('Error verifying email:', err);
    throw err;
  }
};
import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/email';
import * as Sentry from '@sentry/node';
import rateLimiter from '../middleware/rateLimiter';

export const register = async (name: string, email: string, password: string) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await sendVerificationEmail(user.id, email);

  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    await rateLimiter(email);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    if (!user.emailVerified) {
      throw new Error('Email not verified');
    }

    const token = generateToken(user.id);

    return { user, token };
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};

export const logout = async (token: string) => {
  try {
    // TODO: Implement token blacklisting for logout
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  } 
};

export const refreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      throw new Error('Invalid token');
    }

    return generateToken(user.id);
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      throw new Error('User not found');
    }

    const token = generatePasswordResetToken(user.id);
    await sendPasswordResetEmail(email, token);

  } catch (error) {
    Sentry.captureException(error); 
    throw error;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      throw new Error('Invalid token');
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  } catch (error) {
    Sentry.captureException(error);
    throw error;  
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { emailVerified: true },  
    });
  } catch (error) {
    Sentry.captureException(error);
    throw new Error('Invalid token');
  }
};

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const generatePasswordResetToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });  
};

const sendVerificationEmail = async (userId: string, email: string) => {
  const token = generateToken(userId);
  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;
  
  await sendEmail({
    to: email,
    subject: 'Verify Your Email',
    text: `Please click the following link to verify your email: ${verificationLink}`,
  });
};

const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

  await sendEmail({
    to: email,
    subject: 'Password Reset Request',
    text: `Please click the following link to reset your password: ${resetLink}`,
  });
};
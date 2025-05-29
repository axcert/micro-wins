import { Request, Response } from 'express';
import * as authService from '../services/authService';
import * as Sentry from '@sentry/node';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    await authService.register(name, email, password);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {  
  try {
    const { email, password } = req.body;
    
    const { user, token } = await authService.login(email, password);
    
    res.json({ user, token });
  } catch (error) {
    Sentry.captureException(error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    
    await authService.logout(token);
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    Sentry.captureException(error);  
    res.status(500).json({ error: 'Failed to logout' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    
    const newToken = await authService.refreshToken(token);
    
    res.json({ token: newToken });
  } catch (error) {
    Sentry.captureException(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    await authService.forgotPassword(email);
    
    res.json({ message: 'Password reset email sent' }); 
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({ error: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    
    await authService.resetPassword(token, password);
    
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({ error: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    await authService.verifyEmail(token);

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    Sentry.captureException(error); 
    res.status(400).json({ error: error.message });
  }
};
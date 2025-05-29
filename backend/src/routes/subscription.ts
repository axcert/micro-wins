import express from 'express';
import { createSubscription, updatePaymentMethod, cancelSubscription, getSubscription, listInvoices, resumeSubscription } from '../controllers/subscriptionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', authMiddleware, createSubscription);
router.put('/payment-method', authMiddleware, updatePaymentMethod);
router.delete('/cancel', authMiddleware, cancelSubscription);
router.get('/status', authMiddleware, getSubscription); 
router.get('/invoices', authMiddleware, listInvoices);
router.post('/resume', authMiddleware, resumeSubscription);

export default router;
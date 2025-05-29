import express from 'express';
import { handleWebhook } from '../controllers/subscriptionController'; 

const router = express.Router();

router.post('/stripe', handleWebhook);

export default router;
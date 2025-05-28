const express = require('express');
const router = express.Router();
const stripe = require('../utils/stripe');

router.post('/create', async (req, res) => {
  try {
    const { customerId, paymentMethodId, priceId } = req.body;
    
    const subscription = await stripe.createSubscription(customerId, paymentMethodId, priceId);
    
    res.json(subscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/payment-method', async (req, res) => {
  try {
    const { subscriptionId, paymentMethodId } = req.body;
    
    const subscription = await stripe.updatePaymentMethod(subscriptionId, paymentMethodId);
    
    res.json(subscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/cancel', async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    
    const subscription = await stripe.cancelSubscription(subscriptionId);
    
    res.json(subscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/status', async (req, res) => {
  try {
    const { subscriptionId } = req.query;
    
    const subscription = await stripe.getSubscriptionStatus(subscriptionId);
    
    res.json(subscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/invoices', async (req, res) => {
  try {
    const { subscriptionId } = req.query;
    
    const invoices = await stripe.getInvoices(subscriptionId);
    
    res.json(invoices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }  
});

module.exports = router;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createSubscription(customerId, paymentMethodId, priceId) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{
      price: priceId,
    }],
    default_payment_method: paymentMethodId,
    expand: ['latest_invoice.payment_intent'],
  });
  
  return subscription;
}

async function updatePaymentMethod(subscriptionId, paymentMethodId) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    default_payment_method: paymentMethodId,
  });

  return subscription;
}

async function cancelSubscription(subscriptionId) {
  const deletedSubscription = await stripe.subscriptions.del(subscriptionId);

  return deletedSubscription;
}

async function getSubscriptionStatus(subscriptionId) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  return subscription.status;
}

async function getInvoices(subscriptionId) {
  const invoices = await stripe.invoices.list({
    subscription: subscriptionId,
  });

  return invoices.data;
}

module.exports = {
  createSubscription,
  updatePaymentMethod,
  cancelSubscription, 
  getSubscriptionStatus,
  getInvoices
};
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { prisma } from '../config/database';
import { logger } from '../utils/logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: 'latest',
});

export const createSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentMethodId, plan } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const stripeCustomer = await stripe.customers.create({
      payment_method: paymentMethodId,
      email: user.email,
      name: user.name,
    });

    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomer.id,
      items: [{ plan }],
      trial_period_days: 14,
    });

    await prisma.user.update({
      where: { id: req.userId },
      data: {
        stripeCustomerId: stripeCustomer.id,
        subscriptionId: subscription.id,
      },
    });

    res.status(201).json(subscription);
  } catch (error) {
    logger.error(`Failed to create subscription: ${error}`);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
};

export const updatePaymentMethod = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentMethodId } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    if (!user || !user.stripeCustomerId) {
      res.status(404).json({ error: 'User not found or missing Stripe customer' });
      return;
    }

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });

    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    res.sendStatus(200);
  } catch (error) {
    logger.error(`Failed to update payment method: ${error}`);
    res.status(500).json({ error: 'Failed to update payment method' });
  }
};

export const cancelSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    if (!user || !user.subscriptionId) {
      res.status(404).json({ error: 'User not found or not subscribed' });
      return;
    }
    
    await stripe.subscriptions.del(user.subscriptionId);

    await prisma.user.update({
      where: { id: req.userId },
      data: { subscriptionId: null },
    });

    res.sendStatus(200);
  } catch (error) {
    logger.error(`Failed to cancel subscription: ${error}`); 
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
};

export const getSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    if (!user || !user.subscriptionId) {
      res.sendStatus(404);
      return;
    }

    const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);
    res.json(subscription);
  } catch (error) {
    logger.error(`Failed to get subscription: ${error}`);
    res.status(500).json({ error: 'Failed to get subscription' });
  }  
};

export const listInvoices = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    if (!user || !user.stripeCustomerId) {
      res.status(404).json({ error: 'User not found or missing Stripe customer' });
      return;
    }

    const invoices = await stripe.invoices.list({
      customer: user.stripeCustomerId,
    });

    res.json(invoices.data);
  } catch (error) {
    logger.error(`Failed to list invoices: ${error}`);
    res.status(500).json({ error: 'Failed to list invoices' });
  }
};

export const resumeSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    if (!user || !user.subscriptionId) {
      res.status(404).json({ error: 'User not found or not subscribed' });
      return;
    }

    const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);
    
    if (subscription.status !== 'active') {
      const updatedSubscription = await stripe.subscriptions.update(user.subscriptionId, {
        cancel_at_period_end: false,
        items: subscription.items.data,
      });
      res.json(updatedSubscription);
    } else {
      res.json(subscription);
    }
  } catch (error) {
    logger.error(`Failed to resume subscription: ${error}`);
    res.status(500).json({ error: 'Failed to resume subscription' });
  }
};

export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
  let event;

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'] as string;
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    logger.error(`Webhook signature verification failed: ${error}`);
    res.sendStatus(400);
    return;
  }

  try {
    switch (event.type) {
      case 'invoice.payment_succeeded': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = await getUserIdFromStripeSubscription(subscription.id);
        await extendUserSubscription(userId);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = await getUserIdFromStripeSubscription(subscription.id);
        await cancelUserSubscription(userId);
        break;
      }
    }
    res.sendStatus(200);
  } catch (error) {
    logger.error(`Failed to process webhook event: ${error}`);
    res.sendStatus(400); 
  }
};

// Helper function to get raw request body for webhook validation
const getRawBody = (req: Request): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(Buffer.from(data));
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

// Helper function to get user ID from Stripe subscription
const getUserIdFromStripeSubscription = async (subscriptionId: string): Promise<string> => {
  const user = await prisma.user.findFirst({ where: { subscriptionId } });
  if (!user) {
    throw new Error(`User not found for subscription: ${subscriptionId}`);
  }
  return user.id;
};

// Helper function to extend user subscription based on invoice
const extendUserSubscription = async (userId: string): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.subscriptionId) {
    throw new Error(`User not found or not subscribed: ${userId}`);
  }

  const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);
  const periodEnd = subscription.current_period_end;

  await prisma.user.update({
    where: { id: userId },
    data: { subscriptionEndDate: new Date(periodEnd * 1000).toISOString() },
  });
};

// Helper function to cancel user subscription
const cancelUserSubscription = async (userId: string): Promise<void> => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionId: null,
      subscriptionEndDate: null, 
    },
  });
};
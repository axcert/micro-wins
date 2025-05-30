export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  productId: string; // App Store / Google Play product ID
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'canceled' | 'expired' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  paymentMethod?: {
    type: string;
    last4?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseResult {
  success: boolean;
  subscription?: Subscription;
  error?: string;
  transactionId?: string;
}

export interface RestorePurchaseResult {
  success: boolean;
  subscription?: Subscription;
  message: string;
}

export type SubscriptionStatus = 'free' | 'premium' | 'expired' | 'canceled';
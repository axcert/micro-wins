export type SubscriptionPlan = 'free' | 'premium';
export type BillingPeriod = 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'pending';

export interface SubscriptionPricing {
  monthly: {
    price: string;
    pricePerMonth: string;
    productId: string;
    localizedPrice: string;
  };
  yearly: {
    price: string;
    pricePerMonth: string;
    productId: string;
    localizedPrice: string;
    savings: string;
  };
}

export interface PremiumBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  freeLimit?: string;
  premiumLimit?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  billingPeriod?: BillingPeriod;
  startDate?: string;
  endDate?: string;
  autoRenew: boolean;
  transactionId?: string;
  originalTransactionId?: string;
}

export interface PurchaseResult {
  success: boolean;
  transactionId?: string;
  productId?: string;
  error?: string;
}

export interface RestorePurchaseResult {
  success: boolean;
  restoredProducts: string[];
  error?: string;
}
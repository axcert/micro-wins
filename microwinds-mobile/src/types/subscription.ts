// Subscription types for premium upgrade flow
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: 'monthly' | 'yearly';
  features: string[];
  productId: string; // IAP product ID
  isPopular?: boolean;
}

export interface SubscriptionState {
  isPremium: boolean;
  plan: SubscriptionPlan | null;
  expiresAt: string | null;
  status: 'active' | 'expired' | 'cancelled' | 'pending' | null;
  autoRenew: boolean;
}

export interface PurchaseResult {
  success: boolean;
  receipt: string;
  productId: string;
  transactionId: string;
  message?: string;
}

export interface RestorePurchaseResult {
  success: boolean;
  restoredPurchases: string[];
  message?: string;
}
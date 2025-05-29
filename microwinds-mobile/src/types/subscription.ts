export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  productId: string; // App Store / Play Store product ID
}

export interface SubscriptionStatus {
  isActive: boolean;
  plan: SubscriptionPlan | null;
  expiresAt: Date | null;
  status: 'active' | 'expired' | 'cancelled' | 'pending' | 'none';
  willRenew: boolean;
  paymentMethod?: string;
}

export interface PurchaseResult {
  success: boolean;
  transactionId?: string;
  receiptData?: string;
  error?: string;
}

export interface SubscriptionValidation {
  isValid: boolean;
  subscription?: SubscriptionStatus;
  error?: string;
}
// Subscription type definitions
export type SubscriptionPlan = 'free' | 'premium' | 'pro';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete' | 'incomplete_expired';
export type PaymentStatus = 'succeeded' | 'pending' | 'failed';

export interface SubscriptionType {
  id: string;
  user_id: number;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}

export interface Invoice {
  id: string;
  stripe_invoice_id: string;
  amount_paid: number;
  amount_due: number;
  currency: string;
  status: PaymentStatus;
  invoice_pdf?: string;
  created_at: string;
  period_start: string;
  period_end: string;
}

export interface CreateSubscriptionRequest {
  plan: SubscriptionPlan;
  payment_method_id: string;
  trial_days?: number;
}

export interface UpdatePaymentMethodRequest {
  payment_method_id: string;
  make_default?: boolean;
}

export interface SubscriptionPlanDetails {
  id: SubscriptionPlan;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    max_goals: number;
    ai_requests_per_day: number;
    goal_categories: string[];
  };
}

export interface SubscriptionApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedInvoicesResponse {
  success: boolean;
  message: string;
  data: Invoice[];
  meta: {
    current_page: number;
    total: number;
    per_page: number;
  };
}

export interface StripeSetupIntent {
  client_secret: string;
  ephemeral_key: string;
  customer_id: string;
}

export interface CachedSubscription {
  data: SubscriptionType | null;
  timestamp: number;
  expiresAt: number;
}
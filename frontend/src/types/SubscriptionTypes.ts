export type SubscriptionPlan = 'monthly' | 'yearly';

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'unpaid';
  periodStart: Date;
  periodEnd: Date;
}
export default interface User {
  _id: string;
  paymentId?: string;
  plan: SubscriptionPlanKey;
  subscriptionTime?: string;
  subscriptionStatus?: SubscriptionEventStatus;
  // subscriptionEvents?: SubscriptionEvent[];
  lang: Language;
  sessionsLeft: number;
  sessionCount: number;
  loginMethods?: LoginMethod[];
  email?: string;
  phoneNumber?: string;
  userIds?: string[];
  createdAt?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  name?: string;
}

export type SubscriptionPlanKey = 'free' | 'pro' | 'enterprise';
export type SubscriptionTime = 'monthly' | 'yearly';
export type PaymentStatus = 'unpaid' | 'paid';
export type PaymentSessionStatus = 'open' | 'complete' | 'expired';
export type SubscriptionEventStatus =
  | 'active'
  | 'unpaid'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'canceled';

export type Language = 'en' | 'es';
export interface LoginMethod {
  id: string;
  value: LoginMethodType;
}

export type LoginMethodType = 'email' | 'google';

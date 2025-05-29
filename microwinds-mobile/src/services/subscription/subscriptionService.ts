import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';
import { SubscriptionPlan, SubscriptionStatus, PurchaseResult, SubscriptionValidation } from '@/types/subscription';
import { apiClient } from '@/services/api/apiClient';

const SUBSCRIPTION_CACHE_KEY = 'subscription_status_cache';
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export class SubscriptionService {
  private static instance: SubscriptionService;
  private cacheTimestamp: number = 0;
  private cachedStatus: SubscriptionStatus | null = null;

  private constructor() {}

  public static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  /**
   * Fetch current subscription status from backend
   */
  public async fetchSubscriptionStatus(forceRefresh: boolean = false): Promise<SubscriptionStatus> {
    try {
      // Check cache first
      if (!forceRefresh && this.cachedStatus && Date.now() - this.cacheTimestamp < CACHE_DURATION) {
        return this.cachedStatus;
      }

      // Check network connectivity
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        // Return cached status if offline
        const cachedData = await this.getCachedStatus();
        if (cachedData) {
          return cachedData;
        }
        throw new Error('No internet connection and no cached subscription data');
      }

      // Fetch from backend
      const response = await apiClient.get('/api/subscription/status');
      const subscriptionStatus = this.parseSubscriptionResponse(response.data);

      // Update cache
      await this.cacheSubscriptionStatus(subscriptionStatus);
      this.cachedStatus = subscriptionStatus;
      this.cacheTimestamp = Date.now();

      return subscriptionStatus;

    } catch (error) {
      console.error('Failed to fetch subscription status:', error);
      
      // Try to return cached data on error
      const cachedData = await this.getCachedStatus();
      if (cachedData) {
        return cachedData;
      }

      // Return default status if all fails
      return {
        isActive: false,
        plan: null,
        expiresAt: null,
        status: 'none',
        willRenew: false
      };
    }
  }

  /**
   * Get available subscription plans
   */
  public async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    try {
      const response = await apiClient.get('/api/subscription/plans');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch subscription plans:', error);
      return this.getDefaultPlans();
    }
  }

  /**
   * Initiate purchase flow
   */
  public async purchaseSubscription(plan: SubscriptionPlan): Promise<PurchaseResult> {
    try {
      // Platform-specific purchase logic would go here
      // For now, simulating the purchase flow
      
      // Check network connectivity
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        throw new Error('Purchase requires internet connection');
      }

      // In production, this would integrate with:
      // - react-native-iap for iOS/Android in-app purchases
      // - Platform-specific purchase APIs
      
      // Simulate purchase token
      const purchaseToken = this.generateMockPurchaseToken(plan);
      
      // Send to backend for validation
      const validation = await this.validatePurchase(purchaseToken, plan);
      
      if (validation.isValid) {
        // Update local cache
        if (validation.subscription) {
          await this.cacheSubscriptionStatus(validation.subscription);
          this.cachedStatus = validation.subscription;
          this.cacheTimestamp = Date.now();
        }
        
        return {
          success: true,
          transactionId: purchaseToken,
          receiptData: purchaseToken
        };
      } else {
        throw new Error(validation.error || 'Purchase validation failed');
      }

    } catch (error: any) {
      console.error('Purchase failed:', error);
      return {
        success: false,
        error: error.message || 'Purchase failed'
      };
    }
  }

  /**
   * Validate purchase with backend
   */
  private async validatePurchase(receiptData: string, plan: SubscriptionPlan): Promise<SubscriptionValidation> {
    try {
      const response = await apiClient.post('/api/subscription/validate', {
        receipt: receiptData,
        platform: Platform.OS,
        planId: plan.id
      });

      return {
        isValid: response.data.success,
        subscription: response.data.subscription ? this.parseSubscriptionResponse(response.data.subscription) : undefined,
        error: response.data.error
      };

    } catch (error: any) {
      console.error('Receipt validation failed:', error);
      return {
        isValid: false,
        error: error.response?.data?.message || 'Validation failed'
      };
    }
  }

  /**
   * Restore previous purchases
   */
  public async restoreSubscription(): Promise<SubscriptionStatus> {
    try {
      // Check network connectivity
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        throw new Error('Restore requires internet connection');
      }

      // In production, this would:
      // 1. Get purchase history from app store
      // 2. Send receipts to backend for validation
      // 3. Update subscription status
      
      const response = await apiClient.post('/api/subscription/restore', {
        platform: Platform.OS
      });

      const subscriptionStatus = this.parseSubscriptionResponse(response.data.subscription);
      
      // Update cache
      await this.cacheSubscriptionStatus(subscriptionStatus);
      this.cachedStatus = subscriptionStatus;
      this.cacheTimestamp = Date.now();

      return subscriptionStatus;

    } catch (error: any) {
      console.error('Restore subscription failed:', error);
      throw new Error(error.response?.data?.message || 'Failed to restore subscription');
    }
  }

  /**
   * Cancel subscription
   */
  public async cancelSubscription(): Promise<boolean> {
    try {
      const response = await apiClient.post('/api/subscription/cancel');
      
      if (response.data.success) {
        // Update cached status
        const updatedStatus = await this.fetchSubscriptionStatus(true);
        return true;
      }
      
      return false;

    } catch (error: any) {
      console.error('Cancel subscription failed:', error);
      throw new Error(error.response?.data?.message || 'Failed to cancel subscription');
    }
  }

  /**
   * Cache subscription status locally
   */
  private async cacheSubscriptionStatus(status: SubscriptionStatus): Promise<void> {
    try {
      const cacheData = {
        status,
        timestamp: Date.now()
      };
      await AsyncStorage.setItem(SUBSCRIPTION_CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Failed to cache subscription status:', error);
    }
  }

  /**
   * Get cached subscription status
   */
  private async getCachedStatus(): Promise<SubscriptionStatus | null> {
    try {
      const cached = await AsyncStorage.getItem(SUBSCRIPTION_CACHE_KEY);
      if (cached) {
        const { status, timestamp } = JSON.parse(cached);
        // Check if cache is not too old (24 hours)
        if (Date.now() - timestamp < 86400000) {
          return status;
        }
      }
    } catch (error) {
      console.error('Failed to read cached subscription status:', error);
    }
    return null;
  }

  /**
   * Parse subscription response from backend
   */
  private parseSubscriptionResponse(data: any): SubscriptionStatus {
    return {
      isActive: data.is_active || false,
      plan: data.plan ? {
        id: data.plan.id,
        name: data.plan.name,
        price: data.plan.price,
        currency: data.plan.currency,
        interval: data.plan.interval,
        features: data.plan.features || [],
        productId: data.plan.product_id
      } : null,
      expiresAt: data.expires_at ? new Date(data.expires_at) : null,
      status: data.status || 'none',
      willRenew: data.will_renew || false,
      paymentMethod: data.payment_method
    };
  }

  /**
   * Get default subscription plans (fallback)
   */
  private getDefaultPlans(): SubscriptionPlan[] {
    return [
      {
        id: 'premium_monthly',
        name: 'Premium Monthly',
        price: 9.99,
        currency: 'USD',
        interval: 'month',
        features: [
          'Unlimited goals',
          'Advanced analytics',
          'Priority support',
          'Export data',
          'Custom categories'
        ],
        productId: 'com.microwinds.premium.monthly'
      },
      {
        id: 'premium_yearly',
        name: 'Premium Yearly',
        price: 99.99,
        currency: 'USD',
        interval: 'year',
        features: [
          'Everything in monthly',
          '2 months free',
          'Early access to features',
          'Exclusive themes',
          'Advanced AI insights'
        ],
        productId: 'com.microwinds.premium.yearly'
      }
    ];
  }

  /**
   * Generate mock purchase token for development
   */
  private generateMockPurchaseToken(plan: SubscriptionPlan): string {
    return `mock_${plan.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clear subscription cache
   */
  public async clearCache(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SUBSCRIPTION_CACHE_KEY);
      this.cachedStatus = null;
      this.cacheTimestamp = 0;
    } catch (error) {
      console.error('Failed to clear subscription cache:', error);
    }
  }
}

export const subscriptionService = SubscriptionService.getInstance();
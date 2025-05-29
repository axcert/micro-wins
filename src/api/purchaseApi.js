import { Platform } from 'react-native';
import { purchaseErrorListener, purchaseUpdatedListener, getProducts, finishTransaction, getAvailablePurchases, finishTransactionIOS } from 'react-native-iap';

const PREMIUM_MONTHLY_PRODUCT_ID = 'com.microgoals.premium_monthly';
const PREMIUM_YEARLY_PRODUCT_ID = 'com.microgoals.premium_yearly';

export const initialize = async () => {
  try {
    await getProducts([PREMIUM_MONTHLY_PRODUCT_ID, PREMIUM_YEARLY_PRODUCT_ID]);
  } catch (error) {
    console.log('Failed to get available products:', error);
  }

  purchaseUpdatedListener(async (purchase) => {
    try {
      const receipt = purchase.transactionReceipt;
      
      if (receipt) {
        // TODO: Validate receipt on server
        
        if (Platform.OS === 'ios') {
          await finishTransactionIOS(purchase.transactionId);
        } else {
          await finishTransaction(purchase);
        }

        console.log('Purchase successful:', purchase);
      }
      
    } catch (error) {
      console.log('Error processing purchase:', error);
    }
  });

  purchaseErrorListener((error) => {
    console.log('Purchase error:', error);
  });
};

export const getSubscriptionPlans = async () => {
  try {
    const products = await getProducts([PREMIUM_MONTHLY_PRODUCT_ID, PREMIUM_YEARLY_PRODUCT_ID]);
    return products;
  } catch (error) {
    console.log('Failed to get subscription plans:', error);
    return [];
  }
};

export const isPremiumUser = async () => {
  try {
    const purchases = await getAvailablePurchases();
    return purchases.some(purchase => 
      purchase.productId === PREMIUM_MONTHLY_PRODUCT_ID || 
      purchase.productId === PREMIUM_YEARLY_PRODUCT_ID
    );
  } catch (error) {
    console.log('Failed to check premium status:', error);
    return false;
  }
};

export const buySubscription = async (productId) => {
  try {
    await requestSubscription(productId);
  } catch (error) {
    console.log('Failed to buy subscription:', error);
  }
};
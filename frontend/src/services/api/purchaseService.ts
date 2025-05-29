import { Platform } from 'react-native';
import iapReceiptValidator from 'iap-receipt-validator';
import * as RNIap from 'react-native-iap';

const SKU_PREMIUM_MONTHLY = 'com.microwins.premium.monthly';

export const initializePurchases = async (): Promise<void> => {
  try {
    await RNIap.initConnection();
    await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
  } catch (err) {
    console.error('Error initializing purchases:', err);
    throw err;
  }
};

export const purchasePremium = async (): Promise<string> => {
  try {
    await initializePurchases();
    const products = await RNIap.getProducts([SKU_PREMIUM_MONTHLY]);

    if (products.length === 0) {
      throw new Error('Premium product not found');
    }
    
    const purchase = await RNIap.requestSubscription(SKU_PREMIUM_MONTHLY);
    
    if (Platform.OS === 'ios') {
      // Validate receipt with App Store      
      const receiptBody = {
        'receipt-data': purchase.transactionReceipt,
        password: 'YOUR_SHARED_SECRET'
      };
      
      const validationResult = await iapReceiptValidator(receiptBody, {
        sandbox: __DEV__,
      });
      
      if (validationResult.status === 21007) {
        // Sandbox receipt, validate again with sandbox flag
        validationResult = await iapReceiptValidator(receiptBody, {
          sandbox: true,
        });
      }
      
      if (validationResult.status !== 0) {
        throw new Error('Receipt validation failed');
      }
      
      return validationResult.latest_receipt;
      
    } else if (Platform.OS === 'android') {
      // TODO: Validate receipt with Google Play
      return purchase.transactionReceipt;
    }
    
  } catch (err) {
    console.error('Error purchasing premium:', err);
    throw err;
  }
};

export const restorePurchases = async (): Promise<RNIap.Purchase[]> => {
  try {
    await initializePurchases();
    const purchases = await RNIap.getAvailablePurchases();
    
    if (Platform.OS === 'ios') {
      // TODO: Validate receipt with App Store
    } else if (Platform.OS === 'android') {
      // TODO: Validate receipts with Google Play  
    }

    return purchases;
  } catch (err) {
    console.error('Error restoring purchases:', err);
    throw err;
  }
};
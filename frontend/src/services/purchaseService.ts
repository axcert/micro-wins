import * as IAP from 'react-native-iap';

const PREMIUM_SKU = 'your.premium.sku'; // Replace with your actual premium SKU

export const initializeIAP = async () => {
  try {
    await IAP.initConnection();
    await IAP.getProducts([PREMIUM_SKU]);
  } catch (error) {
    console.error('Failed to initialize IAP', error);
  }
};

export const purchasePremium = async (): Promise<IAP.InAppPurchase | null> => {
  try {
    await IAP.requestPurchase(PREMIUM_SKU);
    const purchases = await IAP.getAvailablePurchases();
    const premiumPurchase = purchases.find(p => p.productId === PREMIUM_SKU);
    if (premiumPurchase && premiumPurchase.transactionReceipt) {
      // TODO: Validate receipt on server
      return premiumPurchase;
    }
  } catch (error) {
    console.error('Failed to purchase premium', error);
  }
  return null;
};

export const restorePurchases = async (): Promise<boolean> => {
  try {
    await IAP.restorePurchases();
    const purchases = await IAP.getAvailablePurchases();
    const premiumPurchase = purchases.find(p => p.productId === PREMIUM_SKU);
    return !!premiumPurchase;
  } catch (error) {
    console.error('Failed to restore purchases', error);
  }
  return false;
};
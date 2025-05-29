import { handleError } from '../utils/errorUtils';

const SUBSCRIPTION_API_URL = 'https://api.yourapp.com/subscriptions';

export const fetchSubscriptionStatus = async (userId) => {
  try {
    const response = await fetch(`${SUBSCRIPTION_API_URL}/status/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const processSubscriptionPurchase = async (purchaseToken) => {
  try {
    const response = await fetch(`${SUBSCRIPTION_API_URL}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ purchaseToken }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    return null; 
  }
};

export const restoreSubscription = async (userId) => {
  try {
    const response = await fetch(`${SUBSCRIPTION_API_URL}/restore/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
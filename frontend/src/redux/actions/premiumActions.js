import { InAppPurchase } from 'react-native-iap';

export const PURCHASE_PREMIUM_REQUEST = 'PURCHASE_PREMIUM_REQUEST';
export const PURCHASE_PREMIUM_SUCCESS = 'PURCHASE_PREMIUM_SUCCESS';
export const PURCHASE_PREMIUM_FAILURE = 'PURCHASE_PREMIUM_FAILURE';

const productId = 'your_premium_product_id';

export const purchasePremium = () => async (dispatch) => {
  try {
    dispatch({ type: PURCHASE_PREMIUM_REQUEST });
    
    const purchase = await InAppPurchase.requestPurchase(productId);
    
    if (purchase.transactionReceipt) {
      // TODO: Validate receipt on server
      dispatch({ type: PURCHASE_PREMIUM_SUCCESS, payload: purchase });
    } else {
      dispatch({ type: PURCHASE_PREMIUM_FAILURE, error: 'Transaction failed' });  
    }
  } catch (error) {
    dispatch({ type: PURCHASE_PREMIUM_FAILURE, error: error.message });
  }
};
import {
  PURCHASE_PREMIUM_REQUEST,
  PURCHASE_PREMIUM_SUCCESS,
  PURCHASE_PREMIUM_FAILURE,
} from '../actions/premiumActions';

const initialState = {
  loading: false,
  isPremium: false,
  error: null,
};

const premiumReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_PREMIUM_REQUEST:
      return { ...state, loading: true, error: null };
    case PURCHASE_PREMIUM_SUCCESS:
      return { ...state, loading: false, isPremium: true };
    case PURCHASE_PREMIUM_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default premiumReducer;
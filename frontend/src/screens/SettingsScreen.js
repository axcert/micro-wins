import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubscriptionStatus, purchaseSubscription, restoreSubscription } from '../store/subscriptionSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { subscriptionStatus, loading, error } = useSelector(state => state.subscription);
  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);

  useEffect(() => {
    dispatch(fetchSubscriptionStatus());
  }, [dispatch]);

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      await dispatch(purchaseSubscription());
    } catch (err) {
      console.error('Subscription purchase failed', err);
      // TODO: display user-friendly error
    }
    setPurchasing(false);
  };

  const handleRestore = async () => {
    setRestoring(true);
    try { 
      await dispatch(restoreSubscription());
    } catch (err) {
      console.error('Subscription restore failed', err);
      // TODO: display user-friendly error
    }
    setRestoring(false);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <Text>Subscription Status: {subscriptionStatus}</Text>
      
      {subscriptionStatus !== 'active' && (
        <TouchableOpacity onPress={handlePurchase} disabled={purchasing}>
          <Text>{purchasing ? 'Purchasing...' : 'Upgrade to Premium'}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleRestore} disabled={restoring}>
        <Text>{restoring ? 'Restoring...' : 'Restore Purchase'}</Text>
      </TouchableOpacity>

      {error && <Text>Error: {error}</Text>}
    </View>
  );
};

export default SettingsScreen;
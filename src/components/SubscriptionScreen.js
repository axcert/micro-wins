import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Sentry from '@sentry/react-native';
import { fetchSubscriptionStatus, processSubscriptionPurchase, restoreSubscription } from '../api/subscriptionApi';
import { setSubscriptionStatus } from '../redux/subscriptionSlice';
import { handleError } from '../utils/errorUtils';

const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  const { userId, subscriptionStatus } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      try {
        const status = await fetchSubscriptionStatus(userId);
        dispatch(setSubscriptionStatus(status));
      } catch (error) {
        handleError(error);
      }
    };

    getSubscriptionStatus();
  }, []);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // TODO: Implement purchase UI and get token
      const purchaseToken = 'sample-token';
      const result = await processSubscriptionPurchase(purchaseToken);
      if (result.success) {
        dispatch(setSubscriptionStatus('active'));
      } else {
        // Handle purchase failure
      }
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const handleRestoreSubscription = async () => {
    setLoading(true);
    try {
      const result = await restoreSubscription(userId);
      if (result.success) {
        dispatch(setSubscriptionStatus('active'));
      } else {
        // Handle restore failure  
      }
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  return (
    <View>
      <Text>Subscription Status: {subscriptionStatus}</Text>
      {subscriptionStatus !== 'active' && (
        <Button
          title="Subscribe"
          onPress={handleSubscribe}
          disabled={loading}
        />
      )}
      <Button 
        title="Restore Subscription"
        onPress={handleRestoreSubscription}
        disabled={loading}
      />
      {/* TODO: Add subscription management UI */}
    </View>
  );
};

export default Sentry.wrap(SubscriptionScreen);
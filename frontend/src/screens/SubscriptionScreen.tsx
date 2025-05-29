import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { createSubscription, restoreSubscription } from '../services/api/subscriptionService';
import { setSubscription, setLoading, setError } from '../store/slices/subscriptionSlice';
import { colors, typography } from '../../constants';

const SubscriptionScreen: React.FC = () => {
  const subscription = useSelector((state: RootState) => state.subscription.subscription);
  const loading = useSelector((state: RootState) => state.subscription.loading);
  const error = useSelector((state: RootState) => state.subscription.error);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch subscription status on component mount
    dispatch(setLoading(true));
    fetchSubscription(dispatch)
      .then((sub) => {
        dispatch(setSubscription(sub));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setError(err.message));
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  const handlePurchase = async () => {
    try {
      // TODO: Get purchase token from Stripe
      const token = 'stripe_token';
      dispatch(setLoading(true));
      const newSubscription = await createSubscription(token);
      dispatch(setSubscription(newSubscription));
    } catch (err) {
      Alert.alert('Purchase Failed', err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRestore = async () => {
    try {
      dispatch(setLoading(true));
      const restoredSubscription = await restoreSubscription();
      dispatch(setSubscription(restoredSubscription));
    } catch (err) {
      Alert.alert('Restore Failed', err.message); 
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={[typography.h2, { marginBottom: 16 }]}>Subscription</Text>
      {subscription ? (
        <>
          <Text>Status: {subscription.status}</Text>
          <Text>Start Date: {new Date(subscription.startDate).toLocaleDateString()}</Text>
          <Text>End Date: {new Date(subscription.endDate).toLocaleDateString()}</Text>
          <Button title="Manage Subscription" onPress={() => { /* TODO */ }} />
          <Button title="Restore Purchase" onPress={handleRestore} />
        </>
      ) : (
        <>
          <Text>No active subscription</Text>
          <Button title="Subscribe" onPress={handlePurchase} />
          <Button title="Restore Purchase" onPress={handleRestore} />
        </>
      )}
      {error && <Text style={{ color: colors.error, marginTop: 16 }}>{error}</Text>}
    </View>
  );
};

export default SubscriptionScreen;
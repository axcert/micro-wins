import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors, typography, spacing } from '../../constants/theme';
import { fetchSubscriptionStatus, purchaseSubscription, restoreSubscription } from '../../services/api/subscriptionService';
import { setSubscriptionStatus } from '../../store/slices/userSlice';
import ErrorMessage from '../../components/common/ErrorMessage';
import SubscriptionFeatures from '../../components/profile/SubscriptionFeatures';

const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  const { subscriptionStatus, isPremium } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      setLoading(true);
      try {
        const status = await fetchSubscriptionStatus();
        dispatch(setSubscriptionStatus(status));
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    getSubscriptionStatus();
  }, []);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const purchaseToken = await purchaseSubscription();
      // TODO: Send purchase token to backend for validation
      dispatch(setSubscriptionStatus('active'));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      await restoreSubscription();
      dispatch(setSubscriptionStatus('active'));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: spacing.md }}>
      <Text style={typography.h2}>Subscription</Text>
      {error && <ErrorMessage message={error} />}
      
      {isPremium ? (
        <View>
          <Text style={[typography.body, { marginTop: spacing.md }]}>
            Your premium subscription is active. Enjoy unlimited access to all features!
          </Text>
          {/* TODO: Add subscription management options */}
        </View>
      ) : (
        <View>
          <SubscriptionFeatures />
          
          <TouchableOpacity 
            style={{
              backgroundColor: colors.primary,
              padding: spacing.md,
              borderRadius: 8,
              marginTop: spacing.lg
            }}
            onPress={handlePurchase}
          >
            <Text style={[typography.h3, { color: colors.background.primary, textAlign: 'center' }]}>
              Subscribe Now
            </Text>
          </TouchableOpacity>

          {subscriptionStatus === 'expired' && (
            <TouchableOpacity onPress={handleRestore}>
              <Text style={[typography.body, { color: colors.primary, marginTop: spacing.md }]}>
                Restore Previous Purchase
              </Text>  
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default SubscriptionScreen;
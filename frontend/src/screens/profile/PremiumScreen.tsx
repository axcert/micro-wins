import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as IAP from 'react-native-iap';
import * as Sentry from '@sentry/react-native';

import { colors, spacing, typography } from '../../constants/theme';
import { RootState } from '../../store';
import { updateUserPremiumStatus } from '../../store/slices/userSlice';
import * as purchaseService from '../../services/purchaseService';

const PremiumScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { isPremium } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const purchase = await purchaseService.purchasePremium();
      if (purchase) {
        dispatch(updateUserPremiumStatus(true));
        Alert.alert('Upgrade Successful', 'Thank you for going premium!');
      } else {
        Alert.alert('Purchase Failed', 'Please try again later.');
      }
    } catch (error) {
      console.error('Failed to purchase premium', error);
      Sentry.captureException(error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
    setLoading(false);
  };

  const restorePurchases = async () => {
    setLoading(true);
    try {
      const restored = await purchaseService.restorePurchases();
      if (restored) {
        dispatch(updateUserPremiumStatus(true));
        Alert.alert('Restore Successful', 'Your premium status has been restored.');
      } else {
        Alert.alert('No Purchases Found', 'No previous purchases were found.');
      }
    } catch (error) {
      console.error('Failed to restore purchases', error);
      Sentry.captureException(error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={typography.h2}>Upgrade to Premium</Text>
      <Text style={[typography.body, { marginTop: spacing.md }]}>
        Unlock the full potential of MicroWins by going premium:
      </Text>
      <View style={{ marginTop: spacing.lg }}>
        <Text style={typography.body}>✅ Track unlimited goals</Text>
        <Text style={typography.body}>✅ Get personalized AI coaching</Text>
        <Text style={typography.body}>✅ Unlock advanced analytics</Text>
        <Text style={typography.body}>✅ Custom app themes</Text>
        <Text style={typography.body}>✅ Priority support</Text>
      </View>
      <View style={{ marginTop: spacing.xl }}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <>
            {isPremium ? (
              <View style={{ alignItems: 'center' }}>
                <Text style={[typography.h3, { color: colors.success }]}>
                  🎉 You're a Premium Member! 🎉
                </Text>
              </View>
            ) : (
              <>
                <Button
                  title="Upgrade Now - $4.99/month"
                  onPress={handlePurchase}
                  color={colors.primary}
                />
                <Button
                  title="Restore Purchases"
                  onPress={restorePurchases}
                  color={colors.secondary}
                />
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default PremiumScreen;
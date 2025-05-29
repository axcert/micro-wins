import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors, typography, spacing } from '../../constants/theme';
import { RootState } from '../../store/store'; 
import { setSubscriptionStatus } from '../../store/slices/userSlice';
import { purchasePremium, restorePurchases } from '../../services/api/purchaseService';

const PremiumScreen = () => {
  const { subscriptionStatus, isPremium } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handlePurchase = async () => {
    try {
      const receipt = await purchasePremium();
      // TODO: Validate receipt on server
      dispatch(setSubscriptionStatus('active'));
    } catch (err) {
      console.error('Error purchasing premium:', err);
      // TODO: Show error message
    }
  };

  const handleRestore = async () => {
    try {
      const purchases = await restorePurchases();
      if (purchases.length > 0) {
        dispatch(setSubscriptionStatus('active')); 
      }
    } catch (err) {
      console.error('Error restoring purchases:', err);
      // TODO: Show error message  
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upgrade to Premium</Text>
      
      <View style={styles.benefits}>
        <Text style={styles.bullet}>✓ Track unlimited goals</Text>
        <Text style={styles.bullet}>✓ Access AI goal coach</Text>
        <Text style={styles.bullet}>✓ Unlock advanced analytics</Text>
      </View>

      <Text style={styles.price}>$4.99/month</Text>

      <TouchableOpacity 
        style={[styles.button, isPremium && styles.buttonPremium]}
        onPress={handlePurchase}
        disabled={isPremium}
      >
        <Text style={styles.buttonText}>
          {isPremium ? 'Premium Member' : 'Upgrade Now'}
        </Text>
      </TouchableOpacity>

      {!isPremium && (
        <TouchableOpacity onPress={handleRestore}>
          <Text style={styles.restoreText}>Restore Purchases</Text>  
        </TouchableOpacity>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background.primary,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.lg,
  },
  benefits: {
    marginBottom: spacing.lg,  
  },
  bullet: {
    ...typography.body,
    marginBottom: spacing.sm,
  },
  price: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.xl,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
  },
  buttonPremium: {
    backgroundColor: colors.success,
  },
  buttonText: {
    ...typography.h3,
    color: colors.background.primary,
  },
  restoreText: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.lg,
  }
});

export default PremiumScreen;
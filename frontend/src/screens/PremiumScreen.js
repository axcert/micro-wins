import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { purchasePremium } from '../redux/actions/premiumActions';

const PremiumScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePurchase = async () => {
    try {
      await dispatch(purchasePremium());
      navigation.navigate('PremiumSuccess');
    } catch (error) {
      navigation.navigate('PremiumError');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unlock Premium</Text>
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefit}>✓ Unlimited Goals</Text>
        <Text style={styles.benefit}>✓ AI Goal Coach</Text>
        <Text style={styles.benefit}>✓ Advanced Analytics</Text>
        <Text style={styles.benefit}>✓ Custom Themes</Text>
        <Text style={styles.benefit}>✓ Priority Support</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePurchase}>
        <Text style={styles.buttonText}>Upgrade Now</Text>
        <Text style={styles.price}>$4.99/month</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.restoreButton}>
        <Text style={styles.restoreButtonText}>Restore Purchases</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  benefitsContainer: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  benefit: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 5,
  },
  restoreButton: {
    padding: 10,
  },
  restoreButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default PremiumScreen;
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { getSubscriptionPlans, buySubscription } from '../api/purchaseApi';

const UpgradeScreen = () => {
  const [plans, setPlans] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const fetchPlans = async () => {
      const availablePlans = await getSubscriptionPlans();
      setPlans(availablePlans);
      setLoading(false);
    };

    fetchPlans();
  }, []);

  const handleUpgrade = async (productId) => {
    setLoading(true);
    await buySubscription(productId);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upgrade to Premium</Text>
      <Text style={styles.subtitle}>Unlock advanced features:</Text>
      <View style={styles.benefitsList}>
        <Text style={styles.benefitsItem}>• Unlimited Goals</Text>
        <Text style={styles.benefitsItem}>• AI Goal Coach</Text>
        <Text style={styles.benefitsItem}>• Advanced Analytics</Text>
        <Text style={styles.benefitsItem}>• Custom Themes</Text>
        <Text style={styles.benefitsItem}>• Priority Support</Text>
      </View>
      {plans.map(plan => (
        <View key={plan.productId} style={styles.planCard}>
          <Text style={styles.planTitle}>{plan.title}</Text>
          <Text style={styles.planPrice}>{plan.localizedPrice}</Text>
          <Text style={styles.planDescription}>{plan.description}</Text>
          <Button 
            title="Upgrade"
            onPress={() => handleUpgrade(plan.productId)}
            buttonStyle={styles.upgradeButton}
          />
        </View>
      ))}
      <Button 
        title="Restore Purchases"
        type="clear"
        titleStyle={styles.restoreButtonText}
        onPress={() => {/* TODO */}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  benefitsList: {
    marginBottom: 20,
  },
  benefitsItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  planCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
  planDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  upgradeButton: {
    paddingVertical: 10,
  },
  restoreButtonText: {
    color: '#999',
    textDecorationLine: 'underline',
  },
});

export default UpgradeScreen;
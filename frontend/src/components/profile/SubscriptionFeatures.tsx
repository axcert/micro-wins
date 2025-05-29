import React from 'react';
import { View, Text } from 'react-native';
import { typography, spacing } from '../../constants/theme';

const subscriptionFeatures = [
  'Unlimited active goals',
  'Advanced AI goal coach',
  'Detailed progress analytics',
  'Personalized goal recommendations'
];

const SubscriptionFeatures = () => {
  return (
    <View style={{ marginTop: spacing.lg }}>
      <Text style={[typography.h3, { marginBottom: spacing.sm }]}>
        Premium Features
      </Text>
      {subscriptionFeatures.map((feature, index) => (
        <View key={index} style={{ flexDirection: 'row', marginBottom: spacing.sm }}>
          <Text style={{ marginRight: spacing.sm }}>✓</Text>
          <Text style={typography.body}>{feature}</Text>
        </View>
      ))}
    </View>
  );
};

export default SubscriptionFeatures;
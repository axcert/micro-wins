import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, typography } from '@/constants/theme';
import Logo from '@/components/common/Logo';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignIn');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Logo size={120} />
      <Text style={styles.title}>MicroWins</Text>
      <Text style={styles.subtitle}>Achieve goals, 1% at a time</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginTop: spacing.lg,
  },
  subtitle: {
    ...typography.h3,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
});
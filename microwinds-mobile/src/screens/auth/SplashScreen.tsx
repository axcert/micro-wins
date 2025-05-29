import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-elements';

import { colors, spacing, typography } from '@/constants/theme';
import { checkAuthStatus } from '@/store/slices/authSlice';
import { AppDispatch } from '@/store';

export default function SplashScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.8);

  useEffect(() => {
    // Animate logo
    fadeAnim.value = withTiming(1, { duration: 800 });
    scaleAnim.value = withSpring(1, {
      damping: 10,
      stiffness: 100,
    });

    // Check auth status after 2 seconds
    const timer = setTimeout(async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          await dispatch(checkAuthStatus()).unwrap();
        }
      } catch (error) {
        console.error('Failed to check auth status:', error);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch, navigation, fadeAnim, scaleAnim]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [{ scale: scaleAnim.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <View style={styles.iconContainer}>
          <Text style={styles.logo}>🎯</Text>
        </View>
        <Text style={styles.appName}>MicroWins</Text>
        <Text style={styles.tagline}>Transform big goals into daily wins</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.large,
  },
  logo: {
    fontSize: 60,
  },
  appName: {
    ...typography.h1,
    color: colors.text.inverse,
    marginBottom: spacing.sm,
  },
  tagline: {
    ...typography.body,
    color: colors.text.inverse,
    opacity: 0.9,
  },
});
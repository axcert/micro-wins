import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Onboarding from 'react-native-onboarding-swiper';
import { completeOnboarding } from '@/store/slices/authSlice';
import { colors, typography, spacing } from '@/constants/theme';

const onboardingPages = [
  {
    title: 'Welcome to MicroWins',
    subtitle: 'Achieve your goals one step at a time',
    backgroundColor: colors.primary,
  },
  {
    title: 'Break Down Big Goals',
    subtitle: 'Turn overwhelming goals into bite-sized steps',
    backgroundColor: colors.secondary,
  },
  {
    title: '1% Progress Every Day',
    subtitle: 'Small daily wins add up to massive success',
    backgroundColor: colors.success,
  },
];

export default function OnboardingScreen() {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSkip = () => {
    dispatch(completeOnboarding());
  };

  const handleDone = () => {
    dispatch(completeOnboarding());
  };

  return (
    <Onboarding
      pages={onboardingPages}
      onSkip={handleSkip}
      onDone={handleDone}
      containerStyles={{ paddingBottom: spacing.lg }}
      imageContainerStyles={{ paddingBottom: spacing.lg }}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      showSkip={currentIndex < onboardingPages.length - 1}
      renderSkip={() => <Text style={styles.skipButton}>Skip</Text>}
      renderDoneButton={() => <Text style={styles.doneButton}>Get Started</Text>}
      transitionAnimationDuration={300}
      bottomBarHighlight={false}
      onSlideChange={(index, lastIndex) => setCurrentIndex(index)}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.text.inverse,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  subtitle: {
    ...typography.h4,
    color: colors.text.inverse,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  skipButton: {
    ...typography.button,
    color: colors.text.inverse,
    padding: spacing.md,
  },
  doneButton: {
    ...typography.button,
    color: colors.text.inverse,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.text.inverse,
    borderRadius: 30,
    paddingHorizontal: spacing.xl,
  },
});
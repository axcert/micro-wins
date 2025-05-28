import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; 
import { COLORS, FONTS, SPACING } from '../constants/design';
import CreateGoal from '../screens/CreateGoal';


const slides = [
  {
    key: 1,
    title: 'Welcome to MicroWins!',
    text: 'Transform big goals into daily progress.',
  },
  {
    key: 2, 
    title: '100 Steps to Success',
    text: 'Each goal is broken down into 100 small wins.',
  },
  {
    key: 3,
    title: 'Stay Motivated',
    text: 'Celebrate milestones and maintain momentum.',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleSkip = () => {
    navigation.replace('App');
  };

  const handleStart = () => {
    navigation.replace('CreateGoal');
    // Optionally, you can also navigate to the CreateGoal screen directly
  };

  const renderSlides = () => {
    return slides.map((slide) => (
      <View key={slide.key} style={styles.slide}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.text}>{slide.text}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.slidesContainer}>{renderSlides()}</View>

      <Button
        title="Get Started"
        containerStyle={styles.button}
        onPress={handleStart}
      />

      <Button 
        title="Skip"
        type="clear"
        containerStyle={styles.button}
        titleStyle={styles.skipButton}
        onPress={handleSkip}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  slidesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  slide: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.lightText,
    textAlign: 'center',
  },
  button: {
    marginTop: SPACING.md,
  },
  skipButton: {
    color: COLORS.lightText,
  },
});

export default OnboardingScreen;
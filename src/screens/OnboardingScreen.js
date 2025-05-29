import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();

  const onboardingSteps = [
    {
      title: 'Welcome to MicroWins!',
      description: 'Transform your goals into 100 small steps.',
    },
    {
      title: 'Track Your Progress',
      description: 'Celebrate each completed step towards your goal.',
    },
    {
      title: 'Stay Motivated',
      description: 'Get daily reminders and visualize your achievements.',
    },
  ];

  const handleNext = () => {
    if (currentStep === onboardingSteps.length - 1) {
      navigation.replace('Home');
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleSkip = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
      <Text style={styles.description}>{onboardingSteps[currentStep].description}</Text>
      <View style={styles.buttonContainer}>
        {currentStep < onboardingSteps.length - 1 && (
          <Button title="Skip" onPress={handleSkip} />
        )}
        <Button
          title={currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default OnboardingScreen;
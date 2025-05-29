```tsx
import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import Swiper from 'react-native-swiper';
import { colors, typography } from '../../constants/theme';

const OnboardingScreen: React.FC = () => {
  const [showSkip, setShowSkip] = useState(true);

  const navigateToAuth = () => {
    // Navigate to login/register screen
  };

  const renderOnboardingSlides = () => {
    return (
      <>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/onboarding-1.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Welcome to MicroWins!</Text>
          <Text style={styles.description}>
            Achieve your goals through small daily steps.
          </Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/onboarding-2.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Break down big goals</Text>
          <Text style={styles.description}>
            Our AI will help you create a 100-day plan.
          </Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/onboarding-3.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Stay motivated</Text>
          <Text style={styles.description}>
            Celebrate your progress and earn streaks.
          </Text>
          <Button title="Get Started" onPress={navigateToAuth} />
        </View>
      </>
    );
  };

  return (
    <Swiper
      loop={false}
      showsButtons={false}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      onIndexChanged={(index) => setShowSkip(index !== 2)}
    >
      {renderOnboardingSlides()}
      {showSkip && (
        <Button
          title="Skip"
          onPress={navigateToAuth}
          color={colors.text.secondary}
        />
      )}
    </Swiper>
  );
};

const styles = {
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    ...typography.h1,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    marginBottom: 20,
    textAlign: 'center',
  },
  dotStyle: {
    backgroundColor: colors.border,
    marginBottom: 20,
  },
  activeDotStyle: {
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
};

export default OnboardingScreen;
```
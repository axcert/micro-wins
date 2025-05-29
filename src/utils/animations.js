import { Animated } from 'react-native';

export const showCelebrationAnimation = () => {
  // TODO: Implement celebration animation using Lottie
  console.log('Celebration animation triggered');
};

export const fadeIn = (value, duration = 500) => {
  return Animated.timing(value, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });
};

export const fadeOut = (value, duration = 500) => {
  return Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });
};
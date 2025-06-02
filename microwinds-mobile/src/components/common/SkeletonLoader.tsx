import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { colors } from '@/constants/theme';

interface SkeletonLoaderProps {
  style?: ViewStyle;
}

export default function SkeletonLoader({ style }: SkeletonLoaderProps) {
  const animation = useSharedValue(0);
  
  React.useEffect(() => {
    animation.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, [animation]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animation.value,
      [0, 1],
      [-100, 100] 
    );

    return {
      transform: [{ translateX }],
    };
  });
  
  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={['transparent', colors.background.tertiary, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.background.secondary,
  },
});
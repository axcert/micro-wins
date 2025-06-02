import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { colors, spacing, typography } from '@/constants/theme';

const ONBOARDING_STEPS = [
  {
    id: '1',
    title: 'Set Big Goals',
    description: 'Define your ambitious goals in any area of life.',
    image: require('@/assets/images/onboarding-1.png'),
  },
  {
    id: '2',
    title: 'Break Into Micro-Steps',
    description: 'Our AI divides goals into easy daily tasks.',
    image: require('@/assets/images/onboarding-2.png'),
  },
  {
    id: '3',  
    title: 'Stay Accountable',
    description: 'Track progress, earn streaks, and celebrate wins!',
    image: require('@/assets/images/onboarding-3.png'),
  },
];

const OnboardingStep = ({ item }: { item: typeof ONBOARDING_STEPS[0] }) => (
  <View style={styles.stepContainer}>
    <Image source={item.image} style={styles.stepImage} />
    <Text style={styles.stepTitle}>{item.title}</Text>
    <Text style={styles.stepDescription}>{item.description}</Text>
  </View>
);

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);

  const handleNext = () => {
    if (activeIndex < ONBOARDING_STEPS.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
      setActiveIndex(activeIndex + 1);
    } else {
      navigation.navigate('MainTabs');
    }
  };

  const handleSkip = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_STEPS}
        renderItem={OnboardingStep}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={({ nativeEvent }) => {
          const index = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
          setActiveIndex(index);
        }}
      />

      <View style={styles.paginationContainer}>
        {ONBOARDING_STEPS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={activeIndex === ONBOARDING_STEPS.length - 1 ? "Let's Go!" : 'Next'}
          onPress={handleNext}
          buttonStyle={styles.nextButton}
          titleStyle={styles.buttonText}
        />
        <Button
          title="Skip"
          onPress={handleSkip}  
          type="clear"
          titleStyle={[styles.buttonText, styles.skipButtonText]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
  },
  stepImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  stepTitle: {
    ...typography.h2,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  stepDescription: {
    ...typography.body,  
    marginTop: spacing.md,
    textAlign: 'center',
    color: colors.text.secondary,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,  
    backgroundColor: colors.border,
    marginHorizontal: spacing.xs,
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },  
  nextButton: {
    backgroundColor: colors.primary,
    marginBottom: spacing.md,
  },
  buttonText: {
    ...typography.button,
  },
  skipButtonText: {  
    color: colors.text.secondary,
  },
});
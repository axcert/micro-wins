import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { completeMicroStep, skipMicroStep, swapMicroStep } from '../redux/microStepSlice';
import { incrementCompletedSteps } from '../redux/progressSlice';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const TaskCompletionScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isCompleting, setIsCompleting] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const { currentMicroStep, microSteps } = useSelector((state) => state.microStep);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await dispatch(completeMicroStep(currentMicroStep.id));
      await dispatch(incrementCompletedSteps());
      setIsCompleting(false);
      // Show success animation
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error completing micro-step:', error);
      setIsCompleting(false);
    }
  };

  const handleSkip = async () => {
    try {
      await dispatch(skipMicroStep(currentMicroStep.id));
      navigation.navigate('Home');  
    } catch (error) {
      console.log('Error skipping micro-step:', error);
    }
  };

  const handleSwap = async () => {
    setIsSwapping(true);
    try {
      await dispatch(swapMicroStep(currentMicroStep.id));
      setIsSwapping(false);
    } catch (error) {
      console.log('Error swapping micro-step:', error);
      setIsSwapping(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.stepNumber}>{currentMicroStep.order} of {microSteps.length}</Text>
      <Text style={styles.title}>{currentMicroStep.title}</Text>
      <Text style={styles.description}>{currentMicroStep.description}</Text>
      
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Tips</Text>
        {currentMicroStep.tips.map((tip, index) => (
          <Text key={index} style={styles.tip}>- {tip}</Text>
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.button, isCompleting && styles.buttonLoading]}
        onPress={handleComplete}
        disabled={isCompleting}
      >
        <Text style={styles.buttonText}>{isCompleting ? 'Completing...' : 'Complete'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.swapButton, isSwapping && styles.buttonLoading]}
        onPress={handleSwap}
        disabled={isSwapping}
      >
        <Text style={styles.swapButtonText}>{isSwapping ? 'Getting New Task...' : 'Get New Task'}</Text>
      </TouchableOpacity>

      {isCompleting && (
        <LottieView
          source={require('../assets/animations/success.json')}
          autoPlay
          loop={false}
          style={styles.successAnimation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  stepNumber: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    marginBottom: 30,
  },
  tipsContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tip: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonLoading: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 15,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  swapButton: {
    backgroundColor: '#ccc',
    padding: 15, 
    borderRadius: 10,
    alignItems: 'center',
  },
  swapButtonText: {
    color: '#333',
    fontSize: 16,
  },
  successAnimation: {
    width: 200, 
    height: 200,
    alignSelf: 'center',
  },
});

export default TaskCompletionScreen;
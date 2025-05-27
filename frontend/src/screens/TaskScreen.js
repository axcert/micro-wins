import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { completeTask, skipTask, swapTask } from '../redux/goalSlice';
import SuccessAnimation from '../animations/SuccessAnimation';
import TipAccordion from '../components/TipAccordion';

const TaskScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  
  const { currentGoal, currentStep } = useSelector(state => state.goal);

  const handleComplete = async () => {
    setIsLoading(true);
    await dispatch(completeTask());
    setIsLoading(false);
    navigation.navigate('Home');
  };

  const handleSkip = () => {
    // TODO: Show confirmation dialog
    dispatch(skipTask());
  };

  const handleSwap = () => {
    dispatch(swapTask());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>
        {currentStep.order} of {currentGoal.target_days}
      </Text>
      <Text style={styles.titleText}>{currentStep.title}</Text>
      <Text style={styles.descriptionText}>{currentStep.description}</Text>
      
      <TipAccordion tips={currentStep.tips} />
      
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonLoading]} 
        onPress={handleComplete}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Loading...' : 'Complete'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={handleSkip}>
        <Text style={styles.linkText}>Skip</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={handleSwap}>
        <Text style={styles.linkText}>Swap Task</Text>
      </TouchableOpacity>

      <SuccessAnimation visible={!isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  stepText: {
    fontSize: 18,
    color: '#888',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonLoading: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default TaskScreen;
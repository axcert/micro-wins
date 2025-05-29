import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native'; 
import { useRoute } from '@react-navigation/native';
import { fetchGoalStatus, fetchGoalMicroSteps, overrideGoalMicroSteps } from '../services/api/goalService';
import { MicroStep } from '../types/GoalTypes';
import MicroStepCard from '../components/MicroStepCard';
import CustomButton from '../components/CustomButton';

const GoalReviewScreen: React.FC = () => {
  
  const route = useRoute();
  const { goalId } = route.params as { goalId: string };

  const [status, setStatus] = useState<'processing' | 'completed'>('processing');
  const [microSteps, setMicroSteps] = useState<MicroStep[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentStatus = await fetchGoalStatus(goalId);
        setStatus(currentStatus);

        if (currentStatus === 'completed') {
          const steps = await fetchGoalMicroSteps(goalId);
          setMicroSteps(steps);
        }

      } catch (err) {
        console.error('Error fetching goal data:', err);
        // TODO: show error UI 
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [goalId]);

  const handleManualOverride = async (updatedSteps: MicroStep[]) => {
    try {
      await overrideGoalMicroSteps(goalId, updatedSteps);
      setMicroSteps(updatedSteps);
    } catch (err) {
      console.error('Error overriding micro-steps:', err); 
      // TODO: show error message
    }
  };

  const handleStart = () => {
    // TODO: navigate to goal tracking screen
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Loading goal details...</Text>
      </View>  
    );
  }

  if (status === 'processing') {
    return (
      <View>
        <Text>Your goal is being processed...</Text>
        <Text>This may take a few minutes.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Review Your Goal Steps</Text>
      <FlatList
        data={microSteps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MicroStepCard 
            step={item}
            onEdit={(updatedStep) => {
              const updatedSteps = microSteps.map(s => 
                s.id === updatedStep.id ? updatedStep : s  
              );
              handleManualOverride(updatedSteps);
            }}
          />
        )}
      />
      <CustomButton onPress={handleStart} title="Start Goal" />
    </View>
  );
};

export default GoalReviewScreen;
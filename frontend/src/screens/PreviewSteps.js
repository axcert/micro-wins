import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const PreviewSteps = () => {
  const { currentGoal, generatedSteps } = useSelector((state) => state.goals);
  const navigation = useNavigation();

  const renderStep = ({ item, index }) => (
    <View style={styles.step}>
      <Text style={styles.stepTitle}>{index + 1}. {item.title}</Text>
      <Text>{item.description}</Text>  
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentGoal?.title}</Text>
      
      <FlatList
        data={generatedSteps}
        renderItem={renderStep}
        keyExtractor={(item) => item.id}
      />

      <Button 
        title="Start Goal"
        onPress={() => navigation.navigate('Home')}
      />
      
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  step: {
    marginBottom: 20,
  },
  stepTitle: {
    fontWeight: 'bold',
  },
});

export default PreviewSteps;
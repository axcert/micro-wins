import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProgressData, exportProgress, shareProgress } from '../redux/progressSlice';
import ProgressCalendar from '../components/ProgressCalendar';
import ProgressChart from '../components/ProgressChart';
import StreakStats from '../components/StreakStats';
import CompletionRate from '../components/CompletionRate';

const ProgressScreen = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);
  const isLoading = useSelector(state => state.progress.isLoading);

  useEffect(() => {
    dispatch(fetchProgressData(userId));
  }, [dispatch, userId]);

  const handleExport = async () => {
    try {
      const exportUrl = await dispatch(exportProgress(userId)).unwrap();
      // Initiate file download
      // ...
    } catch (error) {
      console.log('Export error:', error);
    }
  };

  const handleShare = async () => {
    try {
      const imageUrl = await dispatch(shareProgress(userId)).unwrap();
      await Share.share({
        url: imageUrl,
        message: 'Check out my goal progress!',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading progress...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressCalendar />
      <ProgressChart />
      <StreakStats />
      <CompletionRate />
      <TouchableOpacity style={styles.button} onPress={handleExport}>
        <Text style={styles.buttonText}>Export Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Share Progress</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ProgressScreen;
// ... existing imports ...
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchTodaysTask, completeTask, skipTask, swapTask } from '../store/slices/taskSlice';
import Lottie from 'lottie-react-native';
import celebrationAnimation from '../assets/animations/celebration.json';

const TaskScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todaysTask, isLoading, error } = useAppSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchTodaysTask());
  }, [dispatch]);

  const handleComplete = () => {
    if (todaysTask) {
      dispatch(completeTask(todaysTask.id));
      // Trigger celebration animation
    }
  };

  const handleSkip = () => {
    if (todaysTask) {
      dispatch(skipTask(todaysTask.id));
    }
  };

  const handleSwap = () => {
    if (todaysTask) {
      dispatch(swapTask(todaysTask.id));
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View>
      {todaysTask && (
        <>
          <Text>{todaysTask.title}</Text>
          <Text>{todaysTask.description}</Text>
          {todaysTask.completed ? (
            <Lottie source={celebrationAnimation} autoPlay loop />
          ) : (
            <>
              <Button title="Complete" onPress={handleComplete} />
              <Button title="Skip" onPress={handleSkip} />
              <Button title="Swap" onPress={handleSwap} />  
            </>
          )}
        </>
      )}
    </View>
  );
};

export default TaskScreen;
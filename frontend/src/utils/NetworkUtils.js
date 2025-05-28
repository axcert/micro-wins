import NetInfo from '@react-native-community/netinfo';

export const isNetworkAvailable = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};
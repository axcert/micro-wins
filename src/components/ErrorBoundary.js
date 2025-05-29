import React from 'react';
import { View, Text } from 'react-native';
import * as Sentry from '@sentry/react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="bg-red-100 p-4">
          <Text className="text-red-800 text-lg mb-2">Something went wrong.</Text>
          <Text className="text-red-600">We have been notified and are working on a fix. Please try again later.</Text>
        </View>
      );
    }

    return this.props.children; 
  }
}

export default Sentry.wrap(ErrorBoundary);
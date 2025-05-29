import React from 'react';
import * as Sentry from '@sentry/react-native';
import { View, Text, Button } from 'react-native';
import { colors, typography } from './constants/theme';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error);
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Text style={{ ...typography.h2, color: colors.error, marginBottom: 16 }}>Oops, something went wrong!</Text>
          <Text style={{ ...typography.body, marginBottom: 24, textAlign: 'center' }}>
            The app ran into an unexpected issue. Our team has been notified and we're working to fix the problem.
          </Text>
          <Button title="Retry" onPress={() => this.setState({ hasError: false })} />
        </View>
      );
    }

    return this.props.children; 
  }
}
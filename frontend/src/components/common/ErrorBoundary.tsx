import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Sentry from '@sentry/react-native';

import { colors, typography } from '../../constants/styles';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error);
    Sentry.captureMessage(JSON.stringify(errorInfo));
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[typography.h2, { color: colors.error, marginBottom: 16 }]}>
            Oops! Something went wrong.
          </Text>
          <Text style={[typography.body, { marginBottom: 32, textAlign: 'center' }]}>
            We apologize for the inconvenience. Our team has been notified and is working on a fix.
          </Text>
          <Button title="Retry" onPress={() => this.setState({ hasError: false })} />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
import React, { Component, ReactNode, ErrorInfo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import * as Sentry from '@sentry/react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '@/constants/theme';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isOffline: boolean;
  retryCount: number;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private unsubscribeNetInfo: (() => void) | null = null;
  private maxRetries = 3;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isOffline: false,
      retryCount: 0,
    };
  }

  componentDidMount() {
    // Monitor network connectivity
    this.unsubscribeNetInfo = NetInfo.addEventListener(state => {
      this.setState({ isOffline: !state.isConnected });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeNetInfo) {
      this.unsubscribeNetInfo();
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to console in development
    if (__DEV__) {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Log to Sentry
    Sentry.withScope(scope => {
      scope.setContext('errorBoundary', {
        componentStack: errorInfo.componentStack,
        props: this.props,
      });
      scope.setLevel('error');
      Sentry.captureException(error);
    });

    // Store error details
    this.setState({
      error,
      errorInfo,
    });

    // Save error to AsyncStorage for debugging
    this.saveErrorToStorage(error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private async saveErrorToStorage(error: Error, errorInfo: ErrorInfo) {
    try {
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      };

      const existingErrors = await AsyncStorage.getItem('app_errors');
      const errors = existingErrors ? JSON.parse(existingErrors) : [];
      errors.push(errorData);

      // Keep only last 10 errors
      if (errors.length > 10) {
        errors.shift();
      }

      await AsyncStorage.setItem('app_errors', JSON.stringify(errors));
    } catch (e) {
      console.error('Failed to save error to storage:', e);
    }
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    });
  };

  private handleRetry = async () => {
    const { retryCount } = this.state;

    if (retryCount >= this.maxRetries) {
      Alert.alert(
        'Maximum Retries Reached',
        'We\'ve tried multiple times but the error persists. Please restart the app.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    // Check network connectivity before retry
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    this.setState(
      prevState => ({
        retryCount: prevState.retryCount + 1,
      }),
      () => {
        // Add breadcrumb for retry attempt
        Sentry.addBreadcrumb({
          message: `Retry attempt ${this.state.retryCount}`,
          level: 'info',
          category: 'error-boundary',
        });

        this.handleReset();
      }
    );
  };

  private handleReportError = () => {
    const { error, errorInfo } = this.state;

    Alert.alert(
      'Report Error',
      'Would you like to send an error report to help us fix this issue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send Report',
          onPress: () => {
            Sentry.withScope(scope => {
              scope.setTag('user-reported', true);
              scope.setContext('userReport', {
                error: error?.message,
                componentStack: errorInfo?.componentStack,
                timestamp: new Date().toISOString(),
              });
              Sentry.captureMessage('User reported error from boundary', 'error');
            });

            Alert.alert(
              'Thank You',
              'Your error report has been sent. We\'ll work on fixing this issue.',
              [{ text: 'OK', style: 'default' }]
            );
          },
        },
      ]
    );
  };

  private renderErrorFallback() {
    const { error, isOffline, retryCount } = this.state;
    const { fallback } = this.props;

    // Use custom fallback if provided
    if (fallback && error) {
      return fallback(error, this.handleRetry);
    }

    // Default error UI
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.errorContainer}>
            <Icon
              name={isOffline ? 'cloud-offline' : 'warning'}
              size={80}
              color={colors.error}
              style={styles.errorIcon}
            />

            <Text style={styles.errorTitle}>
              {isOffline ? 'You\'re Offline' : 'Oops! Something went wrong'}
            </Text>

            <Text style={styles.errorMessage}>
              {isOffline
                ? 'Please check your internet connection and try again.'
                : error?.message || 'An unexpected error occurred. We\'re sorry for the inconvenience.'}
            </Text>

            {retryCount > 0 && (
              <Text style={styles.retryCount}>
                Retry attempts: {retryCount}/{this.maxRetries}
              </Text>
            )}

            <View style={styles.actionContainer}>
              <Button
                title="Try Again"
                onPress={this.handleRetry}
                buttonStyle={styles.primaryButton}
                titleStyle={styles.buttonText}
                icon={
                  <Icon
                    name="refresh"
                    size={20}
                    color={colors.text.inverse}
                    style={{ marginRight: spacing.xs }}
                  />
                }
                disabled={retryCount >= this.maxRetries}
              />

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={this.handleReportError}
              >
                <Text style={styles.secondaryButtonText}>Report Issue</Text>
              </TouchableOpacity>
            </View>

            {__DEV__ && error && (
              <View style={styles.debugContainer}>
                <Text style={styles.debugTitle}>Debug Info:</Text>
                <Text style={styles.debugText}>{error.stack}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return this.renderErrorFallback();
    }

    return children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  errorIcon: {
    marginBottom: spacing.lg,
  },
  errorTitle: {
    ...typography.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  errorMessage: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  retryCount: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.md,
  },
  actionContainer: {
    width: '100%',
    maxWidth: 300,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  buttonText: {
    ...typography.button,
    color: colors.text.inverse,
  },
  secondaryButton: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  debugContainer: {
    marginTop: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.sm,
    width: '100%',
  },
  debugTitle: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.xs,
  },
  debugText: {
    ...typography.caption,
    color: colors.text.muted,
    fontFamily: 'monospace',
  },
});
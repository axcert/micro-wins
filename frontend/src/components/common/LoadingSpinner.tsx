```tsx
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../constants/theme';

const LoadingSpinner: React.FC = () => {
  return <ActivityIndicator size="large" color={colors.primary} />;
};

export default LoadingSpinner;
```
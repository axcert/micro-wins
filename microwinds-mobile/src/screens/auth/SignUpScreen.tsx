import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { colors, spacing, typography } from '@/constants/theme';
import { signUp } from '@/services/auth';

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormData>();

  const password = watch('password');

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUp(data.email, data.password);
      navigation.replace('Onboarding');
    } catch (error) {
      Alert.alert('Sign up failed', 'An error occurred while creating your account. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
        name="email"
        rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            secureTextEntry
          />
        )}
        name="password"
        rules={{ required: 'Password is required', minLength: 8 }}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Confirm Password" 
            secureTextEntry
          />
        )}
        name="confirmPassword"
        rules={{ 
          required: 'Please confirm your password',
          validate: value => value === password || 'Passwords do not match',
        }}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Sign Up</Text>  
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.footerLink} onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Text>  
      </Text>
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  input: {
    ...typography.body,
    height: 48,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error, 
    marginBottom: spacing.md,
  },
  button: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...typography.button,
    color: colors.background,
  },
  footerText: {
    ...typography.body,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  footerLink: {
    color: colors.primary,
  },
});
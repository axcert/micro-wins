import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';
import { signIn } from '@/store/slices/authSlice';
import { colors, typography, spacing } from '@/constants/theme';

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInScreen() {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => {
    dispatch(signIn(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      
      <Controller
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.password}
            secureTextEntry
            style={styles.input}
          />
        )}
        name="password"
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Button 
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Sign In
      </Button>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  input: {
    marginBottom: spacing.sm,
  },
  error: {
    color: colors.error,
    marginBottom: spacing.sm,
  },
  button: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
  },
  buttonText: {
    ...typography.button,
    color: colors.text.inverse,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  footerLink: {
    ...typography.body,
    color: colors.primary,
  },
});
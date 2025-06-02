import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import { colors, spacing, typography } from '@/constants/theme';
import { signIn } from '@/store/slices/authSlice';

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => {
    dispatch(signIn(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            keyboardType="email-address"
            errorMessage={errors.email?.message}
          />
        )}
        name="email"
        rules={{ required: 'Email is required' }}
        defaultValue=""
      />

      <Controller 
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Password"
            onBlur={onBlur}  
            onChangeText={onChange}
            value={value}
            secureTextEntry
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
        rules={{ 
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        }}
        defaultValue=""
      />

      <Button 
        title="Sign In"
        onPress={handleSubmit(onSubmit)}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text onPress={() => navigation.navigate('SignUp')} style={styles.footerLink}>
            Sign Up
          </Text>
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background.primary,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
  },
  buttonText: {
    ...typography.button,
    color: colors.text.inverse,
  },
  footer: {
    marginTop: spacing.xxl,
    alignItems: 'center',
  },
  footerText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  footerLink: {
    color: colors.primary,
  },
});
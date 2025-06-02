import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import { colors, spacing, typography } from '@/constants/theme';
import { signUp } from '@/store/slices/authSlice';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormData>();
  const password = watch('password');
  
  const onSubmit = (data: SignUpFormData) => {
    dispatch(signUp(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

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
        rules={{ 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
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

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Confirm Password"
            onBlur={onBlur}  
            onChangeText={onChange}
            value={value}
            secureTextEntry
            errorMessage={errors.confirmPassword?.message}
          />
        )}
        name="confirmPassword"
        rules={{
          validate: value => value === password || 'The passwords do not match',
        }}  
        defaultValue=""
      />

      <Button
        title="Create Account"  
        onPress={handleSubmit(onSubmit)}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text onPress={() => navigation.navigate('SignIn')} style={styles.footerLink}>
            Sign In
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
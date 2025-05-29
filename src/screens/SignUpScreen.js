import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { colors } from '../constants/colors';

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    await dispatch(registerUser(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
        name="email"
        rules={{ required: true, pattern: /^\S+@\S+$/i }}
        defaultValue=""
      />
      {errors.email && <Text style={styles.error}>Please enter a valid email.</Text>}
      
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Password"
            secureTextEntry
          />
        )}
        name="password"
        rules={{ required: true, minLength: 8 }}
        defaultValue=""
      />
      {errors.password && <Text style={styles.error}>Password must be at least 8 characters.</Text>}
      
      <Button title="Sign Up" onPress={handleSubmit(onSubmit)} disabled={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: colors.error,
    marginBottom: 10,
  },
});

export default SignUpScreen;
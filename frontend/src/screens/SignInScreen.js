import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SPACING } from '../constants/design';

const SignInScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle sign in logic here
    console.log(data);
    navigation.replace('App');
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Sign In</Text>
      
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
            autoCapitalize="none"
            keyboardType="email-address"
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
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange} 
            value={value}
            errorMessage={errors.password?.message}
            secureTextEntry
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
        containerStyle={styles.button}
        onPress={handleSubmit(onSubmit)}
      />

      <Button 
        title="Create Account"
        type="clear"
        containerStyle={styles.button}
        titleStyle={styles.createAccountButton}
        onPress={() => navigation.navigate('SignUp')}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.lg,
    fontFamily: FONTS.bold,
  },
  button: {
    marginTop: SPACING.lg,
  },
  createAccountButton: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
});

export default SignInScreen;
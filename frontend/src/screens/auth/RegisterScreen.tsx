```tsx
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { register } from '../../services/api/authService';
import { colors, typography } from '../../constants/theme';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterScreen: React.FC = () => {
  const { control, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await register(data);
      // Navigate to login screen
    } catch (err) {
      console.error('Registration error:', err); 
      // Show error message
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Name"
          />
        )}
        name="name"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.name && <Text style={styles.error}>Name is required.</Text>}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.email && <Text style={styles.error}>Email is required.</Text>}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Password"
            secureTextEntry
          />
        )}
        name="password"
        rules={{ required: true, minLength: 8 }}
        defaultValue=""
      />
      {errors.password?.type === 'required' && (
        <Text style={styles.error}>Password is required.</Text>
      )}
      {errors.password?.type === 'minLength' && (
        <Text style={styles.error}>
          Password must be at least 8 characters.
        </Text>
      )}
      
      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1, 
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    ...typography.h1,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border, 
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: colors.error,
    marginBottom: 10,
  },
};

export default RegisterScreen;
```
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { register } from '../store/authSlice';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      await dispatch(register({ email, password })).unwrap();
      // Navigate to onboarding on successful registration 
      navigation.navigate('Onboarding');
    } catch (err) {
      console.error('Registration failed', err);
      // Show error message to user  
    }
  };

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="Email" 
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
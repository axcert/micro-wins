import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
      // Navigate to home screen on successful login
      navigation.navigate('Home'); 
    } catch (err) {
      console.error('Login failed', err);
      // Show error message to user
    }
  };

  return (
    <View>
      <Text>Sign In</Text>
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
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

export default SignInScreen;
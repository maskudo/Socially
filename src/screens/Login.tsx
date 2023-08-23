import {useState} from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import COLORS from '../constants/colors';
import {setUserFromAuth} from '../slices/userSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleEndEditing = () => {
    Keyboard.dismiss();
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log('User account created & logged in!');
        })
        .catch(err => {
          if (err.code === 'auth/user-not-found') {
            setError('User not found');
          }
          if (err.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
          }
        });
    }
    setPassword('');
    setEmail('');
  };
  return (
    <View>
      <Text>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder={'Email'}
        onChangeText={text => {
          setEmail(text);

          setError('');
        }}
        value={email}
        placeholderTextColor={COLORS.black}
      />
      <TextInput
        style={styles.textInput}
        placeholder={'Password'}
        onChangeText={text => {
          setPassword(text);
          setError('');
        }}
        value={password}
        placeholderTextColor={COLORS.black}
        blurOnSubmit={true}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button onPress={handleEndEditing} title={'Sign Up'} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    margin: 10,
    color: COLORS.black,
  },
  error: {
    color: '#ff0000',
  },
});

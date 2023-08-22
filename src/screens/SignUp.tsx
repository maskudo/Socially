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

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleEndEditing = () => {
    Keyboard.dismiss();
    if (email && password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') {
            setError('That email address is already in use!');
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
      <TextInput
        style={styles.textInput}
        placeholder={'Email'}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholderTextColor={COLORS.black}
      />
      <TextInput
        style={styles.textInput}
        placeholder={'Password'}
        onChangeText={text => setPassword(text)}
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

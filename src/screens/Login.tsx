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
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const handleEndEditing = () => {
    Keyboard.dismiss();
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Logging in');
        })
        .catch(err => {
          setError(err.code.split('/')[1]);
        });
    }
    setPassword('');
    setEmail('');
  };
  return (
    <View>
      <View style={styles.loginForm}>
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
        <Button onPress={handleEndEditing} title={'Login'} />
      </View>
      <View style={styles.signUp}>
        <Text>Don't have an account?</Text>
        <Button
          onPress={() => navigation.navigate('SignUp')}
          title={' Sign Up'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    marginVertical: 5,
    color: COLORS.black,
  },
  error: {
    color: '#ff0000',
  },
  loginForm: {
    padding: 10,
  },
  signUp: {
    padding: 10,
  },
});

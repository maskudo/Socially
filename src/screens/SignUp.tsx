import {useState} from 'react';
import {Button, Keyboard, StyleSheet, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import COLORS from '../constants/colors';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEndEditing = () => {
    Keyboard.dismiss();
    if (email && password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
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
});

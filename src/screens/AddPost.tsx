import {useNavigation} from '@react-navigation/native';
import {nanoid} from '@reduxjs/toolkit';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import {addPost} from '../slices/postSlice';

export default function AddPost({route}) {
  const {image} = route.params;
  const user = useSelector(state => state.user.handle);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const postImage = () => {
    const postId = nanoid();
    dispatch(addPost({postId, url: image.path, createBy: user}));
    navigation.navigate('Home');
  };
  return (
    <View>
      <Image source={{uri: image.path}} style={styles.image} />
      <TouchableOpacity onPress={postImage} style={styles.button}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
  },
  button: {
    margin: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
    alignItems: 'center',
    backgroundColor: COLORS.lightblue,
    borderRadius: 20,
  },
  buttonText: {
    ...TYPOGRAPHY.buttonRegular,
    fontSize: 20,
  },
});

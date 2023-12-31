import {useNavigation} from '@react-navigation/native';
import {nanoid} from '@reduxjs/toolkit';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import {addPost} from '../slices/postSlice';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {RootState} from '../store/store';

export default function AddPost({route}) {
  const {image} = route.params;
  const user = useSelector((state: RootState) => state?.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const postImage = async () => {
    const filename = nanoid().toString();
    const reference = storage().ref(filename);
    const postsCollection = firestore().collection('Posts');
    const fileRef = storage().ref(filename);
    await fileRef.putFile(image.path);
    let download_link = await reference.getDownloadURL();
    const postRef = await postsCollection.add({
      url: download_link,
      createdAt: firestore.Timestamp.now().toDate(),
      createdBy: user.handle,
      comments: [],
      likes: [],
      saves: [],
    });
    const post = await postRef.get();
    dispatch(
      addPost({
        ...post.data,
        id: post.id,
      }),
    );
    const userRef = firestore().collection('Users').doc(user.id);
    try {
      await userRef.update({
        posts: firestore.FieldValue.arrayUnion(post.id),
      });
    } catch (e) {
      fileRef.delete();
    }
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

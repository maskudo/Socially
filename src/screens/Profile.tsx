import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {PostProps} from '../components/common/Post';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import {RootState} from '../store/store';
import {getPostsByUser} from '../utils/functions';
import storage from '@react-native-firebase/storage';
import {nanoid} from '@reduxjs/toolkit';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  updateUserFollowing,
  updateUserProfilePicture,
} from '../slices/userSlice';
import {defaultProfilePic} from '../constants/images';
import firestore from '@react-native-firebase/firestore';

export default function Profile({route}) {
  const currentUser = useSelector((state: RootState) => state?.user);
  const otherUser = route?.params?.otherUser;
  const user = otherUser ?? currentUser;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleClickBookmark = () => navigation.navigate('Bookmarks');

  const handleClickProfileImage = async () => {
    const image = await ImageCropPicker.openPicker({
      cropping: false,
    });
    const filename = nanoid().toString();
    const reference = storage().ref(filename);
    const fileRef = storage().ref(filename);
    await fileRef.putFile(image.path);
    const download_link = await reference.getDownloadURL();
    dispatch(
      updateUserProfilePicture({
        imageUrl: download_link,
        userId: user.id,
        callback: () => fileRef.delete(),
      }),
    );
  };
  const [posts, setPosts] = useState<PostProps[]>([]);
  const getPosts = useCallback(async () => {
    if (user?.handle) {
      const fetchedPosts = await getPostsByUser(user.handle);
      setPosts(fetchedPosts);
    }
  }, [user]);

  const handleClickFollow = async () => {
    let otherUserRef = await firestore()
      .collection('Users')
      .where('handle', '==', otherUser.handle)
      .get();
    if (otherUser.followers.includes(currentUser.handle)) {
      otherUserRef.docs[0].ref
        .update({
          followers: firestore.FieldValue.arrayRemove(currentUser.handle),
        })
        .then(() => {
          otherUser.followers = otherUser.followers.filter(
            item => item != currentUser.handle,
          );
          dispatch(
            updateUserFollowing({
              userId: currentUser.id,
              otherUserHandle: otherUser.handle,
              add: false,
            }),
          );
        });
      return;
    }
    otherUserRef.docs[0].ref
      .update({
        followers: firestore.FieldValue.arrayUnion(currentUser.handle),
      })
      .then(() => {
        otherUser.followers.push(currentUser.handle);
        dispatch(
          updateUserFollowing({
            userId: currentUser.id,
            otherUserHandle: otherUser.handle,
            add: true,
          }),
        );
      });
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <View style={styles.container}>
      <View style={styles.blueContainer} />
      <FlatList
        style={styles.postsContainer}
        data={posts}
        numColumns={2}
        columnWrapperStyle={styles.column}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: {item: PostProps}) => (
          <View style={styles.postImageContainer}>
            <Image
              source={{uri: item.url}}
              resizeMode="cover"
              style={styles.postImage}
            />
          </View>
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View>
            <View style={styles.profile}>
              <View style={styles.imageContainerOutline}>
                <Pressable
                  style={styles.imageContainer}
                  onPress={handleClickProfileImage}>
                  <Image
                    source={{uri: user.url ?? defaultProfilePic}}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                </Pressable>
              </View>
              <Text style={styles.name}>
                {user.displayName ?? user.email?.split('@')[0]}
              </Text>
              <Text style={styles.handle}>
                @{user.handle ?? user.email?.split('@')[0]}
              </Text>
            </View>
            <View style={styles.statistics}>
              <View>
                <Text style={styles.stat}>Posts</Text>
                <Text style={styles.number}>{user?.posts?.length ?? 0}</Text>
              </View>
              <View>
                <Text style={styles.stat}>Followers</Text>
                <Text style={styles.number}>
                  {user?.followers?.length ?? 0}
                </Text>
              </View>
              <View>
                <Text style={styles.stat}>Follows</Text>
                <Text style={styles.number}>
                  {user?.following?.length ?? 0}
                </Text>
              </View>
            </View>
            <View style={styles.postIcons}>
              <TouchableOpacity>
                <Feather name={'image'} size={25} color={COLORS.black} />
              </TouchableOpacity>
              {user === currentUser && (
                <TouchableOpacity onPress={handleClickBookmark}>
                  <Feather name={'bookmark'} size={25} color={COLORS.black} />
                </TouchableOpacity>
              )}
              {user !== currentUser && (
                <TouchableOpacity onPress={handleClickFollow}>
                  {currentUser.following.includes(user.handle) ? (
                    <Feather
                      name={'user-minus'}
                      size={25}
                      color={COLORS.black}
                    />
                  ) : (
                    <Feather
                      name={'user-plus'}
                      size={25}
                      color={COLORS.black}
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    position: 'relative',
    backgroundColor: COLORS.white,
    flex: 1,
  },
  profile: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    ...TYPOGRAPHY.h2Bold,
  },
  handle: {
    ...TYPOGRAPHY.bodyRegular,
    color: 'gray',
  },
  statistics: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 40,
  },
  stat: {
    ...TYPOGRAPHY.bodyRegular,
    color: 'gray',
  },
  number: {
    textAlign: 'center',
    ...TYPOGRAPHY.h2Bold,
  },
  profileImage: {
    position: 'absolute',
    transform: [{rotate: '-45deg'}],
    width: 120,
    height: 120,
  },
  imageContainer: {
    position: 'relative',
    width: 90,
    height: 90,
    borderRadius: 35,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainerOutline: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 35,
    transform: [{rotate: '45deg'}],
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  blueContainer: {
    position: 'absolute',
    width: 400,
    height: 400,
    top: -150,
    left: -10,
    borderRadius: 152,
    borderWidth: 0.5,
    borderColor: COLORS.lightgray,
    backgroundColor: COLORS.lightblue,
    transform: [{rotate: '-45deg'}],
  },
  postsContainer: {
    display: 'flex',
    padding: 10,
  },
  postImageContainer: {},
  postImage: {
    width: 160,
    height: 225,
    borderRadius: 20,
  },
  column: {
    gap: 10,
    marginVertical: 10,
  },
});

import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Post from '../components/common/Post';
import Icon from 'react-native-vector-icons/Feather';
import TYPOGRAPHY from '../constants/typography';
import FONTS from '../constants/fonts';
import COLORS from '../constants/colors';
import {buttonAddStory, defaultProfilePic, face1} from '../constants/images';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {User} from '../slices/userSlice';

export default function Homepage() {
  const posts = useSelector(state => state?.post);
  const tabBarHeight = useBottomTabBarHeight() + 25;
  const [stories, setStories] = useState<User[]>([]);
  useEffect(() => {
    const fetchStories = async () => {
      let users = await firestore().collection('Users').get();
      users = users.docs;
      const fetchedStories: User[] = [];
      users.forEach(user => {
        fetchedStories.push({...user.data(), id: user.id});
      });
      console.log({fetchedStories});
      setStories(fetchedStories);
    };
    fetchStories();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.blueContainer} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Socially</Text>
        <TouchableOpacity onPress={() => auth().signOut()}>
          <Icon name={'log-out'} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={[styles.postContainer, {marginBottom: tabBarHeight}]}
        data={posts}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Post post={item} />}
        ListHeaderComponent={
          <View>
            <Text style={styles.feed}>Feed</Text>
            <FlatList
              style={styles.storyContainer}
              data={stories}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {}}
                  key={item.id}
                  style={styles.storyButton}>
                  <ImageBackground
                    source={{uri: item.url || defaultProfilePic}}
                    resizeMode="cover"
                    style={styles.storyButtonImage}
                  />
                </TouchableOpacity>
              )}
              ListHeaderComponent={
                <TouchableOpacity onPress={() => {}} style={styles.storyButton}>
                  <ImageBackground
                    source={buttonAddStory}
                    resizeMode="contain"
                    style={styles.storyButtonImage}
                  />
                </TouchableOpacity>
              }
            />
          </View>
        }
        keyExtractor={item => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    position: 'relative',
    backgroundColor: COLORS.white,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '10%',
  },
  headerText: {
    ...TYPOGRAPHY.bodyRegular,
    fontFamily: FONTS.fontBold,
  },
  headerIcon: {
    ...TYPOGRAPHY.h3,
  },
  feed: {
    ...TYPOGRAPHY.h2Bold,
  },
  storyContainer: {
    marginVertical: 20,
  },
  storyButton: {
    height: 56,
    width: 56,
    marginRight: 30,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.blue,
    overflow: 'hidden',
  },
  storyButtonImage: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    height: 400,
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    borderRadius: 20,
  },
  postContainer: {
    display: 'flex',
  },
  blueContainer: {
    position: 'absolute',
    width: 680,
    height: 470,
    left: -275,
    top: 10,
    borderRadius: 152,
    borderWidth: 0.5,
    borderColor: COLORS.lightgray,
    backgroundColor: COLORS.lightblue,
    transform: [{rotate: '-45deg'}],
  },
});

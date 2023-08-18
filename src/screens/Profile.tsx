import {useNavigation} from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import COLORS from '../constants/colors';
import {face1, postImage} from '../constants/images';
import TYPOGRAPHY from '../constants/typography';
export default function Profile() {
  const user = useSelector(state => state?.user);
  const navigation = useNavigation();
  const handleClickBookmark = () => navigation.navigate('Bookmarks');
  return (
    <View style={styles.container}>
      <View style={styles.blueContainer} />
      <FlatList
        style={styles.postsContainer}
        data={[1, 2, 3, 4, 5]}
        numColumns={2}
        columnWrapperStyle={styles.column}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.postImageContainer}>
            <Image
              source={postImage}
              resizeMode="cover"
              style={styles.postImage}
            />
          </View>
        )}
        keyExtractor={item => item}
        ListHeaderComponent={
          <View>
            <View style={styles.profile}>
              <View style={styles.imageContainerOutline}>
                <View style={styles.imageContainer}>
                  <Image
                    source={face1}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.handle}>@{user.handle}</Text>
            </View>
            <View style={styles.statistics}>
              <View>
                <Text style={styles.stat}>Posts</Text>
                <Text style={styles.number}>{user?.posts.length}</Text>
              </View>
              <View>
                <Text style={styles.stat}>Followers</Text>
                <Text style={styles.number}>{user?.followers.length}</Text>
              </View>
              <View>
                <Text style={styles.stat}>Follows</Text>
                <Text style={styles.number}>{user?.following.length}</Text>
              </View>
            </View>
            <View style={styles.postIcons}>
              <TouchableOpacity>
                <Feather name={'image'} size={25} color={COLORS.black} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClickBookmark}>
                <Feather name={'bookmark'} size={25} color={COLORS.black} />
              </TouchableOpacity>
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

import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Post from '../components/common/Post';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import {POST} from '../utils/data';
export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.blueContainer} />
      <FlatList
        style={styles.postsContainer}
        data={[1, 2, 3, 4, 5]}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
        renderItem={() => <Post post={POST} />}
        keyExtractor={item => item}
        ListHeaderComponent={
          <View>
            <View style={styles.profile}>
              <View style={styles.imageContainerOutline}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../assets/img/profile/face.jpg')}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <Text style={styles.name}>Jane Doe</Text>
              <Text style={styles.handle}>@janedoe</Text>
            </View>
            <View style={styles.statistics}>
              <View>
                <Text style={styles.stat}>Posts</Text>
                <Text style={styles.number}>35</Text>
              </View>
              <View>
                <Text style={styles.stat}>Followers</Text>
                <Text style={styles.number}>123</Text>
              </View>
              <View>
                <Text style={styles.stat}>Follows</Text>
                <Text style={styles.number}>654</Text>
              </View>
            </View>
            <View style={styles.postIcons}>
              <Feather name={'image'} size={25} color={COLORS.black} />
              <Feather name={'bookmark'} size={25} color={COLORS.black} />
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
  },
});

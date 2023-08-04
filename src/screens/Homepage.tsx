import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Post from '../components/common/Post';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import TYPOGRAPHY from '../constants/typography';
import FONTS from '../constants/fonts';
import COLORS from '../constants/colors';
import {nanoid} from 'nanoid';

const post = {
  createdAt: '2 Hours ago',
  createBy: 'Dennis Reynolds',
  comments: ['hello', 'world'],
  likes: ['apar', 'praful'],
  saves: ['apar', 'praful'],
};
const posts = [nanoid(), nanoid(), nanoid(), nanoid(), nanoid()];
export default function Homepage() {
  return (
    <View style={styles.container}>
      <View style={styles.blueContainer} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Socially</Text>
        <FontAwesomeIcon name={'bell'} style={styles.headerIcon} solid />
      </View>
      <Text style={styles.feed}>Feed</Text>
      <FlatList
        style={styles.postContainer}
        data={[1, 2, 3, 4, 5]}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
        renderItem={() => <Post post={post} />}
        ListHeaderComponent={
          <View style={styles.storyContainer}>
            <TouchableOpacity onPress={() => {}} style={styles.storyButton}>
              <ImageBackground
                source={require('../../assets/img/common/ButtonAddStory.png')}
                resizeMode="contain"
                style={styles.storyButtonImage}
              />
            </TouchableOpacity>
            {posts.map(elem => (
              <TouchableOpacity
                onPress={() => {}}
                key={elem}
                style={styles.storyButton}>
                <ImageBackground
                  source={require('../../assets/img/profile/face.jpg')}
                  resizeMode="cover"
                  style={styles.storyButtonImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        }
        keyExtractor={item => item}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    position: 'relative',
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
    marginVertical: 25,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyButton: {
    height: 56,
    width: 56,
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
    marginBottom: 150,
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

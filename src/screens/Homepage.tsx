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
import {buttonAddStory, face1} from '../constants/images';
import {useSelector} from 'react-redux';

const stories = [nanoid(), nanoid(), nanoid(), nanoid(), nanoid()];
export default function Homepage() {
  const posts = useSelector(state => state?.post);
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
        data={posts}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Post post={item} />}
        ListHeaderComponent={
          <FlatList
            style={styles.storyContainer}
            data={stories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {}}
                key={item}
                style={styles.storyButton}>
                <ImageBackground
                  source={face1}
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

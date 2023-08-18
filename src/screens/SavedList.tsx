import {FlatList, StyleSheet, Text, View} from 'react-native';
import Post from '../components/common/Post';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import TYPOGRAPHY from '../constants/typography';
import FONTS from '../constants/fonts';
import COLORS from '../constants/colors';
import {useSelector} from 'react-redux';

export default function SavedList() {
  const postIds = useSelector(state => state?.user?.savedPosts);
  const allPosts = useSelector(state => state?.post);
  const posts = allPosts.filter(post => postIds.includes(post.id));
  return (
    <View style={styles.container}>
      <View style={styles.blueContainer} />
      <View style={styles.header}>
        <Text style={styles.feed}>Saved Posts</Text>
      </View>
      <FlatList
        style={styles.postContainer}
        data={posts}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Post post={item} />}
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

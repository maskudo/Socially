import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../constants/colors';
import {buttonOptions, face3, postImage} from '../../constants/images';
import TYPOGRAPHY from '../../constants/typography';
import {updatePostLikes, updatePostSaves} from '../../slices/postSlice';
import {likePost, savePost} from '../../slices/userSlice';
import RoundedAvatar from './RoundedAvatar';

export type PostProps = {
  id: string;
  createdAt: string;
  createBy: string;
  comments: string[];
  likes: string[];
  saves: string[];
};
export default function Post({post}: {post: PostProps}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user);
  const handleSave = () => {
    dispatch(savePost(post.id));
    dispatch(updatePostSaves({postId: post.id, userId: user.handle}));
  };
  const handleLike = () => {
    dispatch(likePost(post.id));
    dispatch(updatePostLikes({postId: post.id, userId: user.handle}));
  };
  return (
    <View style={styles.postContainer}>
      <Image source={postImage} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.topLeft}>
            <RoundedAvatar
              dimension={40}
              styles={{borderColor: 'grey'}}
              image={face3}
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{post.createBy}</Text>
              <Text style={styles.text}>{post.createdAt}</Text>
            </View>
          </View>
          <View style={styles.topRight}>
            <Image source={buttonOptions} />
          </View>
          <View />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.pill}>
            <TouchableOpacity onPress={handleLike}>
              <Icon
                name="heart"
                size={18}
                color={COLORS.white}
                style={styles.pillIcon}
              />
            </TouchableOpacity>
            <Text style={styles.pillText}>{post.likes.length}</Text>
          </View>
          <View style={styles.pill}>
            <TouchableOpacity>
              <Icon
                name="message-square"
                size={18}
                color={COLORS.white}
                style={styles.pillIcon}
              />
            </TouchableOpacity>
            <Text style={styles.pillText}>{post.comments.length}</Text>
          </View>
          <View style={styles.pill}>
            <TouchableOpacity onPress={handleSave}>
              <Icon
                name="bookmark"
                size={18}
                color={COLORS.white}
                style={styles.pillIcon}
              />
            </TouchableOpacity>
            <Text style={styles.pillText}>{post.saves.length}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  postContainer: {
    position: 'relative',
    width: 350,
    height: 290,
    marginBottom: 32,
  },
  image: {
    position: 'absolute',
    borderRadius: 20,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
    justifyContent: 'space-between',
    height: '100%',
  },
  text: {
    ...TYPOGRAPHY.captions,
    color: COLORS.white,
  },
  textRight: {
    color: COLORS.white,
    flex: 1,
    textAlign: 'right',
    fontSize: 30,
    borderWidth: 1,
  },
  textContainer: {},
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 10,
  },
  pill: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(229, 229, 229, 0.4)',
    width: 70,
    height: 28,
    borderRadius: 35,
  },
  pillText: {
    ...TYPOGRAPHY.captions,
    color: COLORS.white,
    textAlign: 'center',
  },
});

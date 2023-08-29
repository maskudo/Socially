import moment from 'moment';
import {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../constants/colors';
import {defaultProfilePic} from '../../constants/images';
import TYPOGRAPHY from '../../constants/typography';
import {
  deletePost,
  updatePostLikes,
  updatePostSaves,
} from '../../slices/postSlice';
import {updateUserLikes, updateUserSaves} from '../../slices/userSlice';
import RoundedAvatar from './RoundedAvatar';

export type PostProps = {
  id: string;
  url?: string;
  createdAt: string;
  createdBy: string;
  comments: string[];
  likes: string[];
  saves: string[];
};

// TODO: red heart when post liked
export default function Post({post}: {post: PostProps}) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(state => state?.user);
  const createdAt = moment(post.createdAt).fromNow();
  const handleSave = () => {
    dispatch(
      updateUserSaves({
        postId: post.id,
        userId: user.id,
        add: !user.savedPosts.includes(post.id),
      }),
    );
    dispatch(
      updatePostSaves({
        postId: post.id,
        userId: user.handle,
        add: !post.saves.includes(user.handle),
      }),
    );
  };
  const handleLike = () => {
    dispatch(
      updateUserLikes({
        postId: post.id,
        userId: user.id,
        add: !user.likedPosts.includes(post.id),
      }),
    );
    dispatch(
      updatePostLikes({
        postId: post.id,
        userId: user.handle,
        add: !post.likes.includes(user.handle),
      }),
    );
  };
  const handleDeletePost = () => {
    dispatch(deletePost(post.id));
    setModalVisible(!modalVisible);
  };
  // TODO: replace user with the createdBy user of the post
  return (
    <View style={styles.postContainer}>
      <Image source={{uri: post.url}} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.topLeft}>
            <RoundedAvatar
              dimension={40}
              styles={{borderColor: 'grey'}}
              image={{uri: user.url ?? defaultProfilePic}}
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{post.createdBy}</Text>
              <Text style={styles.text}>{createdAt}</Text>
            </View>
          </View>
          <View style={styles.topRight}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Icon
                name="more-vertical"
                size={18}
                color={COLORS.white}
                style={styles.pillIcon}
              />
            </TouchableOpacity>
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
                style={[styles.pillIcon]}
              />
            </TouchableOpacity>
            <Text style={styles.pillText}>{post?.likes?.length}</Text>
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
            <Text style={styles.pillText}>{post?.comments?.length}</Text>
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
            <Text style={styles.pillText}>{post?.saves?.length}</Text>
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.bottomView}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.textStyle}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.textStyle}>Turn Off Commenting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.textStyle}>Edit</Text>
            </TouchableOpacity>
            {user.handle === post.createdBy && (
              <TouchableOpacity
                style={[styles.button]}
                onPress={handleDeletePost}>
                <Text style={{...styles.textStyle, ...styles.deletePostText}}>
                  Delete{' '}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
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
  pillIcon: {},
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    width: '98%',
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  button: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightgray,
  },
  deletePostText: {
    color: '#FF0000',
  },
  textStyle: {
    ...TYPOGRAPHY.bodyRegular,
    padding: 10,
    color: COLORS.blue,
    textAlign: 'center',
  },
});

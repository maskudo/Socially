import {Image, StyleSheet, Text, View} from 'react-native';
import COLORS from '../../constants/colors';
import {buttonOptions, face3, postImage} from '../../constants/images';
import TYPOGRAPHY from '../../constants/typography';
import RoundedAvatar from './RoundedAvatar';

export type PostProps = {
  createdAt: string;
  createBy: string;
  comments: string[];
  likes: string[];
  saves: string[];
};
export default function Post({post}: {post: PostProps}) {
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
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  postContainer: {
    position: 'relative',
    width: 350,
    height: 290,
    marginBottom: 10,
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
});

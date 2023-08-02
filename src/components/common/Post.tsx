import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
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
    <View style={styles.imageContainer}>
      <ImageBackground
        source={require('../../../assets/img/home/post.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.topLeft}>
              <RoundedAvatar
                dimension={40}
                styles={{borderColor: 'grey'}}
                image={require('../../../assets/img/splash/main.png')}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{post.createBy}</Text>
                <Text style={styles.text}>{post.createdAt}</Text>
              </View>
            </View>
            <View style={styles.topRight}>
              <Image
                source={require('../../../assets/img/common/Button-options.png')}
              />
            </View>
            <View />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: 10,
  },
  image: {
    height: 400,
    width: '100%',
  },
  container: {
    padding: 20,
  },
  text: {
    color: 'white',
  },
  textRight: {
    color: 'white',
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

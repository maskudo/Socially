import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Post from '../components/common/Post';
import RoundedAvatar from '../components/common/RoundedAvatar';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';

const post = {
  createdAt: '2 Hours ago',
  createBy: 'Dennis Reynolds',
  comments: ['hello', 'world'],
  likes: ['apar', 'praful'],
  saves: ['apar', 'praful'],
};
const POSTS = [1, 2, 3, 4, 5, 6];
export default function Homepage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Socially</Text>
        <FontAwesomeIcon name={'bell'} style={styles.headerText} />
      </View>
      <Text style={styles.feed}>Feed</Text>
      <View style={styles.storyContainer}>
        <TouchableOpacity
          onPress={() => {}}
          style={{...styles.storyButton, ...styles.addStoryButton}}>
          <Text>+</Text>
        </TouchableOpacity>
        <RoundedAvatar
          dimension={50}
          styles={{borderColor: 'green'}}
          image={require('../../assets/img/splash/main.png')}
        />
        <RoundedAvatar
          dimension={50}
          styles={{borderColor: 'green'}}
          image={require('../../assets/img/splash/main.png')}
        />
        <RoundedAvatar
          dimension={50}
          styles={{borderColor: 'green'}}
          image={require('../../assets/img/splash/main.png')}
        />
        <RoundedAvatar
          dimension={50}
          styles={{borderColor: 'green'}}
          image={require('../../assets/img/splash/main.png')}
        />
        <RoundedAvatar
          dimension={50}
          styles={{borderColor: 'green'}}
          image={require('../../assets/img/splash/main.png')}
        />
      </View>
      <FlatList
        style={styles.postContainer}
        data={POSTS}
        renderItem={() => <Post post={post} />}
        keyExtractor={item => item}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '10%',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 15,
  },
  feed: {
    paddingHorizontal: '10%',
    fontWeight: '700',
    fontSize: 25,
  },
  storyContainer: {
    marginVertical: 25,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addStoryButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    borderWidth: 1,
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
    marginBottom: 250,
    display: 'flex',
    gap: 30,
  },
});

import {Image, StyleSheet, Text, View} from 'react-native';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
export default function Profile() {
  return (
    <View>
      <View style={styles.blueContainer} />
      <View style={styles.profile}>
        <View style={styles.imageContainerOutline}>
          <View style={styles.innerImageContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
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
  posts: {},
  profileImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerImageContainer: {
    position: 'relative',
    transform: [{rotate: '-45deg'}],
    width: 80,
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageContainerOutline: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 35,
    transform: [{rotate: '45deg'}],
    padding: 10,
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
});

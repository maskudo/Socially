import {StyleSheet, Text, View} from 'react-native';
import RoundedAvatar from '../components/common/RoundedAvatar';
import TYPOGRAPHY from '../constants/typography';
export default function Profile() {
  return (
    <View>
      <View style={styles.profile}>
        <RoundedAvatar
          dimension={70}
          image={require('../../assets/img/profile/face.jpg')}
          styles={{bordeWidth: 1}}
        />
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
});

import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';

export default function Splash() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>Welcome to </Text>
        <Text style={styles.socially}>Socially</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/img/splash/main.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.next}>
        <TouchableOpacity
          style={styles.nextText}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.nextText}>
            Next {'  '}
            <Octicons name="arrow-right" style={{...styles.nextText}} />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.blackContainerOutline} />
      <View style={styles.blackContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  welcomeContainer: {
    height: '30%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.gray,
  },
  socially: {
    ...TYPOGRAPHY.title,
  },
  imageContainer: {
    height: '30%',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    height: '100%',
  },
  next: {
    height: '40%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: '20%',
    paddingRight: 40,
  },
  nextText: {
    ...TYPOGRAPHY.buttonLarge,
    color: COLORS.white,
    zIndex: 2,
  },
  blackContainer: {
    position: 'absolute',
    width: 240,
    height: 240,
    bottom: -40,
    right: -40,
    borderWidth: 1,
    borderRadius: 79,
    backgroundColor: COLORS.black,
    transform: [{rotate: '45deg'}],
  },
  blackContainerOutline: {
    position: 'absolute',
    width: 255,
    height: 260,
    bottom: -45,
    right: -45,
    borderWidth: 1,
    borderRadius: 79,
    transform: [{rotate: '45deg'}],
  },
});

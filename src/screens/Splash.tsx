import {Image, StyleSheet, Text, View} from 'react-native';

export default function Splash() {
  return (
    <View>
      <View style={styles.welcomeContainer}>
        <Text>Welcome to </Text>
        <Text style={styles.socially}>Socially</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/img/splash/main.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.next}>
        <Text>Next</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    height: '30%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socially: {
    fontSize: 30,
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
  },
});

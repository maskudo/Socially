import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
export default function Homepage() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Socially</Text>
        <Text style={styles.headerText}>Bell</Text>
      </View>
      <Text style={styles.feed}>Feed</Text>
      <View style={styles.storyContainer}>
        <TouchableOpacity
          onPress={() => {}}
          style={{...styles.storyButton, ...styles.addStoryButton}}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.storyButton} />
        <TouchableOpacity onPress={() => {}} style={styles.storyButton} />
        <TouchableOpacity onPress={() => {}} style={styles.storyButton} />
        <TouchableOpacity onPress={() => {}} style={styles.storyButton} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10%',
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
    borderWidth: 1,
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
    height: 40,
    width: 40,
    borderRadius: 100,
    borderWidth: 1,
  },
  imageContainer: {
    height: '30%',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    height: '100%',
  },
});

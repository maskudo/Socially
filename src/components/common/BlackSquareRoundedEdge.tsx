import {StyleSheet, View} from 'react-native';
import COLORS from '../../constants/colors';

export default function BlackSquareRoundedEdge({icon}: {icon: any}) {
  return <View style={styles.container}>{icon}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    width: 60,
    height: 60,
    borderRadius: 25,
    transform: [{rotate: '45deg'}],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

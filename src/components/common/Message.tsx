import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/colors';
import TYPOGRAPHY from '../../constants/typography';

type MessageProps = {
  id: number;
  name: string;
  text: string;
};
export default function Message({message}: {message: MessageProps}) {
  return (
    <View style={styles.messageContainer}>
      <View>
        <TouchableOpacity
          onPress={() => {}}
          key={message.id}
          style={styles.roundedButton}>
          <ImageBackground
            source={require('../../../assets/img/profile/face.jpg')}
            resizeMode="cover"
            style={styles.roundedButtonImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textsContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{message.name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {message.text}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginVertical: 10,
    height: 105,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 10,
    borderRadius: 33,
  },
  textsContainer: {
    flex: 1,
    height: 70,
  },
  roundedButton: {
    height: 62,
    width: 62,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.blue,
    overflow: 'hidden',
  },
  roundedButtonImage: {
    width: '100%',
    height: '100%',
  },
  nameContainer: {},
  name: {
    ...TYPOGRAPHY.captions,
    color: COLORS.black,
  },
  textContainer: {
    paddingVertical: 3,
  },
  text: {
    ...TYPOGRAPHY.captions,
    paddingRight: 50,
  },
});

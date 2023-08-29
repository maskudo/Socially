import {useNavigation} from '@react-navigation/native';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/colors';
import {defaultProfilePic} from '../../constants/images';
import TYPOGRAPHY from '../../constants/typography';
import {User} from '../../slices/userSlice';

type MessageProps = {
  id: string;
  user: User;
  preview?: string;
};
export default function Message({message}: {message: MessageProps}) {
  const navigation = useNavigation();
  const handlePressMessage = () =>
    navigation.navigate('Conversations', {otherUser: message.user});
  const handlePressProfile = () =>
    navigation.navigate('Profile', {otherUser: message.user});
  return (
    <Pressable style={styles.messageContainer} onPress={handlePressMessage}>
      <View style={styles.outline}>
        <TouchableOpacity
          onPress={handlePressProfile}
          key={message.id}
          style={styles.roundedButton}>
          <ImageBackground
            source={{uri: message.user.url ?? defaultProfilePic}}
            resizeMode="cover"
            style={styles.roundedButtonImage}
          />
        </TouchableOpacity>
      </View>
      <Pressable style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{message.user.handle}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {message.preview}
          </Text>
        </View>
      </Pressable>
    </Pressable>
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
  outline: {
    borderWidth: 2,
    borderColor: COLORS.black,
    height: 67,
    width: 67,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedButton: {
    height: 60,
    width: 60,
    borderRadius: 100,
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

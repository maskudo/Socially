import {useNavigation} from '@react-navigation/native';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BlackSquareRoundedEdge from '../components/common/BlackSquareRoundedEdge';
import Conversation from '../components/common/Conversation';
import COLORS from '../constants/colors';
import FONTS from '../constants/fonts';
import {face2} from '../constants/images';
import TYPOGRAPHY from '../constants/typography';
import {CONVERSATION} from '../utils/data';

export default function Conversations() {
  const navigation = useNavigation();
  const goBack = navigation.goBack;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.nav}>
          <TouchableOpacity onPress={goBack}>
            <Icon name={'arrow-left'} style={styles.navIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.profile}>
          <View style={styles.imageContainerOutline}>
            <TouchableOpacity onPress={() => {}} style={styles.imageContainer}>
              <ImageBackground
                source={face2}
                resizeMode="cover"
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Charlie Kelly</Text>
            <Text style={styles.status}>Online</Text>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.conversationsContainer}
        data={CONVERSATION}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Conversation conversation={item} />}
        keyExtractor={(_, index) => index}
      />

      <View style={styles.inputContainer}>
        <View style={styles.myTextInput}>
          <TextInput
            style={styles.textInput}
            placeholder={'Write a message...'}
            placeholderTextColor={COLORS.gray}
          />
          <View style={styles.sendTextButton}>
            <BlackSquareRoundedEdge
              icon={
                <Icon
                  name="send"
                  size={25}
                  color={COLORS.white}
                  style={styles.sendTextIcon}
                />
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingTop: 10,
    position: 'relative',
    height: '100%',
  },
  header: {
    height: 260,
    backgroundColor: COLORS.lightblue,
    borderRadius: 34,
  },

  nav: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '10%',
  },
  navText: {
    ...TYPOGRAPHY.bodyRegular,
    fontFamily: FONTS.fontBold,
  },
  navIcon: {
    ...TYPOGRAPHY.h1,
    paddingHorizontal: 15,
  },
  profileImage: {
    position: 'absolute',
    transform: [{rotate: '-45deg'}],
    width: 80,
    height: 80,
  },
  imageContainer: {
    position: 'relative',
    width: 75,
    height: 75,
    borderRadius: 45,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainerOutline: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 35,
    transform: [{rotate: '45deg'}],
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    flexDirection: 'row',
    paddingHorizontal: 45,
    gap: 40,
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    ...TYPOGRAPHY.h3,
  },
  status: {
    ...TYPOGRAPHY.captions,
  },
  conversationsContainer: {
    paddingTop: 10,
    height: '40%',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  myTextInput: {
    paddingLeft: 20,
    paddingRight: 15,
    borderRadius: 40,
    width: 290,
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 5,
    shadowColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
  textInput: {
    ...TYPOGRAPHY.captions,
    flex: 1,
    color: COLORS.black,
  },
  sendTextButton: {},
  sendTextIcon: {
    transform: [{rotate: '-45deg'}],
  },
});

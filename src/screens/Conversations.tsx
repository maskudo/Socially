import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
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
import {useSelector} from 'react-redux';
import BlackSquareRoundedEdge from '../components/common/BlackSquareRoundedEdge';
import Conversation from '../components/common/Conversation';
import COLORS from '../constants/colors';
import FONTS from '../constants/fonts';
import TYPOGRAPHY from '../constants/typography';
import {RootState} from '../store/store';
import firestore from '@react-native-firebase/firestore';
import {defaultProfilePic} from '../constants/images';

type Message = {
  id: string;
  sender: string;
  receiver: string;
  text: string;
  createdAt: string;
};

export default function Conversations({route}) {
  const navigation = useNavigation();
  const currentUser = useSelector((state: RootState) => state.user);
  const {otherUser} = route.params;
  const usersArray = [currentUser.handle, otherUser.handle];
  const [conversations, setConversations] = useState<Message[]>([]);
  const [currentText, setCurrentText] = useState('');
  const flatlistRef = useRef(null);
  const handleEndEditing = async () => {
    if (currentText) {
      await firestore().collection('Messages').add({
        sender: currentUser.handle,
        receiver: otherUser.handle,
        text: currentText,
        createdAt: firestore.Timestamp.now().toDate(),
      });
    }
    setCurrentText('');
  };
  const goBack = navigation.goBack;
  useEffect(() => {
    const unsub = firestore()
      .collection('Messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(res => {
        const messages: Message[] = [];
        res?.forEach(message => {
          const actualMessage: Message = {...message.data(), id: message.id};
          // TODO: Fix this hacky solution
          if (
            usersArray.includes(actualMessage.sender) &&
            usersArray.includes(actualMessage.receiver)
          ) {
            messages.push(actualMessage);
          }
        });
        setConversations(messages);
      });
    return () => unsub();
  }, []);

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
                source={{uri: otherUser.url ?? defaultProfilePic}}
                resizeMode="cover"
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{otherUser.handle}</Text>
            <Text style={styles.status}>Online</Text>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.conversationsContainer}
        ref={flatlistRef}
        onContentSizeChange={() => flatlistRef?.current?.scrollToEnd()}
        data={conversations}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Conversation conversation={item} />}
        keyExtractor={item => item.id}
      />

      <View style={styles.inputContainer}>
        <View style={styles.myTextInput}>
          <TextInput
            style={styles.textInput}
            placeholder={'Write a message...'}
            onChangeText={text => setCurrentText(text)}
            value={currentText}
            placeholderTextColor={COLORS.gray}
            blurOnSubmit={true}
          />
          <TouchableOpacity
            style={styles.sendTextButton}
            onPress={handleEndEditing}>
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
          </TouchableOpacity>
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

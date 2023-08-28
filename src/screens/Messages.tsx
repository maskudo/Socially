import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TYPOGRAPHY from '../constants/typography';
import FONTS from '../constants/fonts';
import COLORS from '../constants/colors';
import Message from '../components/common/Message';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {User} from '../slices/userSlice';

export default function Messages() {
  const navigation = useNavigation();
  const currentUser = useSelector((state: RootState) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const goBack = navigation.goBack;
  useEffect(() => {
    const fetchUsers = async () => {
      let res = await firestore()
        .collection('Users')
        .where('handle', '!=', currentUser.handle)
        .get();
      let fetchedUsers: User[] = [];
      res.forEach(user => {
        fetchedUsers.push({...user.data(), id: user.id.toString()});
      });
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, [currentUser]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Icon name={'arrow-left'} style={styles.headerIcon} />
        </TouchableOpacity>
        <Icon name={'menu'} style={styles.headerIcon} />
      </View>
      <View style={styles.blueContainer} />
      <FlatList
        style={styles.messageContainer}
        data={users}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Message message={{user: item, id: item.id}} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View>
            <Text style={styles.messages}>Messages</Text>
            <View style={styles.inputContainer}>
              <View style={styles.myTextInput}>
                <Icon name="search" size={22} color={COLORS.black} />
                <TextInput
                  style={styles.textInput}
                  placeholder={'Search for Contacts'}
                  placeholderTextColor={COLORS.lightgray}
                />
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    position: 'relative',
    backgroundColor: COLORS.white,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '10%',
  },
  headerText: {
    ...TYPOGRAPHY.bodyRegular,
    fontFamily: FONTS.fontBold,
  },
  headerIcon: {
    ...TYPOGRAPHY.h1,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 30,
  },
  myTextInput: {
    paddingLeft: 20,
    borderRadius: 15,
    width: 290,
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    elevation: 5,
    shadowColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
  textInput: {
    ...TYPOGRAPHY.captions,
    flex: 1,
  },
  messages: {
    ...TYPOGRAPHY.h2Bold,
  },
  storyContainer: {
    marginVertical: 25,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    height: 400,
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    borderRadius: 20,
  },
  messageContainer: {
    marginBottom: 100,
    display: 'flex',
  },
  blueContainer: {
    position: 'absolute',
    width: 680,
    height: 680,
    left: -680 / 4 + 10,
    top: 680 / 4 + 160,
    borderRadius: 152,
    borderWidth: 0.5,
    borderColor: COLORS.lightgray,
    backgroundColor: COLORS.lightblue,
    transform: [{rotate: '-45deg'}],
  },
});

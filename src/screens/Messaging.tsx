import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TYPOGRAPHY from '../constants/typography';
import FONTS from '../constants/fonts';
import COLORS from '../constants/colors';
import {MESSAGES} from '../utils/data';
import Message from '../components/common/Message';

export default function Homepage() {
  return (
    <View style={styles.container}>
      <View style={styles.blueContainer} />
      <FlatList
        style={styles.messageContainer}
        data={MESSAGES}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Message message={item} />}
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
    ...TYPOGRAPHY.h3,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 30,
  },
  myTextInput: {
    paddingHorizontal: 20,
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
    marginVertical: 40,
    display: 'flex',
  },
  blueContainer: {
    position: 'absolute',
    width: 680,
    height: 680,
    left: -680 / 4 + 10,
    top: 680 / 4 + 80,
    borderRadius: 152,
    borderWidth: 0.5,
    borderColor: COLORS.lightgray,
    backgroundColor: COLORS.lightblue,
    transform: [{rotate: '-45deg'}],
  },
});

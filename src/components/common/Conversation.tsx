import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import TYPOGRAPHY from '../../constants/typography';
import {RootState} from '../../store/store';
type ConversationProps = {
  text: string;
  sender: string;
  receiver: string;
};
export default function Conversation({
  conversation,
}: {
  conversation: ConversationProps;
}) {
  const currentUser = useSelector((state: RootState) => state.user);
  return (
    <View
      style={{
        ...styles.container,
        alignItems:
          currentUser.handle === conversation.sender
            ? 'flex-end'
            : 'flex-start',
      }}>
      <Text style={styles.text}>{conversation.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    ...TYPOGRAPHY.captions,
    maxWidth: '60%',
    backgroundColor: 'rgba(65,65,65,0.05)',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'left',
  },
});

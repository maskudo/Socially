import {StyleSheet, Text, View} from 'react-native';
import TYPOGRAPHY from '../../constants/typography';
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
  const currentUser = 'Malenia';
  return (
    <View
      style={{
        ...styles.container,
        alignItems:
          currentUser === conversation.sender ? 'flex-end' : 'flex-start',
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

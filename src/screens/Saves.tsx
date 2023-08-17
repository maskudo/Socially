import {View} from 'react-native';
import {useSelector} from 'react-redux';

export default function Saves() {
  const user = useSelector(state => state.user);
  return <View>SavedPost</View>;
}

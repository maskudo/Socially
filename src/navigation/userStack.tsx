import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageCropPicker from 'react-native-image-crop-picker';
import COLORS from '../constants/colors';
import AddPost from '../screens/AddPost';
import Bookmarks from '../screens/Bookmarks';
import Conversations from '../screens/Conversations';
import Homepage from '../screens/Homepage';
import Messages from '../screens/Messages';
import Swipe from '../screens/Swipe';
import {StyleSheet, View} from 'react-native';
import Profile from '../screens/Profile';
import BlackSquareRoundedEdge from '../components/common/BlackSquareRoundedEdge';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabScreen}
          options={() => ({headerShown: false})}
        />
        <Stack.Screen
          name="Conversations"
          component={Conversations}
          options={() => ({headerShown: false})}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPost}
          options={() => ({headerShown: false})}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={() => ({headerShown: false})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabScreen() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: COLORS.black,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({size, color}) => (
            <Icon name={'home'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Messages');
          },
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({size, color}) => (
            <Icon name={'message-square'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SwipeScreen"
        component={Swipe}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            ImageCropPicker.openPicker({
              cropping: false,
            })
              .then(image => {
                navigation.navigate('AddPost', {image});
              })
              .catch(err => console.log(err));
          },
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <View style={styles.addPostButton}>
              <BlackSquareRoundedEdge
                icon={
                  <Icon
                    name="plus-circle"
                    size={20}
                    color={COLORS.white}
                    style={styles.addPostIcon}
                  />
                }
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({size, color}) => (
            <Icon name={'bookmark'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Profile', {});
          },
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({size, color}) => (
            <Icon name={'user'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  addPostButton: {
    marginBottom: 10,
  },
  addPostIcon: {
    transform: [{rotate: '-45deg'}],
  },
  tabBarStyle: {
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

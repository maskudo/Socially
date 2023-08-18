import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Conversations from './src/screens/Conversations';
import Homepage from './src/screens/Homepage';
import Messages from './src/screens/Messages';
import Profile from './src/screens/Profile';
import Swipe from './src/screens/Swipe';
import COLORS from './src/constants/colors';
import {StyleSheet, View} from 'react-native';
import BlackSquareRoundedEdge from './src/components/common/BlackSquareRoundedEdge';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import Bookmarks from './src/screens/Bookmarks';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
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
            name="Swipe"
            component={Swipe}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Messages"
            component={Messages}
            options={() => ({headerShown: false})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
            navigation.navigate('Swipe');
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
            <Icon name={'heart'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
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
});

export default App;

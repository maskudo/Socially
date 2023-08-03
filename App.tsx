import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Conversations from './src/screens/Conversations';
import Homepage from './src/screens/Homepage';
import Messaging from './src/screens/Messaging';
import Profile from './src/screens/Profile';
import Splash from './src/screens/Splash';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={TabScreen}
          options={() => ({headerShown: false})}
        />
        <Stack.Screen name="Conversations" component={Conversations} />
        <Stack.Screen name="Messaging" component={Messaging} />
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
      }}>
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon name={'house'} color={color} size={size} brand />
          ),
        }}
      />
      <Tab.Screen
        name="Messaging"
        component={Messaging}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Messaging');
          },
        })}
        options={{
          tabBarLabel: 'Messaging',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon name={'message'} color={color} size={size} brand />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Conversations}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Conversations');
          },
        })}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon name={'heart'} color={color} size={size} brand />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon name={'user'} color={color} size={size} brand />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default App;

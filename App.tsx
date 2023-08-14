import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Conversations from './src/screens/Conversations';
import Homepage from './src/screens/Homepage';
import Messaging from './src/screens/Messaging';
import Profile from './src/screens/Profile';
import Splash from './src/screens/Splash';
import COLORS from './src/constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabScreen}
          options={() => ({headerShown: false})}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Conversations" component={Conversations} />
        <Stack.Screen
          name="Messaging"
          component={Messaging}
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
      }}>
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Feather name={'home'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SplashScreen"
        component={Splash}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Splash');
          },
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Feather name={'image'} color={color} size={size} />
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
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Feather name={'message-square'} color={color} size={size} />
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
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Feather name={'heart'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Feather name={'user'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default App;

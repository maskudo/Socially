import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Conversations from './src/screens/Conversations';
import Homepage from './src/screens/Homepage';
import Messaging from './src/screens/Messaging';
import Profile from './src/screens/Profile';
import Swipe from './src/screens/Swipe';
import COLORS from './src/constants/colors';
import {StyleSheet, View} from 'react-native';
import BlackSquareRoundedEdge from './src/components/common/BlackSquareRoundedEdge';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

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
            name="Messaging"
            component={Messaging}
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
      }}>
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({size}) => (
            <Icon name={'home'} color={COLORS.black} size={size} />
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
          tabBarIcon: ({size}) => (
            <Icon name={'message-square'} color={COLORS.black} size={size} />
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
          tabBarIcon: ({size}) => (
            <Icon name={'heart'} color={COLORS.black} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({size}) => (
            <Icon name={'user'} color={COLORS.black} size={size} />
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

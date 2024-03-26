import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WifiScreen from './WifiScreen';
import WifiListScreen from './WifiListScreen';
import LoginWalletScreen from './LoginWalletScreen';
import DangKi from './dangKi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WalletScreen from './WalletScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={WifiListScreen} />
      <Tab.Screen name="Share Wifi" component={WifiScreen} />
      <Tab.Screen name="Sol" component={WalletScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginInfo = await AsyncStorage.getItem('loginInfo');
      if (loginInfo) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "TabNavigator" : "LoginWalletScreen"}>
        <Stack.Screen name="LoginWalletScreen" component={LoginWalletScreen} />
        <Stack.Screen name="SignUp" component={DangKi} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

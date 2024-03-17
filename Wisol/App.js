import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from './WalletScreen';
import SolScreen from './SolScreen';
import WifiScreen from './WifiScreen';
import WifiListScreen from './WifiListScreen'; // Đảm bảo rằng bạn đã import WifiScreen

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={WifiListScreen} />
      <Tab.Screen name="Share Wifi" component={WifiScreen} />
      <Tab.Screen name="Ví" component={SolScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Wallet">
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from './WalletScreen';
import SolScreen from './SolScreen';
import WifiScreen from './WifiScreen'; // Đảm bảo rằng bạn đã import WifiScreen

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Sol" component={SolScreen} />
      <Tab.Screen name="Wifi" component={WifiScreen} />
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

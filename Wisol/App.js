import { StatusBar } from 'expo-status-bar';
import React from 'react';
import WalletScreen from './WalletScreen'; 

export default function App() {
  return (
    <React.Fragment>
      <WalletScreen />
      <StatusBar style="auto" />
    </React.Fragment>
  );
}

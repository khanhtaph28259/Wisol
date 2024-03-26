import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginWalletScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [solBalance, setSolBalance] = useState(null);

  const handleLogin = async () => {
    let url_api = "http://192.168.1.4:3000/login";
    fetch(url_api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then ((res)=>{
      return res.json();
    })
    .then(async(res_login)=>{
      if(res_login.message === "Đăng nhập thành công") {
        await AsyncStorage.setItem('loginInfo', JSON.stringify(res_login.user));
        navigation.navigate('TabNavigator'); // Chuyển hướng đến màn hình TabNavigator khi đăng nhập thành công
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    })
    .catch((e) => {
      console.log(e);
    });
  };
  

 

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require('./logo1.png')}
      />
      <Text style={styles.title}>Đăng nhập và nhập ID Wallet</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        onChangeText={(txt) => setUsername(txt)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        onChangeText={(txt) => setPassword(txt)}
        value={password}
        secureTextEntry={true}
      />
   
      <Button title="Đăng nhập " onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#663399',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: '#fff',
    marginBottom: 10,
    width: '100%',
  },
});

export default LoginWalletScreen;

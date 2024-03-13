import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


const WifiScreen = () => {
  const [wifiName, setWifiName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [solAmount, setSolAmount] = useState("");

  const handleSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "em2a0czrM9yiU8vn");
    myHeaders.append("Content-Type", "application/json");
  
    var data = {
      wifiName: wifiName,
      address: address,
      password: password,
      solAmount: solAmount
    };
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
  
    fetch("https://api.shyft.to/sol/v1/storage/upload", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên Wifi:</Text>
      <TextInput style={styles.input} onChangeText={setWifiName} value={wifiName} />
      <Text style={styles.label}>Địa chỉ:</Text>
      <TextInput style={styles.input} onChangeText={setAddress} value={address} />
      <Text style={styles.label}>Mật khẩu:</Text>
      <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry={true} />
      <Text style={styles.label}>Số SOL:</Text>
      <TextInput style={styles.input} onChangeText={setSolAmount} value={solAmount} keyboardType="numeric" />
      <Button title="Thêm thông tin Wifi" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 5,
  },
});

export default WifiScreen;

import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, Image } from "react-native";
import axios from "axios";

const WalletScreen = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState(null);
  const [solBalance, setSolBalance] = useState(null);

  const handleWalletAddressChange = (text) => {
    setWalletAddress(text);
  };

  const handleSubmit = () => {
    // Call API and update status
    fetchData();
  };

  const fetchData = () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.shyft.to/sol/v1/wallet/get_portfolio?network=devnet&wallet=${walletAddress}`,
      headers: {
        "x-api-key": "-bpdmCKJLrjBTFDp",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        if (response.data.success) {
          setStatus("success");
          setSolBalance(response.data.solBalance); 
        } else {
          setStatus("error");
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 404) {
          setStatus("not_found");
        } else {
          setStatus("error");
        }
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require('./logo1.png')}
      />
      <Text style={styles.title}>Type your ID Wallet</Text>
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        onChangeText={handleWalletAddressChange}
        value={walletAddress}
        secureTextEntry={true}
      />
      <Text style={styles.forgotPassword}>Quên mật khẩu</Text>
      <Button title="Mở khóa" onPress={handleSubmit} />
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
  forgotPassword: {
    color: '#fff',
    marginBottom: 20,
  },
});

export default WalletScreen;

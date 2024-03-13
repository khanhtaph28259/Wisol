import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, Image } from "react-native";
import axios from "axios";

const WalletScreen = ({ navigation }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState(null);
  const [solBalance, setSolBalance] = useState(null);

  const handleWalletAddressChange = (text) => {
    setWalletAddress(text);
  };

  const handleSubmit = () => {
    fetchData().then((solBalance) => {
      if (solBalance) {
        // Nếu thành công, chuyển đến màn hình SolScreen trong TabNavigator với số dư SOL
        navigation.navigate('TabNavigator', { screen: 'Sol', params: { solBalance } });
      }
    });
  };
  

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.shyft.to/sol/v1/wallet/get_portfolio?network=devnet&wallet=${walletAddress}`,
        headers: {
          "x-api-key": "em2a0czrM9yiU8vn",
        },
      };
  
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
  
          if (response.data.success) {
            setStatus("success");
            setSolBalance(response.data.result.sol_balance); // Sửa ở đây
            resolve(response.data.result.sol_balance); // Và ở đây
          } else {
            setStatus("error");
            reject(new Error("Error fetching data"));
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 404) {
            setStatus("not_found");
          } else {
            setStatus("error");
          }
          console.log(error);
          reject(error);
        });
    });
  };
  
  

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require('./logo1.png')}
      />
      <Text style={styles.title}>Nhập địa chỉ ví của bạn</Text>
      <TextInput
        style={styles.input}
        placeholder="ID WALLET"
        onChangeText={handleWalletAddressChange}
        value={walletAddress}
        secureTextEntry={true}
      />
      <Text style={styles.forgotPassword}>Cách Lấy ID Wallet</Text>
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

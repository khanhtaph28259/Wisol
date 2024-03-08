import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Enter wallet address:
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="E.g., WTJ2ygprWuFLFyBX72RfBCdsoYmQndjg6BKNbLT6e62"
        onChangeText={handleWalletAddressChange}
        value={walletAddress}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {status === null && <Text>Loading...</Text>}
      {status === "success" && <Text>Success! Your Sol balance is {solBalance}</Text>}
      {status === "error" && <Text>Error! Please check the wallet address and try again.</Text>}
      {status === "not_found" && (
        <Text>Sorry, the wallet address does not exist. Please check and try again.</Text>
      )}
    </View>
  );
};

export default WalletScreen;

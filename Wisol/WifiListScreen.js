import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button, TextInput } from 'react-native';

const WifiListScreen = () => {
  const [wifiList, setWifiList] = useState([]);
  const [searchAddress, setSearchAddress] = useState('');

  useEffect(() => {
    fetchWifiList();
  }, []);

  const fetchWifiList = () => {
    fetch('http://192.168.1.118:3000/wifis')
      .then(response => response.json())
      .then(data => setWifiList(data))
      .catch(error => console.error('Error:', error));
  };

  const handleBuy = (wifi) => {
    alert(`Bạn đã mua Wifi: ${wifi.name}`);
  };

  const handleSearch = () => {
    if (searchAddress.length > 0) {
      setWifiList(wifiList.filter(wifi => wifi.address.includes(searchAddress)));
    } else {
      fetchWifiList();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Danh sách Wifi</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập địa chỉ để tìm kiếm"
        value={searchAddress}
        onChangeText={(txt) => setSearchAddress(txt)}
      />
      <Button title="Tìm kiếm" onPress={handleSearch} />
      <FlatList
        data={wifiList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={require('./logo1.png')} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.listItemText}>Tên Wifi: {item.name}</Text>
              <Text style={styles.listItemText}>Địa chỉ: {item.address}</Text>
              <Text style={styles.listItemText}>Số SOL: {item.sol}</Text>
              <Button title="Mua" onPress={() => handleBuy(item)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

// ... (styles)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  listItemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
});

export default WifiListScreen;

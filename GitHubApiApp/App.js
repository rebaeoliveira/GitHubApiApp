// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Linking } from 'react-native';
import { Card, List, Avatar } from 'react-native-paper';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${searchQuery}`);
      setUserData(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
      setUserData([]); // Limpa os resultados em caso de erro
    }
  };

  const openUserProfile = (url) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchUserData();
    }
  }, [searchQuery]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>GitHub User Search</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter GitHub username"
        placeholderTextColor="#bbb"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <Button title="Search" onPress={fetchUserData} color="#6a1b9a" />
      <List.Section>
        {userData.map((user) => (
          <List.Item
            key={user.id}
            title={user.login}
            onPress={() => openUserProfile(user.html_url)}
            left={() => <Avatar.Image source={{ uri: user.avatar_url }} size={48} />}
            style={styles.userListItem}
          />
        ))}
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2e003e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ff4081',
  },
  searchInput: {
    height: 40,
    borderColor: '#6a1b9a',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#4a148c',
    color: '#fff',
  },
  userListItem: {
    marginBottom: 10,
    backgroundColor: '#673ab7',
    borderRadius: 8,
  },
});

export default App;

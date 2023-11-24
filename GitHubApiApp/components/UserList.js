// components/UserList.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const UserList = ({ data }) => {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text>{`ID: ${item.id}`}</Text>
            <Text>{`Login: ${item.login}`}</Text>
            <Text>{`URL: ${item.html_url}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 5,
  },
});

export default UserList;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { auth } from "../../firebase/config.js";
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/usersSlice.js';
import { useNavigation } from '@react-navigation/core';

const Home = () => {
  const navigation = useNavigation();
  const handleSingOut = () => {
    auth.signOut()
    .then(() => {
      navigation.replace('Login');
    })
    .catch(error => alert(error.message));
  }

  return (
   <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>     
      <TouchableOpacity style={styles.button} onPress={handleSingOut}>
        <Text style={styles.buttonText}>Sign Out</Text>

      </TouchableOpacity>
   </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

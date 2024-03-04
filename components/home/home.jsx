import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { auth } from "../../firebase/config.js";
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/usersSlice.js';
import { useNavigation } from '@react-navigation/core';

const Home = () => {
  return (
   <View style={styles.container}>
      <Text style={styles.text}>Bienvenido {auth.currentUser?.email}</Text>     
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
  text: {
    fontSize: 25,
    marginBottom: 20,
    width: 300,
    textAlign: 'center',
},
});

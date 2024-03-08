import { View, Text, TextInput, Pressable, Image, Alert, KeyboardAvoidingView  } from 'react-native';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import styles from './login.styles';
import Logo from '../../assets/images/Logo.jpg';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/core';

function LoginPage() {
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.navigate('Home')
  //     }
  //   })
  //   return unsubscribe;
  // }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // The userCredential object contains the user information
        const user = userCredential.user;
        console.log("User logged in", user.email);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handlePasswordReset = () => {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email)
    Alert.alert("Email sent! Check your inbox for reset instructions.");
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.img} />

      <KeyboardAvoidingView style={styles.containerForm} behavior="padding">
        <Text style={styles.h1}>Iniciar sesión</Text>
        <Text style={styles.p}>_____________</Text>

        <TextInput
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Correo electrónico"
          style={styles.input}
        />

        <TextInput
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.containerForm1}>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.textButton}>Ingresar</Text>
          </Pressable>
          {error && <Text style={styles.error}>{error}</Text>}

          <Text style={styles.constraseñaOlvidada} onPress={handlePasswordReset}>¿Olvidaste tu contraseña?</Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default LoginPage;
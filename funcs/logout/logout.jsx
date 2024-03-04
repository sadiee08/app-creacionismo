// Logout.jsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase/config.js";

const Logout = () => {
    const navigation = useNavigation();

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                // Navigate to the login screen after successful logout
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                });
            })
            .catch((error) => alert(error.message));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>¿Estas seguro de querer cerrar sesión?</Text>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Logout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#AEB879',
        padding: 10,
        margin: 10,
        width: 160
    },
    buttonText: {
        color: '#F6F6F6',
        fontSize: 19,
        fontWeight: '500',
        textAlign: 'center',
    },
    text: {
        fontSize: 25,
        marginBottom: 20,
        width: 300,
        textAlign: 'center',
    },
});


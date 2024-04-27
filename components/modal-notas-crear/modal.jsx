import React, { useState } from 'react';

import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { db } from '../../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { Picker } from '@react-native-picker/picker';

const ModalNotasCrear = () => {
    const url = 'notas';

    const navigation = useNavigation();

    const [data, setData] = useState([]);

    const [formData, setFormData] = useState({
        task: '',
        completed: false,
    });

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const saveProduct = async () => {
        try {
            const res = await addDoc(collection(db, 'notas'), {
                ...formData,
                timeStamp: serverTimestamp()
            });

            setFormData({
                task: '',
                completed: false,
            });
            navigation.goBack();

        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };


    return (
        <ScrollView>

            <View style={styles.container}>
                <Text style={styles.title}>Crear tarea</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Ej. Regar plantas"
                    value={formData.task}
                    onChangeText={(e) => handleInputChange('task', e)}
                />

                <View style={styles.displayButtons}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => saveProduct()}>
                        <Text style={styles.buttonText}>Crear</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
        padding: 14,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 16,
    },
    picker: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    tituloTexto: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4F4F4F',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,

    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    },
    displayButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginStart: 15,
        marginEnd: 15,
        marginTop: 20,
    }
});

export default ModalNotasCrear;
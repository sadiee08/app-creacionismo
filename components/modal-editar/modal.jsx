import React, { useState } from 'react';

import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { db } from '../../firebase/config';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

const ModalEditar = ({ route }) => {

    const { producto, id, url } = route.params;

    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        name: producto.name,
        description: producto.description,
        size: producto.size,
        color: producto.color,
        total: producto.total,
        price: producto.price,
    });


    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateProduct = () => {
        try {
            const productoSeleccionado = doc(db, url, id);
            updateDoc(productoSeleccionado, {
                ...formData
            });
            navigation.goBack(); // Go back after successful update
        } catch (error) {
            console.error(error);
        }
    };

    handleDelete = () => {
        try {
            const productoSeleccionado = doc(db, url, id);
            deleteDoc(productoSeleccionado);
            navigation.goBack(); // Go back after successful delete
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView>

            <View style={styles.container}>
                <Text style={styles.title}>Editar Producto</Text>

                <Text style={styles.tituloTexto}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    name="name"
                />

                <Text style={styles.tituloTexto}>Descripción:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Descripción"
                    value={formData.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    name="description"
                />

                <Text style={styles.tituloTexto}>Tamaño:</Text>
                <View style={styles.picker}>
                    <Picker selectedValue={formData.size} onValueChange={(itemValue) => handleInputChange('size', itemValue)}>
                        <Picker.Item label="Grande" value="Grande" key="grande" />
                        <Picker.Item label="Mediano" value="Mediano" key="mediano" />
                        <Picker.Item label="Chico" value="Chico" key="chico" />
                    </Picker>
                </View>

                <Text style={styles.tituloTexto}>Color:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Color"
                    value={formData.color}
                    onChangeText={(text) => handleInputChange('color', text)}
                    name="color"
                />

                <Text style={styles.tituloTexto}>Cantidad:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Total"
                    value={formData.total.toString()}
                    keyboardType="number-pad"
                    onChangeText={(text) => handleInputChange('total', parseInt(text))}
                    name="total"
                />


                <Text style={styles.tituloTexto}>Precio:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Precio"
                    value={formData.price.toString()}
                    keyboardType="number-pad"
                    onChangeText={(text) => handleInputChange('price', parseInt(text))}
                    name="price"
                />

                <View style={styles.displayButtons}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => updateProduct()}>
                        <Text style={styles.buttonText}>Actualizar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.displayButtonDelete}>
                    <TouchableOpacity style={styles.button} onPress={() => handleDelete()}>
                    <MaterialIcons name="delete" style={styles.buttonDelete}/>
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
    },
    displayButtonDelete: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginStart: 15,
        marginEnd: 15,
        marginTop: 20,
    },
    buttonDelete: {
        color: '#fff',
        fontSize: 24,
    }


});

export default ModalEditar;
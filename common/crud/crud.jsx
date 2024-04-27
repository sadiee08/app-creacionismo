import React, { useState, useEffect } from 'react';

import { db } from '../../firebase/config';
import { addDoc, collection, serverTimestamp, onSnapshot, deleteDoc, doc, updateDoc, increment } from 'firebase/firestore';

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';


const Crud = ({ producto, titulo }) => {
    const [data, setData] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        size: '',
        color: '',
        total: 0,
        price: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const add = async (e) => {
        e.preventDefault();
        try {
            const res = await addDoc(collection(db, producto), {
                ...formData,
                timeStamp: serverTimestamp()
            });

            setFormData({
                name: '',
                description: '',
                size: '',
                color: '',
                total: 0,
                price: 0,
            });
            handleClose();

        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, producto),
            (snapShot) => {
                let list = [];
                let idAux = 1;
                let listTable = []

                snapShot.docs.forEach((doc) => {
                    list.push({ id: idAux, idGuid: doc.id, ...doc.data() });
                    idAux++;
                });
                setData(list);
                //listTable = list
                //console.log(listTable)

                // for (var i = 0, len = listTable.length; i < len; i++) {
                //     delete listTable[i].timeStamp;
                //     delete listTable[i].description;
                // }

                //setData(listTable);
            },
            (error) => {
                console.log(error);
            }
        );
        return () => {
            unsub();
        };
    }, []);

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>Nombre</Text>
            <Text style={styles.headerText}>Color</Text>
            <Text style={styles.headerText}>Total</Text>
            <Text style={styles.headerText}>Acciones</Text>
        </View>
    );

    const navigation = useNavigation();

    const handleEditProduct = ({ item, id }) => {
        navigation.navigate('MyModal', { producto: item, id: id, url: producto }); // Pass product data as a param
    };

    const handleCreate = () => {
        navigation.navigate('ModalCrear', { url: producto });
    };

    return (
        <>

            <View style={styles.displayHeader}>
                <Text style={styles.title}>{titulo}</Text>

                <TouchableOpacity style={styles.buttonAdd} onPress={() => handleCreate()}>
                    <Text style={styles.buttonTextAdd}>+</Text>
                </TouchableOpacity>
            </View>


            <FlatList
                data={data}
                style={styles.container}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </View>

                        <View style={styles.cell}>
                            <Text style={styles.itemText}>{item.color}</Text>
                        </View>

                        <View style={styles.cell}>
                            <Text style={styles.itemText}>{item.total}</Text>
                        </View>

                        <View style={styles.cell}>
                            <TouchableOpacity style={styles.button} onPress={() => handleEditProduct({ item, id: item.idGuid })}>
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.idGuid}
                ListHeaderComponent={renderHeader} // Agrega el encabezado de la tabla
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333B69',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E6EFF5',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E6EFF5',
        height: 50,
    },
    cell: {
        flex: 1,
        padding: 5,
        borderColor: '#ccc',
        display: 'flex',
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        width: 65,
        borderWidth: 1,
        borderColor: '#718EBF',
        borderRadius: 20,
        padding: 5,
        marginStart: 15,
    },
    buttonText: {
        color: '#718EBF',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    displayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginStart: 15,
        marginEnd: 15,
        marginTop: 20,
        marginBottom: 10,
    },
    buttonAdd: {
        backgroundColor: '#4F4F4F',
        borderRadius: 5,
        width: 40,
        padding: 1,
    },
    buttonTextAdd: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default Crud;
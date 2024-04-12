import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const TotalCount = ({imagen, texto, producto, totalProdutos}) => {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTotal = async () => {
            const productCollection = collection(db, producto);
            const productSnapshot = await getDocs(productCollection);
            setTotal(productSnapshot.size);
        };

        fetchTotal();
    }, []);

    let totalAux = totalProdutos ? totalProdutos : total;

    return (
        <>
            <View style={styles.boxHorizontal}>
                <ImageBackground source={imagen} style={styles.imageHorizontal}/>
                <View>
                    <Text style={styles.textBoxHorizontal}>{texto}</Text>
                    <Text style={styles.textNumBoxHorizontal}>{totalAux}</Text>
                </View>
            </View>
        </>

    );
};

const styles = StyleSheet.create({
    // Estilos para el contenedor horizontal
    boxHorizontal: {
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFfFf',
        margin: 10,
        width: 290,
        marginStart: 20,
        borderRadius: 15,
        flexDirection: 'row',
    },
    imageHorizontal: {
        resizeMode: 'cover', // Ajusta el modo de redimensionamiento de la imagen
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: 40,
        marginEnd: 20,
        height: 230,
        opacity: 0.9,
        width: 70,
        height: 70,
        borderRadius: 10,

    },
    textBoxHorizontal: {
        color: '#718EBF',
        fontSize: 16,
    },
    textNumBoxHorizontal: {
        color: '#232323',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default TotalCount;
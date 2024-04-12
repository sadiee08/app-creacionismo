import React from 'react';
import { StyleSheet, Text, ImageBackground, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuCatalogo = ({ imagen, texto, url }) => {

    const navigation = useNavigation();

    return (
        <>
            <View className="cuadro">
                <TouchableOpacity onPress={() => navigation.navigate(url)}>
                    <ImageBackground source={imagen} style={styles.image}>
                        <Text style={styles.text}>{texto}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    // Estilos para el contenedor principal
    image: {
        resizeMode: 'cover', // Ajusta el modo de redimensionamiento de la imagen
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginStart: 80,
        marginEnd: 80,
        height: 230,
        opacity: 0.9,
    },
    text: {
        color: '#1F2021', // Asegúrate de que el texto sea visible sobre la imagen
        fontSize: 20,
        fontWeight: 'bold',
        width: 252,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#AEB879',
    }
});

export default MenuCatalogo;

import React from 'react';
import { View, StyleSheet, Text, ScrollView, ImageBackground } from 'react-native';
import pedestales from '../../assets/images/pedestales.jpg';
import concreto from '../../assets/images/concreto.jpg';
import aire from '../../assets/images/aire.jpg';
import ceramica from '../../assets/images/ceramica.jpg';
import tierra from '../../assets/images/tierra.jpg';

import TotalCount from '../../common/total-count';
import MenuCatalogo from '../../common/menu-catalogo';

const Menu = ({ route }) => {
    const { url } = route.params;
    return (
        <View>
            <ScrollView horizontal={true} style={styles.containerHorizontalScrowView}>
                <View style={styles.containerHorizontal}>
                    <TotalCount imagen={pedestales} texto={"Pedestales"} producto={"pedestales"}/>
                    <TotalCount imagen={aire} texto={"Aire"} producto={"maceta-aire"} />
                    <TotalCount imagen={ceramica} texto={"Cerámica"} producto={"maceta-ceramica"} />
                    <TotalCount imagen={concreto} texto={"Concreto"} producto={"maceta-concreto"} />
                    <TotalCount imagen={tierra} texto={"Tierra"} producto={"maceta-tierra"} />
                </View>
            </ScrollView>

            <ScrollView>
                <View style={styles.container}>

                    <MenuCatalogo imagen={pedestales} texto={"Pedestales"} url={"pedestales"} />

                    <MenuCatalogo imagen={aire} texto={"Macetas Aire"} url={"maceta-aire"} />

                    <MenuCatalogo imagen={concreto} texto={"Macetas Concreto"} url={"maceta-concreto"} />

                    <MenuCatalogo imagen={ceramica} texto={"Macetas Cerámica"} url={"maceta-ceramica"} />

                    <MenuCatalogo imagen={tierra} texto={"Macetas Tierra"} url={"maceta-tierra"} />

                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    // Estilos para el contenedor principal
    container: {
        flex: 1,
        flexDirection: 'column',
        height: 1410,
    },
    // Estilos para el contenedor horizontal
    containerHorizontal: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    containerHorizontalScrowView:{
        marginBottom: 5,
    }

});

export default Menu;
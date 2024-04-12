import React from 'react';

import { View, StyleSheet } from 'react-native';

import Crud from '../../common/crud/crud';
import ViewTotalCount from '../../common/scroll-view-totalCount';

const Producto = ({ route }) => {

    const { producto, titulo } = route.params;

    return (
        <>
            <View>
                <ViewTotalCount producto={producto} />
            </View>
            
            <View style={styles.container}>
                <Crud producto={producto} titulo={titulo} />
            </View>
            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginTop: 20,
    },
});

export default Producto;
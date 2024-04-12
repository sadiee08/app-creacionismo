import React, { useEffect, useState } from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';

import pedestales from '../../assets/images/pedestales.jpg';
import concreto from '../../assets/images/concreto.jpg';
import aire from '../../assets/images/aire.jpg';
import ceramica from '../../assets/images/ceramica.jpg';
import tierra from '../../assets/images/tierra.jpg';

import TotalCount from '../../common/total-count';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const ViewTotalCount = ({ producto }) => {

    const [totalGrande, setTotalGrande] = useState(0);
    const [totalMediano, setTotalMediano] = useState(0);
    const [totalChico, setTotalChico] = useState(0);
    const [totalNoAplica, setTotalNoAplica] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const productCollection = collection(db, producto);

        const fetchTotalGrande = async () => {
            const g = query(productCollection, where('size', '==', 'Grande'));
            const querySnapshot = await getDocs(g);
            setTotalGrande(querySnapshot.size);
        };

        const fetchTotalMediano = async () => {
            const m = query(productCollection, where('size', '==', 'Mediano'));
            const querySnapshot = await getDocs(m);
            setTotalMediano(querySnapshot.size);
        }

        const fetchTotalChico = async () => {
            const c = query(productCollection, where('size', '==', 'Chico'));
            const querySnapshot = await getDocs(c);
            setTotalChico(querySnapshot.size);
        }

        const fetchNoAplica = async () => {
            const n = query(productCollection, where('size', '==', 'No aplica'));
            const querySnapshot = await getDocs(n);
            setTotalNoAplica(querySnapshot.size);
        }

        fetchTotalGrande();
        fetchTotalMediano();
        fetchTotalChico();
        fetchNoAplica();
        setTotal(totalGrande + totalMediano + totalChico + totalNoAplica);

    }, []);

    var imagen;

    if (producto === 'pedestales') {
        imagen = pedestales;
    } else if (producto === 'maceta-aire') {
        imagen = aire;
    } else if (producto === 'maceta-ceramica') {
        imagen = ceramica;
    } else if (producto === 'maceta-concreto') {
        imagen = concreto;
    } else if (producto === 'maceta-tierra') {
        imagen = tierra;
    }

    return (
        <>
            <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.containerHorizontal}>
                    <TotalCount imagen={imagen} texto={"Total"} producto={producto} totalProdutos={total} />
                    <TotalCount imagen={imagen} texto={"Chico"} producto={producto} totalProdutos={totalChico} />
                    <TotalCount imagen={imagen} texto={"Mediano"} producto={producto} totalProdutos={totalMediano} />
                    <TotalCount imagen={imagen} texto={"Grande"} producto={producto} totalProdutos={totalGrande} />
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    containerHorizontal: {
        flexDirection: 'row',
    },
    scrollViewContent: {
        flexGrow: 1,
    }

});

export default ViewTotalCount;
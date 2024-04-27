import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from "../../firebase/config.js";

import { db } from '../../firebase/config';
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { addDoc, serverTimestamp, deleteDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';

import { MaterialIcons } from '@expo/vector-icons';


const Home = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    task: '',
    completed: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const add = async (e) => {
    e.preventDefault();
    try {
      const res = await addDoc(collection(db, 'notas'), {
        ...formData,
        timeStamp: serverTimestamp()
      });

      setFormData({
        task: '',
        completed: false,
      });
      handleClose();

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'notas'),
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

  const toggleTask = async (taskId, completed) => {
    await updateDoc(doc(db, 'notas', taskId), {
      completed: !completed,
    });
  };


  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'notas', taskId));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleCreate = () => {
    navigation.navigate('ModalNotasCrear');
  };


  return (
    <View style={styles.container}>
      <View style={styles.displayText}>
        <Text style={styles.text}>Bienvenido {auth.currentUser?.email}</Text>
      </View>


      <TouchableOpacity style={styles.buttonAdd} onPress={() => handleCreate()}>
        <Text style={styles.buttonTextAdd}>+</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Pendientes</Text>

      <View style={styles.tabla}>
        <FlatList
          data={data}
          keyExtractor={item => item.idGuid}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.buttonComplete}
                onPress={() => toggleTask(item.idGuid, item.completed)}
              >

                <View style={styles.taskContainer}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={[styles.task, { textDecorationLine: item.completed ? 'line-through' : 'none' }]}>
                    {item.task}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTask(item.idGuid)} style={styles.trashButton}>
                <MaterialIcons name="delete" size={24} color="black" />
              </TouchableOpacity>

            </View>
          )}
        />

      </View>

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    marginBottom: 20,
    width: 300,
    textAlign: 'center',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  task: {
    fontSize: 18,
    marginLeft: 10,
  },
  buttonComplete: {
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
  bulletPoint: {
    fontSize: 25,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabla: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginEnd: 20,
    marginStart: 20,
    marginBottom: 20,
  },
  buttonAdd: {
    backgroundColor: '#AEB879',
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextAdd: {
    color: '#fff',
    fontSize: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingStart: 25,
    marginBottom: 10,
    marginTop: 20,
  },
  trashButton: {
    marginLeft: 'auto',
    paddingEnd: 10,
  },
});

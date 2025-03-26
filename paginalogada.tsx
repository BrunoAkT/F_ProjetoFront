import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App2() {

    const [nome, setNome] = useState("");
    
    useEffect(() =>{
        carregarNome()
    },[])

    async function carregarNome(){
        const nomeSalvo = await AsyncStorage.getItem('nome');
        if (nomeSalvo) setNome(nomeSalvo);
    }


    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Login
            </Text>
            <Text>
                {
                    nome
                }
            </Text>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        width: 200,
        margin: 4,
        padding: 10
    }

})
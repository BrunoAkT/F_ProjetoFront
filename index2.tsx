import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

    const [nome, setNome] = useState("");
    useEffect(() =>{
        carregarNome()
    },[])

    async function carregarNome(){
        const nomeSalvo = await AsyncStorage.getItem('nome');
        if (nomeSalvo) setNome(nomeSalvo);
    }

    async function salvarNome(){
        await AsyncStorage.setItem('nome', nome);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Salvar Nome
            </Text>
            <TextInput placeholder="Digite seu nome" value={nome} style={styles.input} onChangeText={setNome}></TextInput>
            <Button title="Salvar" onPress={salvarNome}></Button>
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
        margin: 10,
        padding: 10
    }

})
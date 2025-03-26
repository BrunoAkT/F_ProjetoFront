import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    const navigation = useNavigation();
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    
    useEffect(() =>{
        carregarNome()
    },[])

    async function carregarNome(){
        const nomeSalvo = await AsyncStorage.getItem('nome');
        if (nomeSalvo) setNome(nomeSalvo);
    }


    async function irParaTelaLogada(){
        await AsyncStorage.setItem('nome', nome);

        if (nome === 'Bruno' && senha === '123'){
            navigation.navigate('Menu'); //Erro que não afeta a aplicação
        } 
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Login
            </Text>
            <TextInput placeholder="Digite seu nome" value={nome} style={styles.input} onChangeText={setNome}></TextInput>
            <TextInput placeholder="Digite sua senha" value={senha} style={styles.input} onChangeText={setSenha}></TextInput>
            <Button title="Salvar" onPress={irParaTelaLogada}></Button>
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
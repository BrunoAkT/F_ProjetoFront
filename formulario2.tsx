import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function App() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [resultado, setResultado] = useState('');

    function somarNumeros(){
        const soma = parseFloat(num1)+parseFloat(num2);
        setResultado(soma.toString());
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Bem Vindo ao App!
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Digite primeiro número"
                value={num1}
                onChangeText={setNum1}>
            </TextInput>
            <TextInput
                style={styles.input}
                placeholder="Digite segundo número"
                value={num2}
                onChangeText={setNum2}>
            </TextInput>
            <Button title="Confirmar" onPress={somarNumeros}>
            </Button>
            {
                resultado !== null &&(
                    <Text style={styles.resultado}>
                        O resultado da soma é: {resultado}
                    </Text>
                )

            }
        </View >
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    },
    titulo:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:20,
    },
    input:{
        borderWidth:1,
        padding: 20,
        width:200,
        marginBottom:10,
        borderRadius:5,
    },
    resultado:{
        fontSize:24,
        color:'green',
        fontWeight:'bold',
        marginTop:20,
    }
})
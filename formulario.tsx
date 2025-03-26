import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";


function Formulario() {

    const [nome, setnome] = useState<string>("");
    const [idade, setidade] = useState<string>("");
    const [cidade, setcidade] = useState<string>("");
    const [mensagem, setmensagem] = useState<string>("");

    const handlePress = () => {
        setmensagem(`
Seu nome: ${nome}, 
Sua idade: ${idade}, 
Sua Cidade:${cidade}`);
    }

    return <View style={styles.container}>
        <Text style={styles.titulo}>Digite algo:</Text>
        <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setnome}
        ></TextInput>
        <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={cidade}
            onChangeText={setcidade}
        ></TextInput>
        <TextInput
            style={styles.input}
            placeholder="Idade"
            value={idade}
            onChangeText={setidade}
        ></TextInput>

        <Button title="Enviar" onPress={handlePress}></Button>
        {
            mensagem ? <Text style={styles.resultado}>{mensagem}</Text> : null
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    titulo: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        width: "75%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    resultado: {
        marginTop: 20,
        fontSize: 20,
        color: "red",
    }
})

export default Formulario;
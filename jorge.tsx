import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {

      
    useEffect(() =>{
        carregarNome()
    },[])

    async function carregarNome(){
        const nomeSalvo = await AsyncStorage.getItem('nome');
        setPaulo(JSON.parse(nomeSalvo));
    }


    async function AdicionarPaulo(){
        setPaulo(prevPaulo => {
            const novoPaulo = {
                id: String(prevPaulo.length + 1),
                nome: nome
            };
            const listaAtualizada = [...prevPaulo, novoPaulo];
            AsyncStorage.setItem('nome', JSON.stringify(listaAtualizada));
    
            return listaAtualizada;
        });
    }
    

    const [Paulo, setPaulo] = useState([]);
    const [nome, setNome] = useState('');

    return <View style={styles.container}>
        <TextInput placeholder="Digite o nome" style={styles.input} onChangeText={setNome}>
        </TextInput>
        <TouchableOpacity style={styles.button} onPress={AdicionarPaulo}>
            <Text>Adicionar</Text>
        </TouchableOpacity>

        <Text>Lista de nomes</Text>

        <FlatList data={Paulo} keyExtractor={item => item.id} renderItem={({ item }) => (
            <Text>{item.nome}</Text>
        )}>

        </FlatList>
    </View>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    button:{
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 10,
    }

})



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  // States para gerenciar o nome, lista de nomes, edição e consulta
  const [nome, setNome] = useState(''); 
  const [nomes, setNomes] = useState([]); 
  const [editIndex, setEditIndex] = useState(null); 
  const [consulta, setConsulta] = useState(''); 


  // Carregar os nomes salvos quando o componente for montado
  useEffect(() => {
    carregarNomes(); 
  }, []);


  // Função para carregar os nomes salvos no AsyncStorage
  async function carregarNomes() {
    const nomesSalvos = await AsyncStorage.getItem('nomes');
    if (nomesSalvos) {
      setNomes(JSON.parse(nomesSalvos)); // Atualiza o estado com os nomes salvos
    }
  }


  // Função para salvar ou editar o nome
  async function salvarNome() {
    if (nome.trim() === '') return; // Evita salvar um nome vazio


    // Se estiver editando, atualiza o nome na lista
    if (editIndex !== null) {
      const novaLista = [...nomes]; // Cria uma cópia da lista
      novaLista[editIndex] = nome; // Substitui o nome no índice da edição
      setNomes(novaLista); // Atualiza o estado com a nova lista
      await AsyncStorage.setItem('nomes', JSON.stringify(novaLista)); // Salva a nova lista
      setEditIndex(null); // Limpa o índice de edição
    } else {
      // Se for adicionar um novo nome
      const novaLista = [...nomes, nome]; // Adiciona o nome à lista
      setNomes(novaLista); // Atualiza o estado com a nova lista
      await AsyncStorage.setItem('nomes', JSON.stringify(novaLista)); // Salva a nova lista
    }


    setNome(''); // Limpa o campo de texto após salvar
  }


  // Função para excluir um nome
  async function excluirNome(index) {
    const novaLista = nomes.filter((_, i) => i !== index); // Filtra o item que será excluído
    setNomes(novaLista); // Atualiza o estado com a nova lista
    await AsyncStorage.setItem('nomes', JSON.stringify(novaLista)); // Salva a lista atualizada stringigy trazendo dados em JSON
  }


  // Função para editar um nome
  function editarNome(index) {
    setNome(nomes[index]); // Preenche o campo de texto com o nome a ser editado
    setEditIndex(index); // Define o índice do item que está sendo editado
  }


  // Função para limpar a lista de nomes
  async function limparLista() {
    await AsyncStorage.removeItem('nomes'); // Remove a lista salva do AsyncStorage
    setNomes([]); // Limpa o estado de nomes
  }


  // Função para filtrar os nomes com base na consulta
  function filtrarNomes() {
    if (consulta.trim() === '') {
      return nomes; // Se a consulta estiver vazia, retorna todos os nomes
    }
    return nomes.filter(nome => nome.toLowerCase().includes(consulta.toLowerCase())); // Filtra os nomes
  }


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Digite seu Nome</Text>
      
      {/* Campo de texto para inserir ou editar o nome */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome} // Atualiza o estado 'nome' quando o texto é alterado
      />
      {/* Botão para adicionar ou salvar a edição do nome */}
      <Button title={editIndex !== null ? 'Salvar Edição' : 'Adicionar'} onPress={salvarNome} />
      
      {/* Campo de pesquisa para consultar os nomes */}
      <TextInput
        style={styles.input}
        placeholder="Buscar nome"
        value={consulta}
        onChangeText={setConsulta} // Atualiza o estado 'consulta' quando o texto é alterado
      />
      <Button title="Consultar" onPress={filtrarNomes} /> {/* Botão para aplicar a consulta */}
      
      {/* Lista de nomes */}
      <FlatList
        data={filtrarNomes()} // Filtra os nomes antes de exibi-los
        keyExtractor={(item, index) => index.toString()} // Usa o índice como chave
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item}</Text> {/* Exibe o nome */}
            
            {/* Botões para editar e excluir */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => editarNome(index)} style={styles.button}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirNome(index)} style={[styles.button, styles.deleteButton]}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* Botão para limpar a lista de nomes */}
      <Button title="Limpar Lista" onPress={limparLista} color="red" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: 250,
    marginBottom: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  item: {
    fontSize: 18,
    marginVertical: 5,
    width: '70%',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 5,
    marginLeft: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons'


export default function Menu() {
    const [nome, setNome] = useState("");

    const [novoNome, setNovoNome] = useState("");
    const [novoValor, setNovoValor] = useState("");
    const [linkImage, setLinkImage] = useState("");
    const [novaCondicao, setNovaCondicao] = useState("Factory New");

    const [consulta, setConsulta] = useState("");
    const [novosItens, setNovosItens] = useState([]);
    const [editarItem, setEditarItem] = useState(null);


    useEffect(() => {
        carregarNome()
        carregarItens()
    }, [])

    async function carregarNome() {
        const nomeSalvo = await AsyncStorage.getItem('nome');
        if (nomeSalvo) setNome(nomeSalvo);
    }
    async function carregarItens() {
        const itensSalvos = await AsyncStorage.getItem('itens');
        if (itensSalvos) setNovosItens(JSON.parse(itensSalvos));
    }
    async function salvarItem() {
        if (!novoNome.trim() || !novoValor.trim() || !novaCondicao.trim() || !linkImage.trim()) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        try {
            let listaAtualizada;

            if (editarItem) {
                listaAtualizada = novosItens.map(item =>
                    item.id === editarItem.id
                        ? {
                            ...item,
                            nome: novoNome,
                            valor: parseFloat(novoValor),
                            condicao: novaCondicao,
                            imagem: linkImage
                        }
                        : item
                );
            } else {
                const novoItem = {
                    id: String(Math.random().toString(36).substr(2, 9)),
                    nome: novoNome,
                    valor: parseFloat(novoValor),
                    floart: 0.0000214,
                    condicao: novaCondicao,
                    imagem: linkImage,
                };
                listaAtualizada = [...novosItens, novoItem];
            }

            await AsyncStorage.setItem('itens', JSON.stringify(listaAtualizada));
            setNovosItens(listaAtualizada);

            setNovoNome('');
            setNovoValor('');
            setNovaCondicao('Factory New');
            setLinkImage('');
            setEditarItem(null);

            Alert.alert('Sucesso', 'Item salvo com sucesso');
        } catch (error) {
            console.error('Erro ao salvar:', error);
            Alert.alert('Erro', 'Não foi possível salvar o item');
        }
    }
    function handleEdit(id) {
        const itemParaEditar = novosItens.find(item => item.id === id);
        if (itemParaEditar) {
            setNovoNome(itemParaEditar.nome);
            setNovoValor(itemParaEditar.valor.toString());
            setNovaCondicao(itemParaEditar.condicao);
            setLinkImage(itemParaEditar.imagem);
            setEditarItem(itemParaEditar); // Agora armazenamos o objeto completo
        }
    };
    async function DeletarItem(id) {
        const novaLista = novosItens.filter(item => item.id !== id); // Filtra o item que será excluído
        setNovosItens(novaLista); // Atualiza o estado com a nova lista
        await AsyncStorage.setItem('itens', JSON.stringify(novaLista));
    };

    return <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.titulo}>Inventário</Text>
            <Text style={styles.msg}>Olá {nome}, Bem vindo ao seu inventário</Text>
            <Text style={styles.msg}>Veja Aqui seus itens</Text>
        </View>

        <View>
            <Text style={styles.msg}>{editarItem ? "Editando Item" : "Inserir Novo Item"}</Text>
            <View style={styles.inputLabel}>
                <TextInput
                    placeholder="Nome:"
                    value={novoNome}
                    onChangeText={setNovoNome}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Valor: R$"
                    value={novoValor}
                    onChangeText={setNovoValor}
                    keyboardType="numeric"
                    style={styles.input}
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={novaCondicao}
                        onValueChange={(itemValue) => setNovaCondicao(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Factory New" value="Factory New" />
                        <Picker.Item label="Minimal Wear" value="Minimal Wear" />
                        <Picker.Item label="Field-Tested" value="Field-Tested" />
                        <Picker.Item label="Well-Worn" value="Well-Worn" />
                        <Picker.Item label="Battle-Scarred" value="Battle-Scarred" />
                    </Picker>
                </View>
                <TextInput
                    placeholder="Link da Imagem:"
                    value={linkImage}
                    onChangeText={setLinkImage}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.addButton} onPress={salvarItem}>
                    <Text style={styles.addButtonText}>{editarItem ? "Salvar Edição" : "Adicionar"}</Text>
                </TouchableOpacity>

            </View>
        </View>
        <View style={styles.MasterTitle}>
            <Text style={styles.masterTitleCaption}>Item</Text>
            <TextInput placeholder="🔍︎" style={styles.search} onChangeText={setConsulta}></TextInput>
            <Text style={styles.masterPriceCaption}>Price</Text>
        </View>
        <FlatList
            style={styles.flatlist}
            data={novosItens.filter(item =>
                item.nome.toLowerCase().includes(consulta.toLowerCase()) // Filtra pelo nome
            )}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Image
                        source={{ uri: item.imagem }} // Carrega a imagem da URL
                        style={styles.itemImage} // Estilo da imagem
                    />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemname}>{item.nome}</Text>
                        <View style={styles.caption}>
                            <Text style={styles.TitleCaption}>Condição: </Text>
                            <Text style={styles.Itemfloat}>{item.condicao}
                                {item.condicao === 'Factory New' ? <Text style={styles.itemFloart}> {item.floart}</Text> : ''}
                            </Text>
                            {/* <Text style={styles.Itemfloat}>{item.Exterior}</Text> */}
                        </View>

                    </View>
                    <View style={styles.itemPriceContainer}>
                        <Text style={styles.itemprice}>
                            {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Text>
                    </View>
                    <View style={styles.itemActions}>
                        <Icon
                            name="edit"
                            size={35}
                            color="blue"
                            style={styles.Icon}
                            onPress={() => handleEdit(item.id)}
                        />
                        <Icon
                            name="delete"
                            size={35}
                            color="red"
                            style={styles.Icon}
                            onPress={() => DeletarItem(item.id)}
                        />
                    </View>
                </View>
            )}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    msg: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    inputLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    input: {
        backgroundColor: 'white',
        width: '25%',
        fontSize: 16,
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    pickerContainer: {
        backgroundColor: 'white',
        width: '25%',
        marginVertical: 5,
    },
    picker: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        height: '100%',
        fontSize: 16,
    },
    addButton: {
        width: '10%',
        backgroundColor: '#5CFBFF',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {

    },
    flatlist: {
        marginTop: 10,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        marginBottom: 2,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    itemInfo: {
        flex: 3,
    },
    itemname: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    Itemfloat: {
        fontSize: 14,
        color: 'blue',
        marginTop: 5,

    },
    itemPriceContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    itemprice: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green',
    },
    caption: {
        flexDirection: 'row'
    },
    TitleCaption: {
        color: 'Black',
        fontSize: 15,
        marginTop: 5,
        fontWeight: 'bold'
    },
    MasterTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        marginHorizontal: 10,
    },
    masterTitleCaption: {
        color: 'Black',
        fontWeight: 'bold',
        marginLeft: 100,
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    masterPriceCaption: {
        color: 'Black',
        fontWeight: 'bold',
        marginRight: 200,
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    search: {
        backgroundColor: '#f5f5f5',
        width: 300,
        height: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    itemActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    Icon: {
        margin: 10,
    },
    itemFloart: {
        color: 'red',
        fontWeight: 'bold',
    }
});
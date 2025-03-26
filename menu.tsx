import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from '@react-native-picker/picker'; // Instale com: npm install @react-native-picker/picker
import Icon from 'react-native-vector-icons/MaterialIcons'


export default function Menu() {
    const [nome, setNome] = useState("");

    const [novoNome, setNovoNome] = useState("");
    const [novoValor, setNovoValor] = useState("");
    const [linkImage, setLinkImage] = useState("");
    const [novaCondicao, setNovaCondicao] = useState("Factory New");

    useEffect(() => {
        carregarNome()
    }, [])

    async function carregarNome() {
        const nomeSalvo = await AsyncStorage.getItem('nome');
        if (nomeSalvo) setNome(nomeSalvo);
    }

    const itens = [{
        id: 1,
        name: 'Butter-fly Gamma Doppler',
        Exterior: 'Factory New',
        float: 0.0000156,
        price: 124000.00,
        image: 'https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPD1PrbQqW9e-NV9j_v-5YT0m1HnlB81NDG3Oo7HcwM5NQ7U_gO8yb28gZG07ZvIzXdivXMg4HvUyhDkiR4eZ-Rv1qGACQLJqUKvgfw/360fx360f'
    },
    {
        id: 2,
        name: 'M9 tiger tooth',
        Exterior: 'Factory New',
        float: 0.0234211,
        price: 5000.00,
        image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmcjgOrzUhFRe-sR_jez--YXygED6_0o4ZjildoDBdVA_ZguC-gO9yeq90Je4vZuYwHdguSgm5H7am0TkhAYMMLKzxtQfiA'

    }];

    const handleEdit = (id) => {
        console.log(`Editar item com ID: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Excluir item com ID: ${id}`);
    };
    
    return <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.titulo}>Inventário</Text>
            <Text style={styles.msg}>Olá {nome}, Bem vindo ao seu inventário</Text>
            <Text style={styles.msg}>Veja Aqui seus itens</Text>
        </View>

        <View>
            <Text style={styles.msg}>Inserir Novo item</Text>
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
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
                
            </View>
        </View>
        <View style={styles.MasterTitle}>
            <Text style={styles.masterTitleCaption}>Item</Text>
            <Text style={styles.masterPriceCaption}>Price</Text>
        </View>
        <FlatList
            style={styles.flatlist}
            data={itens}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Image
                        source={{ uri: item.image }} // Carrega a imagem da URL
                        style={styles.itemImage} // Estilo da imagem
                    />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemname}>{item.name}</Text>
                        <View style={styles.caption}>
                            <Text style={styles.TitleCaption}>Condição: </Text>
                            <Text style={styles.Itemfloat}>{item.Exterior}</Text>
                            {/* <Text style={styles.Itemfloat}>{item.Exterior}</Text> */}
                        </View>

                    </View>
                    <View style={styles.itemPriceContainer}>
                        <Text style={styles.itemprice}>{item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
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
                            onPress={() => handleDelete(item.id)}
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
    masterPriceCaption :{
        color: 'Black',
        fontWeight: 'bold',
        marginRight: 200,
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    itemActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    Icon:{
        margin: 10,
    }
});
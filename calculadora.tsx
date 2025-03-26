import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";




export default function Calculadora() {
    const [valor, setValor] = useState<string>("");
    const [valor2, setValor2] = useState<string>("");
    const [resultado, setResultado] = useState<string>("");


    function Metodo(arg: string) {
        let valorfinal: number;
        switch (arg) {
            case '+':
                valorfinal = parseFloat(valor) + parseFloat(valor2);
                break;
            case '-':
                valorfinal = parseFloat(valor) - parseFloat(valor2);
                break;
            case '/':
                valorfinal = parseFloat(valor) / parseFloat(valor2);
                break;
            case '*':
                valorfinal = parseFloat(valor) * parseFloat(valor2);
                break;
            case '^':
                valorfinal = Math.pow(parseFloat(valor), parseFloat(valor2));
                break;
        }
        return setResultado(valorfinal.toString());
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Calculadora
            </Text>
            <Text style={styles.texto}>
                Digite dois números para realizar a operação
            </Text>
            <TextInput placeholder="Digite o primeiro número" style={styles.input} value={valor} onChangeText={setValor}></TextInput>
            <TextInput placeholder="Digite o segundo número" style={styles.input} value={valor2} onChangeText={setValor2}></TextInput>
            <View style={styles.botaos}>
                <Button title="+" onPress={() => Metodo('+')}></Button>
                <Button title="-" onPress={() => Metodo('-')}></Button>
                <Button title="/" onPress={() => Metodo('/')}></Button>
                <Button title="*" onPress={() => Metodo('*')}></Button>
                <Button title="^" onPress={() => Metodo('^')}></Button>
            </View>
            {
                resultado !== "" && (
                    <Text>
                        O resultado da operação é: {resultado}
                    </Text>
                )

            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    texto: {
        fontSize: 15,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        padding: 20,
        width: 200,
        marginBottom: 10,
        borderRadius: 5,
    },
    resultado: {
        fontSize: 24,
        color: 'green',
        fontWeight: 'bold',
        marginTop: 20,
    },
    botaos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 150,
    }
})
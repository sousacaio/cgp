import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Dimensions, Picker, Button, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen')
const Melhora = () => {

    const navigation = useNavigation();
    const [state, setState] = useState({ height });
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [awaitedResults, setAwaitedResults] = useState('');

    const [selectedValue, setSelectedValue] = useState("");
    const updateSize = (height) => { setState({ height }); }
    const [id, setId] = useState('');
    useEffect(() => {
        AsyncStorage.getItem('_id').then((r) => { setId(r) });
    }, [height]);
    const sendForm = async () => {
        if (!title && !description && !selectedValue && !awaitedResults) {
            alert('Todos os campos são obrigatórios!')
        } else {
            await Axios.post('http://192.168.15.5:3000/v1/projects/create', {
                active: true,
                category: 'Melhora de processo',
                coordinator: id,
                title,
                description,
                directionedTo: '',
                department: selectedValue,
                awaitedResults,
            });
            navigation.navigate('Home')
        }

    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputStyle}
                placeholder="Título"
                onChangeText={(e) => { setTitle(e) }}
            />
            <TextInput
                style={[styles.inputStyle, { height: state.height }]}
                placeholder="Descrição"
                multiline
                editable
                onChangeText={(e) => { setDescription(e) }}
                onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
            />
            <View
                style={{
                    borderColor: '#27ae60',
                    borderWidth: 1,
                    borderRadius: 5,
                    alignSelf: 'center',
                }}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ width: width / 1.06 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    mode="dropdown"
                >
                    <Picker.Item label="Escolha o departamento" enabled={false} />
                    <Picker.Item label="Departamento 1" value="1" />
                    <Picker.Item label="Departamento 2" value="2" />
                    <Picker.Item label="Departamento 3" value="3" />
                </Picker>
            </View>
            <TextInput
                style={styles.inputStyle}
                placeholder="Resultados esperados"
                onChangeText={(e) => { setAwaitedResults(e) }}
            />
            <Button title="Enviar projeto" color="#27ae60" onPress={() => { sendForm() }} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    },
    inputStyle: {
        height: 40,
        borderColor: '#27ae60',
        borderWidth: 1,
        borderRadius: 3,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    }
})
export default Melhora;
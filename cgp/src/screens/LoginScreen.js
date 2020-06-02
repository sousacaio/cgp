import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import axios from 'axios';
import { useAuth } from '../../authContext'
import { TextInput } from "react-native-gesture-handler";
const { width, height } = Dimensions.get('screen')
import AsyncStorage from '@react-native-community/async-storage';
const Login = (props) => {
    const { login } = useAuth()
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const logar = async () => {
        if (!credential || !password) {
            alert('Credenciais inválidas');
        } else {
            await axios.post('http://192.168.15.5:3000/v1/users/auth',
                { email: credential, password }).then(async (r) => {
                    const { user } = r.data;
                    if (user) {
                        await AsyncStorage.setItem('_id', user._id);
                        await AsyncStorage.setItem('name', user.name);
                        login();
                    } else {
                        alert('Credenciais inválidas');
                    }
                });
        }
    }
    return (
        <View style={styles.container}>
            <Text>CGP</Text>
            <View style={styles.buttonsContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setCredential(text)}
                    value={credential}
                    placeholder="Matricula ou email"
                />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    type="password"
                    placeholder="Senha"
                />
                <Button title="Logar" color="#27ae60" onPress={() => { logar() }} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsContainer: {
        justifyContent: 'center',
        flex: 1,
        width: width / 1.5,
        height: height / 2,
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
export default Login;
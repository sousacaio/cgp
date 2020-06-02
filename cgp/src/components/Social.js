import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Dimensions, ScrollView } from 'react-native'

const { width, height } = Dimensions.get('screen')
const Social = () => {
    const [state, setState] = useState({ height });
    const [newStyle, setNewStyle] = useState({ height });

    const updateSize = (height) => {
        setState({ height });
    }
    useEffect(() => {
        const { height } = state;
        setNewStyle(height)
    }, [height])
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.buttonsContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Título"
                    />
                    <TextInput
                        style={[styles.inputStyle, { height: state.height }]}
                        placeholder="Descrição"
                        multiline
                        editable
                        onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Publico beneficiário"
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Resultados esperados"
                    />
                    <Button title="Enviar projeto" color="#27ae60" />
                </View>
            </ScrollView>
        </View>
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

export default Social;
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Social from "../components/Social";
import Melhora from "../components/Melhora";

const NewProject = (props) => {
    const [state, setState] = useState({ sociais: true, melhora: false });

    return (
        <View style={styles.container}>
            <View style={styles.choiceCard}>
                <View style={styles.choiceCardTitle}>
                    <Text style={{ color: 'white', fontSize: 25 }}>Escolha o tipo de projeto </Text>
                </View>
                <View style={styles.choiceCardIcons}>
                    <View style={styles.choiceCardIconsBox}>
                        <CheckBox
                            tintColors={{ true: 'white', false: 'white' }}
                            value={state.sociais}
                            onValueChange={() => setState({ sociais: true, melhora: false })}
                        />
                        <Icon name="hands-helping" size={50} color="white" />

                    </View>
                    <View style={styles.choiceCardIconsBox}>
                        <CheckBox
                            tintColors={{ true: 'white', false: 'white' }}
                            value={state.melhora}
                            onValueChange={() => setState({ sociais: false, melhora: true })}
                        />
                        <Icon name="rocket" size={50} color="white" />

                    </View>
                </View>
            </View>
            <View style={styles.formCard}>
                <View style={styles.formCardTitle}>
                    {state.sociais === true
                        ? <Text style={{ fontSize: 25 }}>Sociais</Text>
                        : <Text style={{ fontSize: 25 }}>Melhoria de processo</Text>}
                </View>
                <View style={styles.formCardForms}>
                    {state.sociais === true
                        ? <Social />
                        : <Melhora />}
                </View>

            </View >
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    choiceCard: {
        flex: 1,
        backgroundColor: '#27ae60',
        borderRadius: 10,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',

    },
    choiceCardTitle: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#27ae60',
        borderBottomColor: 'white'
    },
    choiceCardIcons: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    choiceCardIconsBox: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around',

    },
    formCard: {
        flex: 3,
        borderRadius: 10,
        margin: 10,
    },
    formCardTitle: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderBottomColor: '#27ae60'
    },
    formCardForms: {
        flex: 7
    },
    diff: {
        flex: 1
    }


})
export default NewProject;
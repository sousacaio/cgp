import React, { useState, useEffect } from 'react';
import { Text, RefreshControl, ScrollView, View, StyleSheet, Dimensions, TextInput } from 'react-native';
import moment from "moment";
moment.locale('pt');
const { width, height } = Dimensions.get('screen')
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
    'Warning', // TODO: Remove when fixed
])
export default Project = (props) => {
    const { route: { params: { item } } } = props;
    const { route: { params: { item: {
        collaborators, active, category,
        title, description, directionedTo,
        department, awaitedResults, comments,
        benefited, createdAt } } } } = props;

    const data = moment(createdAt).format('DD/MM/YYYY, H:mm');

    const [refreshing, setRefreshing] = React.useState(false);
    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);
    const [icon, setIcon] = useState('');

    useEffect(() => {
        if (category === 'Sociais') {
            setIcon('hands-helping')
        } else {
            setIcon('rocket');
        }
    }, [])
    return (
        <View style={{ flexDirection: 'column', height, justifyContent: 'space-around' }}>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {/* <Text>{JSON.stringify(item)}</Text> */}
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <View style={{ borderRadius: 2, borderBottomColor: 'white', borderWidth: 1, borderColor: '#27ae60' }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 25,
                                }}>{title}</Text>
                            </View>
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                            }}>{data}</Text>
                        </View>
                        <View >

                            <View style={{ flex: 1, alignSelf: 'center', borderRadius: 2, borderBottomColor: 'white', borderWidth: 1, borderColor: '#27ae60' }}>
                                <Icon name={icon} size={30} color="white" />
                            </View>
                            <Text style={{ color: 'white', fontSize: 15 }}>{category}</Text>
                        </View>
                    </View>
                    <View style={styles.description}>
                        <View style={{ borderRadius: 2, borderBottomColor: 'white', borderWidth: 1, borderColor: '#27ae60' }}>
                            <Text style={{ fontSize: 30, color: 'white' }}>Descrição</Text>
                        </View>
                        <Text style={{ fontSize: 30, color: 'white' }}>{description}</Text>
                    </View>
                    {category === 'Sociais' ?
                        <View style={styles.body}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={{ color: 'white', fontSize: 15, borderRadius: 2, borderBottomColor: 'white', borderWidth: 1, borderColor: '#27ae60' }}>Publico beneficiado:</Text>
                                <Text style={{ color: 'white', fontSize: 15, borderRadius: 2, borderBottomColor: 'white', borderWidth: 1, borderColor: '#27ae60' }}>{benefited}</Text>
                            </View>
                            <View style={{ margin: 1, borderRadius: 2, borderTop: 'white', borderWidth: 1, borderColor: '#27ae60' }}>
                                <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', margin: 10 }}>
                                    Resultados esperados</Text>
                                <Text style={{ fontSize: 20, color: 'white ' }}>{awaitedResults}</Text>
                            </View>
                        </View>
                        :
                        <View style={styles.body}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={{ color: 'white', fontSize: 15, borderRadius: 2, borderBottomColor: 'white', borderWidth: 1, borderColor: '#27ae60' }}>Departamento que será aplicado:</Text>
                                <Text style={{ color: 'white', fontSize: 15, borderRadius: 2, borderBottomColor: 'white', borderWidth: 1, borderColor: '#27ae60' }} >{department}</Text>
                            </View>
                            <View>
                                <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', margin: 10 }}>
                                    Resultados esperados</Text>
                                <Text style={styles.text}>{awaitedResults}</Text>
                            </View>
                        </View>
                    }

                    <View >
                        {comments.length > 0
                            ?
                            <View>

                                {item.comments.map((r) => {
                                    moment.locale('pt');
                                    const horas = moment(r.date).fromNow();
                                    return (
                                        <View style={styles.body}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'white', fontSize: 20, }}>{r.name}</Text>
                                                <Text style={{ color: 'white', fontSize: 20, }}> - {horas}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <Text style={{ color: 'white', fontSize: 15, }}>{r.content}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                                                <Icon name="arrow-up" size={20} color="white" />
                                                <Text style={{ color: 'white', fontSize: 15 }}>
                                                    {(r.upvote.length - r.downvote.length)}
                                                </Text>
                                                <Icon name="arrow-down" size={20} color="white" />
                                            </View>
                                        </View>)
                                })}

                            </View>
                            :
                            <View style={styles.body}>
                                <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', margin: 10 }}>Sem comentários</Text>
                            </View>}
                    </View>
                </View >
            </ScrollView >
            <View style={{
                flex: 1,
                position: 'absolute',
                flexDirection: 'row',
                bottom: 25,
                width: width,
                backgroundColor: '#27ae60'
            }}>
                <TextInput
                    keyboardType="default"
                    style={{
                        flex: 5,
                        height: 40,
                        borderWidth: 1,
                        borderColor: 'white',
                        borderRadius: 3,
                        padding: 10,
                        margin: 10,
                        marginBottom: 10,
                        color: 'white'
                    }}
                    placeholder="Deixe seu comentário aqui"
                    onChangeText={(e) => { console.log(e) }}
                />
                <View style={{ flex: 1, margin: 10, marginRight: 0 }}>
                    <Icon name="comment-alt" color="white" size={40} />
                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
    },
    header: {
        backgroundColor: '#27ae60',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        margin: 5,
        borderRadius: 10
    },
    body: {
        backgroundColor: '#27ae60',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
        margin: 5,
        borderRadius: 10,
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,

    },
    text: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center'
    },
    description: {
        backgroundColor: '#27ae60',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
        margin: 5,
        borderRadius: 10
    },
});


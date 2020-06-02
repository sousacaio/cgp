import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('screen');

export default Card = ({ title, category, description, comments }) => {
    const [icon, setIcon] = useState('');

    useEffect(() => {
        if (category === 'Sociais') {
            setIcon('hands-helping')
        } else {
            setIcon('rocket');
        }
    }, [])
    return (
        <View style={styles.card}>
            <View style={styles.cardTop}>
                <Text style={styles.cardTopTitle}>{title}</Text>
                <View><Icon name={icon} size={30} color="#27ae60" /></View>
            </View>
            <View style={styles.cardContent} >
                <Text>{description}</Text>
            </View>
            <View style={styles.cardFooter} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 15 }}>
                    <Icon name="arrow-up" size={20} color="#27ae60" />
                    <Text style={styles.cardFooterCounter}>0</Text>
                    <Icon name="arrow-down" size={20} color="#27ae60" />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1, marginRight: 15, marginLeft: 15 }}>
                    <Icon name="comment-alt" size={20} color="#27ae60" />
                    <Text style={styles.cardFooterCounter}>{comments}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1, marginLeft: 15 }}>
                    <Icon name="share" size={20} color="#27ae60" />
                </View>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 10,
        margin: 10,
        borderRadius: 10
    },
    cardTop: {
        flex: 1,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ecf0f1',
        borderBottomColor: '#27ae60',
        borderWidth: 1
    },
    cardTopTitle: {
        fontSize: 30
    },
    cardContent: {
        flex: 2,
        margin: 10,
    },
    cardFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
        margin: 15,
        marginTop: 20,
        borderColor: '#ecf0f1',
        borderTopColor: '#27ae60',
        borderWidth: 1
    },
    cardFooterCounter: {
        fontSize: 20,
        color: '#27ae60'
    }


})

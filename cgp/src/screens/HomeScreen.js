import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, RefreshControl, ScrollView } from "react-native";
const { width, height } = Dimensions.get('screen');
import Card from '../components/Card';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Axios from "axios";
import { YellowBox } from 'react-native'

import { useNavigation } from '@react-navigation/native';

YellowBox.ignoreWarnings([
    'Warning', // TODO: Remove when fixed
])

const Home = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [state, setstate] = useState([])
    const navigation = useNavigation();
    const getProjects = async () => {
        const projects = await Axios.get('http://192.168.15.5:3000/v1/projects');
        setstate(projects.data.project);
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);
    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    useEffect(() => {
        getProjects()
    }, [refreshing])
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <FlatList
                data={state}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Project', { item });

                    }}>
                        <Card
                            title={item.title}
                            category={item.category}
                            comments={item.comments.length}
                            description={item.category} />
                    </TouchableOpacity>
                )
                }
                keyExtractor={(item) => item._id}
            />
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
    },
})
export default Home;
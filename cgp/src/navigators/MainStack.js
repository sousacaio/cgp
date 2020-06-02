import * as React from 'react';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {
    DrawerItem,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useAuth } from '../../authContext';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
} from 'react-native-paper';
import Login from '../screens/LoginScreen';
import NewProject from '../screens/NewProjectScreen';
import Home from '../screens/HomeScreen';
import Project from '../components/Project';

const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createDrawerNavigator();
export function DrawerContent() {
    AsyncStorage.getItem('name').then((r) => { setValue(r) })
    const [value, setValue] = React.useState('');
    const navigation = useNavigation();
    return (
        <DrawerContentScrollView>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <Avatar.Image size={70} />
                    <Title style={styles.title}>{value}</Title>
                    <Caption style={styles.caption}></Caption>
                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                200
                             </Paragraph>
                            <Caption style={styles.caption}>Projetos</Caption>
                        </View>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                159
                            </Paragraph>
                            <Caption style={styles.caption}>Aprovados</Caption>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem

                        label="Projetos"
                        onPress={() => { navigation.navigate('Home') }}
                    />
                    <DrawerItem

                        label="Novo projeto"
                        onPress={() => { navigation.navigate('NewProject') }}
                    />
                    <DrawerItem

                        label="Meus projetos"
                        onPress={() => { }}
                    />
                    <DrawerItem

                        label="Colaborações"
                        onPress={() => { }}
                    />
                </Drawer.Section>
                <Drawer.Section title="Preferências">
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.preference}>
                            <Text>Modo noturno</Text>
                            <View pointerEvents="none">
                                <Switch value={false} />
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
    )
}
const AuthNavigator = () => {
    return (
        <AuthStack.Navigator
            headerMode="float"
            screenOptions={{
                cardOverlayEnabled: true,
                gestureEnabled: true,
            }}>
            <AuthStack.Screen name="Login" component={Login} />
        </AuthStack.Navigator>
    );
};
const HomeNavigator = () => {
    return (


        <Tab.Navigator headerMode="float"
            screenOptions={{
                cardOverlayEnabled: true,
                gestureEnabled: true,
            }}
            drawerContent={() => <DrawerContent />}
        >
            <Tab.Screen name="Home" component={Home} options={{
                title: 'Projetos',
                headerRight: () => <SignOutButton />,
            }} />
            <Tab.Screen name="NewProject" component={NewProject} options={{
                title: 'Novo projeto',
                headerRight: () => <SignOutButton />,
            }} />
            <Tab.Screen name="Project" component={Project} options={{
                title: 'Project',
                headerRight: () => <SignOutButton />,
            }} />
        </Tab.Navigator>
    );
};

export const RootNavigator = () => {
    const { status } = useAuth();

    return (
        <RootStack.Navigator
            headerMode="none"
        >
            {status === 'signOut' ? (
                <RootStack.Screen name="Auth" component={AuthNavigator} />
            ) : (
                    <RootStack.Screen name="App" component={HomeNavigator} />
                )}
        </RootStack.Navigator>
    );
};

const SignOutButton = () => {
    const { singOut } = useAuth();
    return (
        <Button mode="text" onPress={() => singOut()}>
            Log Out
        </Button>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Sampler} from "./sampler/Sampler";
import {Local} from "./Local";
import {Freesound} from "./freesound/Freesound";
import {Library} from "./library/Library";

export const Main = (props) => {
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#E7414D',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                options={{
                    tabBarLabel: 'Sampler',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="folder-music" color={color} size={size} />
                    )}}
                name="Sampler"
                component={Sampler}/>
            <Tab.Screen
                options={{
                    tabBarLabel: 'Bibliothèque',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="folder-music" color={color} size={size} />
                    )}}
                name="Bibliothèque"
                component={Library}/>
            <Tab.Screen
                options={{
                    tabBarLabel: 'Télécharger',
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="applemusic" color={color} size={size} />
                    )}}
                name="Télécharger"
                component={Freesound}/>
        </Tab.Navigator>
    )
}

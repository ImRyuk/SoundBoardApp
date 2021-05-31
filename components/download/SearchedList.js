import React from 'react';
import {View, Text, FlatList, StyleSheet} from "react-native";
import {Avatar, ListItem} from "react-native-elements";
import {LinearGradient} from "expo-linear-gradient";

const style = StyleSheet.create({
    container: {
        paddingBottom: 20,
        backgroundColor: "#F8F8F8"
    },
    subtitle: {
        color: 'white'
    },
    title: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export function SearchedList (props) {
    const sounds = props.sounds;
    const navigation = props.navigation;
    const renderItem = ({ item, index }) => (
        <ListItem style={style.container} linearGradientProps={{
            colors: index %2 === 0 ? ['#7F7FD5', '#86A8E7', '#91EAE4'] : ['#fe8c00', '#f83600'],
            start: { x: 0, y: 1 },
            end: { x: 0.2, y: 0 },
        }}
                  ViewComponent={LinearGradient} >
            <ListItem.Content>
                <ListItem.Title style={style.title}>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron onPress={() => {console.log('clicked')}} color="white" />
        </ListItem>
    )

    return (
        <View className="sounds">
            <Text h2>Liste recherchée</Text>
            <FlatList
                data={sounds}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
export default SearchedList;

import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from "react-native";
import {Avatar, ListItem} from "react-native-elements";
import {LinearGradient} from "expo-linear-gradient";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

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
    const[loading, setLoading] = useState(false);
    const sounds = props.sounds;
    const navigation = props.navigation;

    const handleSound = (sound) => {
        setLoading(true),
            axios.get('https://freesound.org/apiv2/sounds/' + sound.id +'?&token=SwLolZcTQXWhsHzHE2ym0IPuCZmzJnyzx1d0p6Xb')
                .then(function (response) {
                    if(response.data.id === 0){
                        alert('aucun résultat!')
                    } else {
                        const sound = response.data;
                        setLoading(false);
                        navigation.navigate('Sound', {
                            sound: sound
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

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
            {loading ? <Spinner
                visible={loading}
                textContent={'Loading...'}
            /> : <ListItem.Chevron onPress={() => {handleSound(item)}} color="white" />}
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

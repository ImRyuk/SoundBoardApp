import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from "react-native";
import { ListItem} from "react-native-elements";
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

    const getColor = (index) => {
        let color;
        index %2 === 0 ? color = {backgroundColor: '#00AFB9'} : color = {backgroundColor: '#F07167'} ;
        return color;
    }


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
        <ListItem bottomDivider style={[style.container, getColor(index)]}
                  onPress={() => {handleSound(item)}}
        >
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.duration}</ListItem.Subtitle>
            </ListItem.Content>
            {loading ? <Spinner
                visible={loading}
                textContent={'Loading...'}
            /> : <ListItem.Chevron color="black" />}
        </ListItem>
    )

    return (
        <View className="sounds">
            <FlatList
                data={sounds}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
export default SearchedList;

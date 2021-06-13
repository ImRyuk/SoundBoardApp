
import React, {useState} from 'react';
import {StyleSheet,  View, Text, TouchableOpacity} from "react-native";
import {Input} from "react-native-elements";

const style = StyleSheet.create({
    button: {
        marginBottom : 20,
        padding: 10,
        color: 'white',
        borderRadius: 4,
        backgroundColor: "#0081A7",
        textAlign: "center",
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white'
    },
    input: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export const Search = (props) => {
    const [search, setSearch] = useState('');

    const handleSubmit = () => {
        props.handleSendRequest(search)
        setSearch(search)
    }

    return (
        <View style={props.style} className="search">
            <Input leftIcon={{ type: 'font-awesome', name: 'search' }} placeholder="Chercher un artiste/musique" className="search-box" type="text" onChangeText={search => setSearch(search)} value={search}/>
            <TouchableOpacity
                style={style.button}
                onPress={handleSubmit}
            >
                <Text style={style.buttonText}>Chercher</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Search;

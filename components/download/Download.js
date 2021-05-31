import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native';
import {Search} from "./Search";
import {SearchedList} from "./SearchedList";
import axios from "axios";

const styles = StyleSheet.create({
    container: {
        height:'80%'
    },
    content: {
        alignItems: 'center'
    },
    item: {}
});

export const Download = ({navigation}) => {

    const[sounds, setSounds] = useState();

    const sendRequest = (search) => {
        axios.get('https://freesound.org/apiv2/search/text/?query=' + search + '&token=SwLolZcTQXWhsHzHE2ym0IPuCZmzJnyzx1d0p6Xb')
            .then(function (response) {
                if(response.data.results.length === 0){
                    alert('aucun résultat!')
                } else {
                    const sounds = response.data.results;
                    setSounds(sounds);
                    console.log(sounds);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
        <View style={styles.container} className="SearchComponent">
            <Search style={styles.content} handleSendRequest={sendRequest} />
            <SearchedList navigation={navigation} sounds={sounds}/>
        </View>
    )
}

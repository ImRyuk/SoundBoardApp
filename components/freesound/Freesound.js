import React, {useState} from 'react'
import { StyleSheet, View} from 'react-native';
import {Search} from "./Search";
import {SearchedList} from "./SearchedList";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

const styles = StyleSheet.create({
    container: {
        height:'80%'
    },
    content: {
        alignItems: 'center'
    },
});

export const Freesound = ({navigation}) => {

    const[sounds, setSounds] = useState();
    const[loading, setLoading] = useState(false);

    const sendRequest = (search) => {
        setLoading(true),
            axios.get('https://freesound.org/apiv2/search/text/?query=' + search + '&token=SwLolZcTQXWhsHzHE2ym0IPuCZmzJnyzx1d0p6Xb')
                .then(function (response) {
                    if(response.data.results.length === 0){
                        alert('aucun résultat!')
                    } else {
                        const sounds = response.data.results;
                        setSounds(sounds);
                        setLoading(false);
                        console.log(sounds);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

    }

    return(
        <View style={styles.container} className="SearchComponent">
            {loading ? <Spinner
                visible={loading}
                textContent={'Loading...'}
            /> : null}
            <Search style={styles.content} handleSendRequest={sendRequest} />
            <SearchedList navigation={navigation} sounds={sounds}/>
        </View>
    )
}

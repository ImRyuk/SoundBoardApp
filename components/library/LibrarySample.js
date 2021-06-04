import React, { useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from "react-native";
import {Image} from "react-native-elements";
import {useDispatch, useSelector} from 'react-redux';
import { Audio } from 'expo-av';
import {addSample, removeSample} from "../../redux/library/freesound/actions";

const style = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignItems: 'center',
        margin: 30
    },
    button: {
        padding: 10,
        color: 'white',
        borderRadius: 4,
        backgroundColor: "#E7414D",
        textAlign: "center",
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white'
    },
    primaryText: {
        margin: 20,
        fontWeight: 'bold'
    },
    textItem:{
        margin: 20
    },
    logo: {
        width: 200,
        height: 200
    }
});

const TextItem = (props) => {
    return(
        <Text style={style.textItem}>{props.value}</Text>
    )
}

export const LibrarySample = (props) => {

    const samples = useSelector(state => state.samples.samples)
    const [sample, setSample] =  useState(props.route.params.sound);
    const dispatch = useDispatch();

    const remove = () => {
        dispatch(removeSample(sample));
    };

    console.log(props);

    const item = props.route.params.sample;
    const [sound, setSound] = useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            {uri: item.url}
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync(); }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync(); }
            : undefined;
    }, [sound]);


    return(
        <View style={style.container}>
            <Text style={style.primaryText}>{item.name}</Text>
            <TextItem value={item.duration}/>
            <TextItem value={item.description}/>
            <TouchableOpacity
                style={{textAlign: "center",borderRadius: 4,color: 'white',padding: 10,backgroundColor: '#2D3038'}}
                onPress={remove}
            >
                <Text style={style.buttonText}>{'Retirer'}</Text>
            </TouchableOpacity>
            <Button title="Ecouter" onPress={playSound} />
        </View>
    )
}

import React, { useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button, ScrollView} from "react-native";
import {Image} from "react-native-elements";
import {useDispatch, useSelector} from 'react-redux';
import { Audio } from 'expo-av';
import {addSample, removeSample} from "../../redux/library/freesound/actions";

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        margin: 30
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
    secondaryText: {
        fontWeight: 'normal'
    },
    textItem:{
        margin: 20
    },
    logo: {
        width: 200,
        height: 200
    },
    button:{
        margin: 10,
        textAlign: "center",
        borderRadius: 4,
        color: 'white',
        padding: 10,
        backgroundColor:'#F07167'
    },
    buttons: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-around'
    }
});

export const Sound = (props) => {

    const samples = useSelector(state => state.samples.samples)
    const [sample, setSample] =  useState(props.route.params.sound);
    const dispatch = useDispatch();

    const ifExists = (sample) => {
        if (samples.filter(item => item.id === sample.id).length > 0) {
            return true;
        }
        return false;
    };


    const add = () => {
        dispatch(addSample(sample));
    };

    const remove = () => {
        dispatch(removeSample(sample));
    };

    const item = props.route.params.sound;
    const [sound, setSound] = useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            {uri: item.previews['preview-lq-mp3']}
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
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <Image
                    source={{ uri: item.images.spectral_m }}
                    style={style.logo}
                />
                <Text style={style.primaryText}>{"Nom : "}<Text style={style.secondaryText}>{item.name}</Text></Text>
                <Text style={style.primaryText}>{"Durée : "}<Text style={style.secondaryText}>{(item.duration)}</Text></Text>
                <Text style={style.primaryText}>{"Description : "}<Text style={style.secondaryText}>{item.description}</Text></Text>
                <View style={style.buttons}>
                    <TouchableOpacity
                        style={[style.button, {backgroundColor: ifExists(sample) ? '#00AFB9' : '#0081A7'}]}
                        onPress={() => ifExists(sample) ? remove() : add()}
                    >
                        <Text style={style.buttonText}>{ifExists(sample)? 'Retirer' : 'Ajouter'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.button}
                        onPress={playSound}
                    >
                        <Text style={style.buttonText}>{'Ecouter'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

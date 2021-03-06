import React, { useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from "react-native";
import {useDispatch} from 'react-redux';
import { Audio } from 'expo-av';
import { removeSample} from "../../redux/library/freesound/actions";
import * as FS from 'expo-file-system';
import {SampleRequire} from "../../utils/sampleRequire";

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
        backgroundColor:'#00AFB9'
    },
    buttons: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-around'
    }
});

const TextItem = (props) => {
    return(
        <Text style={style.textItem}>{props.value}</Text>
    )
}

export const LibrarySample = (props) => {

    const dispatch = useDispatch();

    async function deleteRecordedSample(uri) {
        await FS.deleteAsync(uri).then(r => console.log('sample' + uri + ' Supprimé!'))
    }

    const remove = () => {
        const type = item.type;
        switch (type) {
            case 'freesound':
                console.log('freesound');
                dispatch(removeSample(item));
                break;
            case 'recorded':
                console.log('recorded');
                deleteRecordedSample(item.uri);
                dispatch(removeSample(item));
                break;
            default:
                console.log(`default`);
        }
        alert('Sample retiré!');
        props.navigation.navigate('Main')
    };

    const item = props.route.params.sample;
    const [sound, setSound] = useState();

    async function playSound() {
        console.log('Loading Sound');
        if(item.type === 'default'){
            console.log(item.url );
            const defaultSound = SampleRequire(item.id);
            const { sound } = await Audio.Sound.createAsync(defaultSound);
            setSound(sound);
            console.log('Playing Sound');
            await sound.playAsync();
        } else {
            const { sound } = await Audio.Sound.createAsync(
                {uri: item.uri}
            );
            setSound(sound);
            console.log('Playing Sound');
            await sound.playAsync();
        }
    }

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
            <View style={style.buttons}>
                {item.type === 'default' ? null :
                    <TouchableOpacity
                        style={[style.button, {backgroundColor:'#F07167'}]}
                        onPress={remove}
                    >
                        <Text style={style.buttonText}>{'Retirer'}</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    style={style.button}
                    onPress={playSound}
                >
                    <Text style={style.buttonText}>{'Ecouter'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

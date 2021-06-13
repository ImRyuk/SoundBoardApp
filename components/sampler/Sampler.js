import React from 'react';
import {Text as ElementText} from "react-native-elements";
import {View, Button, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {clearStore}  from "../../redux/library/recorded/actions";
import {clearPads}  from "../../redux/pads/actions";
import {Audio} from "expo-av";
import {SampleRequire} from "../../utils/sampleRequire";
import {getRandomColor} from "../../utils/colors";

export const Sampler = ({navigation}) => {
    const dispatch = useDispatch();

    const clear = () => {
        dispatch(clearStore());
    }

    const clearingPads = () => {
        dispatch(clearPads());
    }

    const samples = useSelector(state => state.samples.samples)

    const padSelector = (pads) => {
        return pads.map((item) => {
            let uri = "";
            let type = "";
            let sampleName = "";

            for (let sample of samples) {
                if (sample.id === item.sampleId) {
                    sampleName = sample.name;
                    uri = sample.uri;
                    type = sample.type;
                    break;
                }
            }
            return { ...item, uri: uri, type:type, sampleName: sampleName };
        });
    };

    const pads = padSelector(useSelector(state => state.pads));

    const renderItem = ({ item, index }) => {

        async function playSound() {
            console.log('Loading Sound');
            if(item.type === 'default'){
                const defaultSound = SampleRequire(item.sampleId);
                const { sound } = await Audio.Sound.createAsync(defaultSound);
                console.log('Playing Sound');
                await sound.playAsync();
            } else {
                const { sound } = await Audio.Sound.createAsync(
                    {uri: item.uri}
                );
                console.log('Playing Sound');
                await sound.playAsync();
            }
        }

        return(
            <View style={style.container}>
                <TouchableOpacity
                    style={[style.button, getRandomColor()]}
                    onPress={playSound}
                    onLongPress={() => navigation.navigate('Pad', {
                        pad: item
                    })}
                >
                    <Text style={style.buttonText} >{item.sampleName}</Text>
                </TouchableOpacity>
            </View>
            )
    }

    return(
        <View>
            <Button title={'Oui'} onPress={clearingPads}/>
            <ElementText h2 style={style.title}>{'Sampler'}</ElementText>
            <View>
                <FlatList
                    style={style.list}
                    numColumns={3}                  // set number of columns
                    data={pads}
                    keyExtractor={(item, index) => index }
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    list:{
        width: Dimensions.get('window').width,
    },
    container: {
        flex: 1,
        width: Dimensions.get('window').width * 0.333,
        margin: 10,
        alignItems: 'center'
    },
    button: {
        justifyContent: 'center',
        height: 100,
        width: 100,
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        alignItems: "center",
        backgroundColor: "#DDDDDD",
    },
    buttonText: {
        fontWeight: 'bold'
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    },
});

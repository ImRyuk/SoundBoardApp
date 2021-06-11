import React, {useState} from 'react';
import {View, Button, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {clearStore}  from "../../redux/library/recorded/actions";
import {clearPads}  from "../../redux/pads/actions";
import {Audio} from "expo-av";
import {SampleRequire} from "../defaults/SampleRequire";

export const Sampler = ({navigation}) => {
    const dispatch = useDispatch();

    const clear = () => {
        dispatch(clearStore());
    }

    const clearingPads = () => {
        dispatch(clearPads());
    }

    const samples = useSelector(state => state.samples.samples)

    function getRandomColor() {
        let number = Math.floor(Math.random() * 4);
        switch (number) {
            case 0:
                return {backgroundColor: 'blue'}
            case 1:
                return {backgroundColor: 'green'}
            case 2:
                return {backgroundColor: 'red'}
            case 3:
                return {backgroundColor: 'yellow'}
            default:
                return 'red'
        }
    }

    const padSelector = (pads) => {
        return pads.map((item) => {
            let uri = "";
            let type = "";

            for (let sample of samples) {
                if (sample.id === item.sampleId) {
                    uri = sample.uri;
                    type = sample.type;
                    break;
                }
            }
            return { ...item, uri: uri, type:type };
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
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.button, getRandomColor()]}
                    onPress={playSound}
                    onLongPress={() => navigation.navigate('Pad', {
                        pad: item
                    })}
                >
                    <Text >{item.name}</Text>
                </TouchableOpacity>
            </View>
            )
    }

    return(
        <View>
            <Button title={'Oui'} onPress={clearingPads}/>
            <View>
                <FlatList
                    style={styles.list}
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

const styles = StyleSheet.create({
    list:{
        height: '100%',
        width: '100%'
    },
    container: {
        flex: 1,
        margin: 10
    },
    button: {
        height: '100%',
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        alignItems: "center",
        backgroundColor: "#DDDDDD",
    },
});

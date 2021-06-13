import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { useDispatch } from "react-redux";
import {setFilter} from "../../redux/filter/actions";

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 4,
        padding: 10
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white'
    }

});

const Filter = () => {
    const dispatch = useDispatch();
    return (
        <View style={style.container}>
            <TouchableOpacity
                style={[style.button, {backgroundColor: '#0081A7'}]}
                onPress={() => {
                    dispatch(setFilter("all"));
                }}
            >
                <Text style={style.textButton}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[style.button, {backgroundColor: '#00AFB9'}]}
                onPress={() => {
                    dispatch(setFilter("default"));
                }}
            >
                <Text style={style.textButton}>Par défaut</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[style.button,{backgroundColor: '#F07167'}]}
                onPress={() => {
                    dispatch(setFilter("freesound"));
                }}
            >
                <Text style={style.textButton}>Freesound</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[style.button, {backgroundColor: '#FED9B7'}]}
                onPress={() => {
                    dispatch(setFilter("recorded"));
                }}
            >
                <Text style={style.textButton}>Recorded</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Filter;

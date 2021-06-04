import React from "react";
import { Button, View } from "react-native";
import { useDispatch } from "react-redux";
import {setFilter} from "../../redux/filter/actions";


const Filter = () => {
    const dispatch = useDispatch();
    return (
        <View style={{ flexDirection: "row" }}>
            <Button
                title="all"
                onPress={() => {
                    dispatch(setFilter("all"));
                }}
            />
            <Button
                title="default"
                onPress={() => {
                    dispatch(setFilter("default"));
                }}
            />
            <Button
                title="freesound"
                onPress={() => {
                    dispatch(setFilter("freesound"));
                }}
            />
            <Button
                title="recorded"
                onPress={() => {
                    dispatch(setFilter("recorded"));
                }}
            />
        </View>
    );
};

export default Filter;

import React from 'react';
import {Text, View} from "react-native";

export const Pad = (props) => {
    const pad = props.route.params.pad;
    return(
        <View>
            <Text>Editing {pad.name}</Text>
        </View>
    )
}

import React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {Text as ElementText} from "react-native-elements";
import {useDispatch, useSelector} from "react-redux";
import {ListItem} from "react-native-elements";
import {getColor} from "../../utils/colors";
import {changeSource} from "../../redux/pads/actions";

const style = StyleSheet.create({
    container: {
        paddingBottom: 20,
        backgroundColor: "#F8F8F8"
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    },
    headerContainer: {
        width: '100%',
    },
    filterContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    filter: {
        fontWeight: 'bold'
    },
    filterSelected: {
        fontWeight: 'normal'
    },

});

export const Pad = (props) => {
    const pad = props.route.params.pad;
    const samples = useSelector(state => state.samples.samples);
    const dispatch = useDispatch();

    const source = (pad, sample) => {
        dispatch(changeSource(pad, sample.id));
        props.navigation.navigate('Main');
    }

    const renderItem = ({item, index}) => (
        <ListItem bottomDivider style={[style.container, getColor(item)]} onPress={() => source(pad, item)}>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.type}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )

    return(
        <View className="samples" style={{ flex: 1 }}>
            <View>
                <ElementText style={style.title} h2>Changer la source</ElementText>
            </View>
            <FlatList
                data={samples}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    )
}

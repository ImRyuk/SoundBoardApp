import React from 'react'
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import { useSelector} from "react-redux";
import {ListItem} from "react-native-elements";
import {LinearGradient} from "expo-linear-gradient";
import Filter from "./Filter";
import {filteredSamplesSelector} from "../../redux/library/sampleReducer";

const style = StyleSheet.create({
    container: {
        paddingBottom: 20,
        backgroundColor: "#F8F8F8"
    },
    subtitle: {
        color: 'white'
    },
    title: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export const Library =  (props) => {

    const navigation = props.navigation;
    const samples = useSelector(state => state.samples.samples);

    const samples2 = useSelector(filteredSamplesSelector);
    console.log(samples2);

    const renderItem = ({item, index}) => (
        <ListItem style={style.container} linearGradientProps={{
            colors: index % 2 === 0 ? ['#7F7FD5', '#86A8E7', '#91EAE4'] : ['#fe8c00', '#f83600'],
            start: {x: 0, y: 1},
            end: {x: 0.2, y: 0},
        }}
                  ViewComponent={LinearGradient}>
            <ListItem.Content>
                <ListItem.Title style={style.title}>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron onPress={() => {
                navigation.navigate('LibrarySample', {
                    sample: item
                });
            }} color="white"/>
        </ListItem>
    )

    return (
        <View className="samples">
            <Text h2>Ma liste de musiques</Text>
            <Filter />
            <Button title={'Record'} onPress={() => navigation.navigate('Record')}/>
            <FlatList
                data={samples2}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
export default Library;


import React from 'react'
import {View, FlatList, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import { useSelector} from "react-redux";
import {ListItem, Button} from "react-native-elements";
import Filter from "./Filter";
import {filteredSamplesSelector} from "../../redux/library/sampleReducer";
import Icon from 'react-native-vector-icons/FontAwesome';

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
    }

});

export const Library =  (props) => {

    const getColor = (item) => {
        switch (item.type) {
            case 'default':
                return {backgroundColor: '#00AFB9'};
            case 'freesound':
                return {backgroundColor: '#F07167'};
            case 'recorded':
                return {backgroundColor: '#FED9B7'};
            default:
                return {backgroundColor: '#0081A7'};
        }

    }

    const navigation = props.navigation;
    const samples = useSelector(filteredSamplesSelector);
    const filter = useSelector(state => state.filter);

    const renderItem = ({item, index}) => (
    <ListItem bottomDivider style={[style.container, getColor(item)]} onPress={() => {
        navigation.navigate('LibrarySample', {
            sample: item
        });
    }}>
        <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.type}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
    </ListItem>
    )

    return (
        <View className="samples" style={{ flex: 1 }}>
            <View style={style.headerContainer}>
                <Text style={style.title} h2>Ma bibliothèque</Text>
                <Filter />
                <View style={style.filterContainer}>
                    <Text style={style.filter}>Filtre<Text style={style.filterSelected}>: {filter} ({samples.length})</Text></Text>
                </View>
            </View>
            <FlatList
                data={samples}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
            <Button
                onPress={() => navigation.navigate('Record')}
                buttonStyle={{backgroundColor:'#0081A7'}}
                iconRight
                icon={
                    <Icon
                        name="microphone"
                        size={15}
                        color="white"
                    />
                }
                title="Record "
            />
        </View>
    )
}
export default Library;


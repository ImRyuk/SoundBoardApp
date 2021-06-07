import React from 'react';
import { View, Button} from "react-native";
import { Row, Col } from 'react-native-responsive-grid-system';
import {useDispatch} from "react-redux";
import {clearStore} from "../redux/library/recorded/actions";

export const Sampler = () => {
    const dispatch = useDispatch();

    const clear = () => {
        dispatch(clearStore());
    }

    return(
        <View>
            <Button title={"Clearing"} onPress={clear}/>
            <Row>
                <Col xs={4} sm={4} md={3} lg={3}>
                    <Button
                        onPress={() => {console.log('oui')}}
                        color='#841584'
                        style={{backgroundColor: '#E7414D',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title="Learn More"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </Col>
                <Col xs={4} sm={4} md={3} lg={3}>
                    <Button
                        onPress={() => {console.log('oui')}}
                        color='#841584'
                        style={{backgroundColor: '#E7414D',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title="Learn More"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </Col>
                <Col xs={4} sm={4} md={3} lg={3}>
                    <Button
                        onPress={() => {console.log('oui')}}
                        color='#841584'
                        style={{backgroundColor: '#e7414d',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title="Learn More"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </Col>
                <Col  xs={4} sm={4} md={3} lg={3}>
                    <Button
                        onPress={() => {console.log('oui')}}
                        color='#841584'
                        style={{backgroundColor: '#E7414D',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title="Learn More"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </Col>
            </Row>
        </View>
    )
}

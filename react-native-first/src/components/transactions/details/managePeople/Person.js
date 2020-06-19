import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Button } from 'react-native';
import ViewSlider from 'react-native-view-slider'
import constants from '../../../common/constants';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SemiCircleTemplate from './SemiCircleTemplate';

const { width, height } = Dimensions.get('window');

const Person = props => {

    // console.log(props)
    return (
        <ScrollView>
            <SemiCircleTemplate>
                <Text style={{ color: "white" }}>{props.firstName}</Text>
            </SemiCircleTemplate>
            <View style={{marginLeft: 0}}>
                <Text>{props.email}</Text>
            </View>
        </ScrollView>
    )
}

export default Person

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
// import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

const Receipts = props => {


    useEffect(() => {

        var request_body = JSON.stringify({
            "test": "testVal"
        })

        fetch('http://127.0.0.1:8000/receipt/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: request_body
        }).then((response) => response.json())
            .then((json) => { console.log(json) })


    }, []);
    var cam = null

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Text>hi amal</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Receipts

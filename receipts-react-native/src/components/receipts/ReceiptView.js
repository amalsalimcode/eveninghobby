import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from "react-native";
import constants from "../common/constants";
import GradientBackground from "../common/GradientBackground";
import { theme } from "../common/styles";

const ReceiptView = props => {

    const [newImg, setNewImg] = useState(null);

    useEffect(() => {
        var request_body = JSON.stringify({
            "uuid": props.route.params["uuid"]
            // "uuid": "test_val"
        })

        fetch(constants.ngrokHost + 'receipt/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: request_body
        }).then((response) => response.json())
            .then((json) => { setNewImg(json["image"]) })
    }, []);

    if (!newImg) {
        return (
            <>
                <View style={{ justifyContent: "center", alignContent: "center" }}>
                    <ActivityIndicator />
                </View>
            </>
        )
    } else {
        console.log(newImg)
        return (
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ height: constants.windowHeight, width: constants.windowWidth, resizeMode: "contain" }} source={{ uri: newImg }} />
                </View>
            </ GradientBackground>
        );
    }
}

export default ReceiptView

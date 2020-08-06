import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, Button, ActivityIndicator, Image } from "react-native";
import constants from "../common/constants";
import GradientBackground from "../common/GradientBackground";
import { theme } from "../common/styles";
import PinchZoomView from 'react-native-pinch-zoom-view';
import ImageZoom from "react-native-image-pan-zoom";
import TopToolbar from "./TopToolbar";


const ReceiptView = props => {

    const [newImg, setNewImg] = useState(null);

    useEffect(() => {
        var request_body = JSON.stringify({
            "uuid": props.route.params["uuid"]
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
        return (
            <>
                <TopToolbar {...props} />
                < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <ImageZoom cropWidth={Dimensions.get('window').width}
                            cropHeight={Dimensions.get('window').height}
                            imageWidth={Dimensions.get('window').width}
                            imageHeight={500}>
                            <Image style={{ width: Dimensions.get('window').width, height: 500 }}
                                source={{ uri: newImg }} />
                        </ImageZoom>
                    </View>
                </ GradientBackground>
            </>
        );
    }
}

export default ReceiptView

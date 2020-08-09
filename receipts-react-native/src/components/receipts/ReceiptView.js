import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, Button, ActivityIndicator, Image } from "react-native";
import constants, { getTopToolbarHeight } from "../common/constants";
import GradientBackground from "../common/GradientBackground";
import { theme } from "../common/styles";
import PinchZoomView from 'react-native-pinch-zoom-view';
import ImageZoom from "react-native-image-pan-zoom";
import TopToolbar from "./TopToolbar";
import ReceiptsBottomToolbar from "./ReceiptsBottomToolbar";
import ReceiptViewBottomToolbar from "./ReceiptViewBottomToolbar";
import { ScrollView } from "react-native-gesture-handler";


const ReceiptView = props => {

    const [imgDimension, setImgDimension] = useState({})
    Image.getSize(props.route.params["img"], (width, height) => { setImgDimension({"height": height, "width": width}) });
    const imageWidth = imgDimension["width"]
    let imageHeight = imgDimension["height"] * constants.windowWidth / imgDimension["width"]  
    if (imageHeight > constants.windowHeight * 0.6) {
        imageHeight = constants.windowHeight * 0.6
    }


    useEffect(() => {

        // var request_body = JSON.stringify({
        //     "uuid": props.route.params["uuid"]
        // })

        // fetch(constants.ngrokHost + 'receipt/', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: request_body
        // }).then((response) => response.json())
        //     .then((json) => { setNewImg(json["image"]) })

    }, []);

    const getImage = () => {
        if (Platform.OS == 'ios') {
            return (
            <ScrollView minimumZoomScale={1} maximumZoomScale={5} contentContainerStyle={{}}>
                <Image resizeMode="contain" style={{ width: constants.windowWidth, height: constants.windowHeight}}
                    source={{ uri: props.route.params["img"] }} />
            </ScrollView>)
        } else {
            return (<ImageZoom cropWidth={Dimensions.get('window').width} cropHeight={imageHeight}
                imageWidth={imageWidth} imageHeight={imageHeight}>
                <Image resizeMode="contain" style={{ width: imageWidth, height: imageHeight }}
                    source={{ uri: props.route.params["img"] }} />
            </ImageZoom>)
        }
    }

    if (!imgDimension["height"]) {
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
                {/* <TopToolbar {...props} goBack={props.navigation.goBack} /> */}
                {/* < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} > */}
                    {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center", borderWidth: 2}}> */}
                        {getImage()}
                    {/* </View> */}
                    <ReceiptViewBottomToolbar/>
                {/* </ GradientBackground> */}
            </>
        );
    }
}

export default ReceiptView

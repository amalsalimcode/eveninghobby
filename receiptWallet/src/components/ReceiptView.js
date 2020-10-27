
import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, ActivityIndicator, Image, KeyboardAvoidingView } from "react-native";
import { ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity } from "react-native-gesture-handler";

import ImageZoom from "react-native-image-pan-zoom";

import TopToolbar from "./TopToolbar";
import ReceiptViewBottomToolbar from "./ReceiptViewBottomToolbar";
import constants, { getTopToolbarHeight, getBottomToolbarHeight } from "./common/constants";
import ReceiptDetailsView from "./ReceiptDetailsView";


const ReceiptView = props => {

    const [viewScroller, setViewScroller] = useState(null)
    const [imgDimension, setImgDimension] = useState({})

    const availableHeight = constants.windowHeight - getBottomToolbarHeight() - getTopToolbarHeight()

    const error = () => {
        if (!imgDimension["height"]) {
            setImgDimension({ "height": 200, "width": 200 })
        }
    }

    const setImgDimensionFunc = (width, height) => {

        let imageWidth = 0
        if (width < constants.windowWidth) {
            imageWidth = constants.windowWidth + 10
        } else {
            imageWidth = constants.windowWidth
        }

        if (height < availableHeight) {
            imageHeight = height * constants.windowWidth / width
        } else {
            imageHeight = availableHeight
        }

        setImgDimension({ "height": imageHeight, "width": imageWidth })
    }

    useEffect(() => {
    }, []);

    const getImage = () => {
        if (Platform.OS == 'ios') {
            return (
                <ScrollView minimumZoomScale={1} maximumZoomScale={5} contentContainerStyle={{ backgroundColor: "black" }}>
                    <Image resizeMode="contain" style={{ width: constants.windowWidth, height: availableHeight, backgroundColor: "black" }}
                        source={{ uri: props.route.params["fileuri"] }} />
                </ScrollView>)
        } else {
            return (
                <ImageZoom cropWidth={Dimensions.get('window').width} cropHeight={imgDimension.height}
                    imageWidth={imgDimension.width} imageHeight={imgDimension.height} style={{ backgroundColor: "black" }}>
                    <Image resizeMode="contain" style={{ width: imgDimension.width, height: imgDimension.height }}
                        source={{ uri: props.route.params["fileuri"] }} />
                </ImageZoom>
            )
        }
    }

    if (!imgDimension["height"]) {
        Image.getSize(props.route.params["fileuri"], (width, height) => { setImgDimensionFunc(width, height) }, error);
        return (
            <>
                <View style={{ justifyContent: "center", alignContent: "center" }}>
                    <TopToolbar {...props} />
                    <ActivityIndicator />
                </View>
            </>
        )
    } else {
        return (
            <>
                <KeyboardAvoidingView style={{ flex: 1, height: availableHeight, width: constants.windowWidth }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"} enabled={false}>
                    <TopToolbar {...props} goBack={props.navigation.goBack} />
                    <ScrollView scrollEnabled={false} horizontal={true} ref={(node) => setViewScroller(node)} >
                        <View style={{ flex: 1, height: availableHeight, justifyContent: "center", width: constants.windowWidth, backgroundColor: "black" }}>
                            {getImage()}
                        </View>
                        <ReceiptDetailsView data={props.route.params["value"]} {...props} />
                    </ScrollView>
                    <ReceiptViewBottomToolbar scroller={viewScroller} />
                </KeyboardAvoidingView>
            </>
        );
    }
}

export default ReceiptView
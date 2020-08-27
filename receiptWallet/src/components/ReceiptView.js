
import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, ActivityIndicator, Image } from "react-native";
import { ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity } from "react-native-gesture-handler";

import ImageZoom from "react-native-image-pan-zoom";
import { TextInputMask } from "react-native-masked-text";

import TopToolbar from "./TopToolbar";
import { theme, commonStyles } from "./common/styles";
import GradientBackground from "./common/GradientBackground";
import ReceiptViewBottomToolbar from "./ReceiptViewBottomToolbar";
import constants, { getTopToolbarHeight, getBottomToolbarHeight } from "./common/constants";
import ChangeDate from "./common/ChangeDate";
import ReceiptDetailsView from "./ReceiptDetailsView";


const ReceiptView = props => {

    const [img, setNewImg] = useState(constants.rootDir + "/" + props.route.params["fileName"])
    const [viewScroller, setViewScroller] = useState(null)
    const [imgDimension, setImgDimension] = useState({})

    const [amount, setAmount] = useState(0.00);
    const [store, setStore] = useState('');
    const [memo, setMemo] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    Image.getSize(img, (width, height) => { setImgDimensionFunc(width, height) });

    const availableHeight = constants.windowHeight - getBottomToolbarHeight() - getTopToolbarHeight()

    let imageHeight = availableHeight
    if (imgDimension["height"] < availableHeight) {
        imageHeight = imgDimension["height"] * constants.windowWidth / imgDimension["width"]
    }

    let imageWidth = 0
    if (imgDimension["width"] < constants.windowWidth) {
        imageWidth = constants.windowWidth + 10
    } else {
        imageWidth = constants.windowWidth
    }

    const setImgDimensionFunc = (width, height) => {
        if (!imgDimension["height"]) {
            setImgDimension({ "height": height, "width": width })
        }
    }

    const setImageValues = (data) => {
        "image" in data ? setNewImg(data["image"]) : {}
        setAmount(data["amount"])
        setStore(data["store"])
        setMemo(data["memo"])
        setSelectedDate(new Date(data["purchasedAt"]))
    }

    useEffect(() => {
        // getSingleReceipt(props.route.params["id"], setImageValues)
        setImageValues(props.route.params["value"])
    }, []);

    const getImage = () => {
        if (Platform.OS == 'ios') {
            return (
                <ScrollView minimumZoomScale={1} maximumZoomScale={5} contentContainerStyle={{ backgroundColor: "black" }}>
                    <Image resizeMode="contain" style={{ width: constants.windowWidth, height: availableHeight, backgroundColor: "black" }}
                        source={{ uri: img }} />
                </ScrollView>)
        } else {
            return (
                <ImageZoom cropWidth={Dimensions.get('window').width} cropHeight={imageHeight}
                    imageWidth={imageWidth} imageHeight={imageHeight} style={{ backgroundColor: "black" }}>
                    <Image resizeMode="contain" style={{ width: imageWidth, height: imageHeight }}
                        source={{ uri: img }} />
                </ImageZoom>
            )
        }
    }

    const textInputStyle = { ...commonStyles.textInput }

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
                <TopToolbar {...props} goBack={props.navigation.goBack} />
                <ScrollView scrollEnabled={false} horizontal={true} ref={(node) => setViewScroller(node)} >

                    <View style={{ flex: 1, height: availableHeight, justifyContent: "center", width: constants.windowWidth, backgroundColor: "black" }}>
                        {getImage()}
                    </View>
                    <ReceiptDetailsView data={props.route.params["value"]} />
                </ScrollView>
                <ReceiptViewBottomToolbar scroller={viewScroller} />
            </>
        );
    }
}

export default ReceiptView
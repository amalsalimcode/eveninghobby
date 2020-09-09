
import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, ActivityIndicator, Image } from "react-native";
import { ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity } from "react-native-gesture-handler";

import ImageZoom from "react-native-image-pan-zoom";

import TopToolbar from "./TopToolbar";
import ReceiptViewBottomToolbar from "./ReceiptViewBottomToolbar";
import constants, { getTopToolbarHeight, getBottomToolbarHeight } from "./common/constants";
import ReceiptDetailsView from "./ReceiptDetailsView";


const ReceiptView = props => {

    const [img, setNewImg] = useState(props.route.params["fileId"])
    const [viewScroller, setViewScroller] = useState(null)
    const [imgDimension, setImgDimension] = useState({})

    const [amount, setAmount] = useState(0.00);
    const [store, setStore] = useState('');
    const [memo, setMemo] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const error = () => {
        if (!imgDimension["height"]) {
            setImgDimension({ "height": 200, "width": 200 })
        }
    }

    Image.getSize(img, (width, height) => { setImgDimensionFunc(width, height) }, error);

    const availableHeight = constants.windowHeight - getBottomToolbarHeight() - getTopToolbarHeight()

    const getImageSize = () => {
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

        return ({ "height": imageHeight, "width": imageWidth })
    }

    const setImgDimensionFunc = (width, height) => {
        console.log("im asked to set dimension")
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
        let imgSize = getImageSize()
        if (Platform.OS == 'ios') {
            return (
                <ScrollView minimumZoomScale={1} maximumZoomScale={5} contentContainerStyle={{ backgroundColor: "black" }}>
                    <Image resizeMode="contain" style={{ width: constants.windowWidth, height: availableHeight, backgroundColor: "black" }}
                        source={{ uri: img }} />
                </ScrollView>)
        } else {
            return (
                <ImageZoom cropWidth={Dimensions.get('window').width} cropHeight={imgSize.imageHeight}
                    imageWidth={imgSize.imageWidth} imageHeight={imgSize.imageHeight} style={{ backgroundColor: "black" }}>
                    <Image resizeMode="contain" style={{ width: imgSize.imageWidth, height: imgSize.imageHeight }}
                        source={{ uri: img }} />
                </ImageZoom>
            )
        }
    }

    if (!imgDimension["height"]) {
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
                <TopToolbar {...props} goBack={props.navigation.goBack} />
                <ScrollView scrollEnabled={false} horizontal={true} ref={(node) => setViewScroller(node)} >
                    <View style={{ flex: 1, height: availableHeight, justifyContent: "center", width: constants.windowWidth, backgroundColor: "black" }}>
                        {getImage()}
                    </View>
                    <ReceiptDetailsView data={props.route.params["value"]} {...props} />
                </ScrollView>
                <ReceiptViewBottomToolbar scroller={viewScroller} />
            </>
        );
    }
}

export default ReceiptView
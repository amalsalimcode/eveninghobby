import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, Button, ActivityIndicator, Image } from "react-native";
import constants, { getTopToolbarHeight, getBottomToolbarHeight, getFormattedDate } from "../common/constants";
import GradientBackground from "../common/GradientBackground";
import { theme } from "../common/styles";
import ImageZoom from "react-native-image-pan-zoom";
import TopToolbar from "./TopToolbar";
import ReceiptViewBottomToolbar from "./ReceiptViewBottomToolbar";
import { ScrollView, TouchableWithoutFeedback, TextInput } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";


const ReceiptView = props => {

    const [img, setNewImg] = useState(constants.rootDir + "/" + props.route.params["fileName"])
    const [viewScroller, setViewScroller] = useState(null)
    const [imgDimension, setImgDimension] = useState({})

    const [amount, setAmount] = useState(0.00);
    const [store, setStore] = useState('');
    const [memo, setMemo] = useState('');
    const [purchasedAt, setPurchasedAt] = useState('');

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

    const setResponseValue = (data) => {
        "image" in data ? setNewImg(data["image"]) : {}
        setAmount(data["amount"])
        setStore(data["store"])
        setMemo(data["memo"])
        setPurchasedAt(data["purchasedAt"])
    }

    useEffect(() => {
        // getSingleReceipt(props.route.params["id"], setResponseValue)
        setResponseValue(props.route.params["value"])
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
                < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                    <ScrollView scrollEnabled={false} horizontal={true} ref={(node) => setViewScroller(node)} >
                        <View style={{ flex: 1, height: availableHeight, justifyContent: "center", width: constants.windowWidth, backgroundColor: "black" }}>
                            {getImage()}
                        </View>
                        <View style={{ flex: 1, height: availableHeight, width: constants.windowWidth }}>
                            <TextInput placeholder="Store Name" style={constants.textInput} maxLength={50} onChangeText={setStore} value={store} />
                            <TextInputMask type={'money'} options={{ precision: 2, separator: '.', delimiter: '.', unit: '$', suffixUnit: '' }}
                                style={{ ...constants.textInput, width: "55%" }} value={amount} onChangeText={(text) => { setAmount(text) }} />

                            <View style={{ ...constants.textInput, width: "40%", justifyContent: "center" }}>
                                <TouchableWithoutFeedback onPress={() => { setShowDatePicker(true) }}>
                                    <Text> {getFormattedDate(new Date(purchasedAt))} </Text>
                                </TouchableWithoutFeedback>
                            </View>

                            <TextInput placeholder="Memo" style={constants.textInput} maxlength={200} onChangeText={setMemo} value={memo} />

                        </View>
                    </ScrollView>
                    <ReceiptViewBottomToolbar scroller={viewScroller} />
                </ GradientBackground>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addSingleReceipt: (receipt) => dispatch({ type: "ADD_SINGLE_RECEIPT", receipt: receipt })
    }
}

export default ReceiptView

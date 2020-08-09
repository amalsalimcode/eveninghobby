import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, KeyboardAvoidingView, Keyboard, ActivityIndicator } from "react-native";
import constants, { hasNotch, getTopToolbarHeight, getFormattedDate } from "../common/constants";
import { theme } from '../common/styles';
import { TextInput, TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import GradientBackground from "../common/GradientBackground";

import { Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import TopToolbar from "./TopToolbar";
import ChangeDate from "../transactions/summary/ChangeDate";
import { TextInputMask } from 'react-native-masked-text'


const AddReceipt = props => {

    const [amount, setAmount] = useState(0.00);
    const [store, setStore] = useState('');
    const [memo, setMemo] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [imgDimension, setImgDimension] = useState({})
    Image.getSize(props.route.params["img"], (width, height) => { setImgDimension({"height": height, "width": width}) });
    const imageWidth = imgDimension["width"]
    let imageHeight = imgDimension["height"] * constants.windowWidth / imgDimension["width"]  
    if (imageHeight > constants.windowHeight * 0.6) {
        imageHeight = constants.windowHeight * 0.6
    }

    const formHeight = constants.windowHeight - imageHeight - getTopToolbarHeight() - 50 // 50 is form Margin
    const totalHeight = constants.windowHeight - imageHeight - 125 - getTopToolbarHeight()

    useEffect(() => {
    }, []);

    async function sendPictureBackend() {
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = props.route.params["img"]
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('image', { uri: localUri, name: 'test.jpg', type: type })
        formData.append('amount', amount)
        formData.append('memo', memo)
        formData.append('store', store)
        formData.append('purchaseDate', JSON.stringify({
            'year': selectedDate.getFullYear(),
            'date': selectedDate.getDate(),
            'month': selectedDate.getMonth(),
            'hour': selectedDate.getHours(),
            'minute': selectedDate.getMinutes()
        }))

        await fetch(constants.ngrokHost + 'receipt/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then((response) => response.json())
            .then((json) => { props.addSingleReceipt(json) })
    }

    const getImage = (img) => {
        if (Platform.OS == 'ios') {
            return (<ScrollView minimumZoomScale={1} maximumZoomScale={5}>
                <Image resizeMode="contain" style={{ width: constants.windowWidth, height: imageHeight }}
                    source={{ uri: img }} />
            </ScrollView>)
        } else {
            return (<ImageZoom cropWidth={Dimensions.get('window').width} cropHeight={imageHeight}
                imageWidth={imageWidth} imageHeight={imageHeight}>
                <Image resizeMode="contain" style={{ width: imageWidth, height: imageHeight }}
                    source={{ uri: img }} />
            </ImageZoom>)
        }
    }

    const textInputStyle = { ...styles.textInput, marginBottom: formHeight / 10 }
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
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}>

                    <View style={{ justifyContent: "flex-end", flex: 1, paddingBottom: 0 }}>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <TopToolbar {...props} done={sendPictureBackend} />
                            <View style={{ backgroundColor: "black" }}>
                                {getImage(props.route.params["img"])}
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={{ marginHorizontal: "3%", marginVertical: 25, height: formHeight }}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ ...textInputStyle, width: "40%", justifyContent: "center" }}>
                                        <TouchableWithoutFeedback onPress={() => { setShowDatePicker(true) }}>
                                            <Text> {getFormattedDate(selectedDate)} </Text>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={{ marginHorizontal: "2%" }} />
                                    <TextInputMask type={'money'} options={{ precision: 2, separator: '.', delimiter: '.', unit: '$', suffixUnit: '' }}
                                        style={{ ...textInputStyle, width: "55%" }} value={amount} onChangeText={(text) => { setAmount(text) }} />
                                </View>
                                <TextInput placeholder="Store Name" style={textInputStyle} maxLength={50} onChangeText={setStore} value={store} />
                                <TextInput placeholder="Memo" style={textInputStyle} maxlength={200} onChangeText={setMemo} value={memo} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </KeyboardAvoidingView>
                <ChangeDate visible={showDatePicker} setVisible={setShowDatePicker} setDate={setSelectedDate} />
            </GradientBackground>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(AddReceipt)

var styles = StyleSheet.create({
    newAccountContainer: {
        alignItems: "center",
        backgroundColor: theme.primary,
        borderRadius: 10
    },
    inputView: {
        margin: 10,
        width: "50%",
        backgroundColor: theme.inputBg,
        borderRadius: 45,
        height: 25,
        marginBottom: 20,
        justifyContent: "center",
        paddingLeft: 20,
    },
    container: {
        flex: 1
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 35,
        borderColor: "#000000",
        borderBottomWidth: 1,
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    }
});
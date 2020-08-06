import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, KeyboardAvoidingView, Keyboard } from "react-native";
import constants, { hasNotch, getTopToolbarHeight, getFormattedDate } from "../common/constants";
import { theme } from '../common/styles';
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import GradientBackground from "../common/GradientBackground";

import { Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import TopToolbar from "./TopToolbar";
import ChangeDate from "../transactions/summary/ChangeDate";
import { TextInputMask } from 'react-native-masked-text'

const imageWidth = constants.windowWidth - 100
const imageHeight = constants.windowHeight * 0.7 - 100
const formHeight = constants.windowHeight - imageHeight - getTopToolbarHeight() - 50 // 50 is form Margin
const totalHeight = constants.windowHeight - imageHeight - 125 - getTopToolbarHeight()

const AddReceipt = props => {

    const [amount, setAmount] = useState(0.00);
    const [store, setStore] = useState('');
    const [memo, setMemo] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

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
            'month': selectedDate.getMonth()})
        )

        await fetch(constants.ngrokHost + 'receipt/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then((response) => response.json())
            .then((json) => { props.addSingleReceipt(json) })
    }

    return (
        < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>

                <View style={{ justifyContent: "flex-end", flex: 1, paddingBottom: 0 }}>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <TopToolbar {...props} done={sendPictureBackend} delete={true} />
                        <View style={{ backgroundColor: "black" }}>
                            <ImageZoom cropWidth={Dimensions.get('window').width} cropHeight={imageHeight}
                                imageWidth={imageWidth} imageHeight={imageHeight}>
                                <Image resizeMode="stretch" style={{ width: imageWidth, height: imageHeight }}
                                    source={{ uri: props.route.params["img"] }} />
                            </ImageZoom>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={{ marginHorizontal: "3%", marginVertical: 25, height: formHeight }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ ...styles.textInput, width: "40%", justifyContent: "center" }}>
                                    <TouchableWithoutFeedback onPress={() => { setShowDatePicker(true) }}>
                                        <Text> {getFormattedDate(selectedDate)} </Text>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={{ marginHorizontal: "2%" }} />
                                <TextInputMask type={'money'} options={{ precision: 2, separator: '.', delimiter: '.', unit: '$', suffixUnit: '' }}
                                    style={{ ...styles.textInput, width: "55%" }} value={amount} onChangeText={(text) => { setAmount(text) }} />
                            </View>
                            <TextInput placeholder="Store Name" style={styles.textInput} maxLength={50} onChange={setStore} value={store} />
                            <TextInput placeholder="Memo" style={styles.textInput} maxlength={200} onChange={setMemo} value={memo} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </KeyboardAvoidingView>
            <ChangeDate visible={showDatePicker} setVisible={setShowDatePicker} setDate={setSelectedDate} />
        </GradientBackground>
    )
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
        marginBottom: formHeight / 10,
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    }
});
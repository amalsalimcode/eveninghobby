import React, { useEffect, useState } from "react";
import { View, Text, Image, KeyboardAvoidingView, Keyboard, ActivityIndicator } from "react-native";
import constants, { getTopToolbarHeight, getFormattedDate } from "../common/constants";
import { theme } from '../common/styles';
import { TextInput, TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import GradientBackground from "../common/GradientBackground";

import { Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import TopToolbar from "./TopToolbar";
import ChangeDate from "../transactions/summary/ChangeDate";
import { TextInputMask } from 'react-native-masked-text'
import { sendPictureBackend } from "./Backend";
import { addReceipt } from "./Db";
import { saveImgToDir } from "./FileSystem";

const AddReceipt = props => {

    const [amount, setAmount] = useState(0.00);
    const [store, setStore] = useState('');
    const [memo, setMemo] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const photo = props.route.params
    const imageWidth = photo["width"]
    let imageHeight = photo["height"] * constants.windowWidth / photo["width"]
    if (imageHeight > constants.windowHeight * 0.6) {
        imageHeight = constants.windowHeight * 0.6
    }

    const formHeight = constants.windowHeight - imageHeight - getTopToolbarHeight() - 50 // 50 is form Margin

    useEffect(() => {
    }, []);

    const savePicture = () => {
        let receiptDetails = {
            amount: amount, memo: memo, store: store,
            purchasedAt: selectedDate.getMonth() + 1 + "/" + selectedDate.getDate() + "/" + selectedDate.getFullYear(),
            fileName: photo["uri"].split('/').pop()
        }
        sendPictureBackend(selectedDate, amount, memo, store, photo, props.addSingleReceipt).then(() => {
            addReceipt(receiptDetails)
        }).then(() => {
            saveImgToDir(photo["uri"]).then(() => {
                props.addSingleReceipt(receiptDetails)
            })
        })
    }

    const getImage = (imgUri) => {
        if (Platform.OS == 'ios') {
            return (<ScrollView minimumZoomScale={1} maximumZoomScale={5}>
                <Image resizeMode="contain" style={{ width: constants.windowWidth, height: imageHeight }}
                    source={{ uri: imgUri }} />
            </ScrollView>)
        } else {
            return (<ImageZoom cropWidth={Dimensions.get('window').width} cropHeight={imageHeight}
                imageWidth={imageWidth} imageHeight={imageHeight}>
                <Image resizeMode="contain" style={{ width: imageWidth, height: imageHeight }}
                    source={{ uri: imgUri }} />
            </ImageZoom>)
        }
    }

    const textInputStyle = { ...constants.textInput, marginBottom: formHeight / 10 }

    return (
        < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>

                <View style={{ justifyContent: "flex-end", flex: 1, paddingBottom: 0 }}>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <TopToolbar {...props} done={savePicture} />
                        <View style={{ backgroundColor: "black" }}>
                            {getImage(photo["uri"])}
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

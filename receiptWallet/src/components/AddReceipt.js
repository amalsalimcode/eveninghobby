import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, Text, Image, KeyboardAvoidingView, Keyboard, Platform } from "react-native"
import { TextInput, TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler"

import ImageZoom from 'react-native-image-pan-zoom'

import TopToolbar from "./TopToolbar"
import { addReceiptDb, addReceiptLabelRelationDb } from "./common/Db"
import ChangeDate from "./common/ChangeDate"
import SelectCategoryAndroid from "./SetCategoryAndroid"
import { saveImgToDir } from "./common/FileSystem"
import { sendPictureBackend } from "./common/Backend"
import { theme, commonStyles } from './common/styles'
import { TextInputMask } from 'react-native-masked-text'
import GradientBackground from "./common/GradientBackground"
import constants, { getTopToolbarHeight, getFormattedDate, uuidv4, checkPrependZero, getSQLformattedDate } from "./common/constants"
import SetLabelText from "./SetLabelText";


const AddReceipt = props => {

    const [amount, setAmount] = useState(0.00);
    const [store, setStore] = useState('');
    const [memo, setMemo] = useState('');

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [category, setCategory] = useState('');
    const [label, setLabel] = useState([]);

    const photo = props.route.params
    const imageWidth = photo["width"]
    let imageHeight = photo["height"] * constants.windowWidth / photo["width"]
    if (imageHeight > constants.windowHeight * 0.6) {
        imageHeight = constants.windowHeight * 0.6
    }

    const formHeight = constants.windowHeight - imageHeight - getTopToolbarHeight() - 50 // 50 is form Margin

    useEffect(() => {
    }, []);


    async function savePicture() {
        let receiptDetails = {
            amount: amount, memo: memo, store: store, uuid: uuidv4(), category: category,
            purchasedAt: getSQLformattedDate(selectedDate),
            fileName: photo["uri"].split('/').pop()
        }

        let receiptId = await addReceiptDb(receiptDetails)
        receiptDetails.id = receiptId

        if (label.length) {
            addReceiptLabelRelationDb(receiptId, label)
        }

        sendPictureBackend(selectedDate, amount, memo, store, photo, props.addSingleReceipt)
        saveImgToDir(photo["uri"]).then(() => {
            props.addSingleReceipt(receiptDetails)
        })
    }

    const getImage = (imgUri) => {
        if (Platform.OS == 'ios') {
            return (<ScrollView minimumZoomScale={1} maximumZoomScale={5}>
                <Image resizeMode="contain" style={{ width: constants.windowWidth, height: imageHeight }}
                    source={{ uri: imgUri }} />
            </ScrollView>)
        } else {
            return (<ImageZoom cropWidth={constants.windowWidth} cropHeight={imageHeight}
                imageWidth={imageWidth} imageHeight={imageHeight}>
                <Image resizeMode="contain" style={{ width: imageWidth, height: imageHeight }}
                    source={{ uri: imgUri }} />
            </ImageZoom>)
        }
    }

    const textInputStyle = { ...commonStyles.textInput }

    return (
        <>
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    enabled={true}
                    style={{ flex: 1 }}>

                    <View style={{ justifyContent: "flex-end", flex: 1, paddingBottom: 0 }}>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <TopToolbar {...props} done={savePicture} />
                            <View style={{ backgroundColor: "black" }}>
                                {getImage(photo["uri"])}
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={{ marginHorizontal: "3%", marginVertical: 25, height: formHeight, justifyContent: "space-around" }}>
                                <View style={{ flexDirection: "row" }}>

                                    <View style={{ ...textInputStyle, width: "35%", justifyContent: "center" }}>
                                        <TouchableWithoutFeedback onPress={() => { setShowDatePicker(true) }}>
                                            <Text> {getFormattedDate(selectedDate)} </Text>
                                        </TouchableWithoutFeedback>
                                    </View>

                                    <View style={{ marginHorizontal: "2%" }} />

                                    <View style={{ ...textInputStyle, justifyContent: "center", width: "20%" }}>
                                        <TextInputMask type={'money'} options={{ precision: 2, separator: '.', delimiter: '.', unit: '$', suffixUnit: '' }}
                                            value={amount} onChangeText={(text) => { setAmount(text) }} />
                                    </View>

                                    <View style={{ marginHorizontal: "2%" }} />
                                    <SelectCategoryAndroid initialValue={"Category"} onSubmit={setCategory} />

                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ ...textInputStyle, width: "59%", justifyContent: "center" }}>
                                        <TextInput placeholder="Store Name" style={textInputStyle} maxLength={50} onChangeText={setStore} value={store} />
                                    </View>

                                    <View style={{ marginHorizontal: "2%" }} />

                                    <SetLabelText selectedTrueLabel={label} setSelectedTrueLabel={setLabel} />

                                </View>
                                <TextInput placeholder="Memo" style={textInputStyle} maxlength={200} onChangeText={setMemo} value={memo} />
                                <View style={{ height: 10 }} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </KeyboardAvoidingView>
                <ChangeDate visible={showDatePicker} setVisible={setShowDatePicker} setDate={setSelectedDate} />
            </GradientBackground>
        </>
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

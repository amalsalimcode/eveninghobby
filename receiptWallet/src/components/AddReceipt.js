import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, Text, Image, KeyboardAvoidingView, Keyboard, Platform } from "react-native"
import { TextInput, TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler"

import ImageZoom from 'react-native-image-pan-zoom'

import TopToolbar from "./TopToolbar"
import { addReceiptDb, addReceiptLabelRelationDb } from "./common/Db"
import ChangeDate from "./common/ChangeDate"
import SelectCategoryAndroid from "./SetCategoryAndroid"
import { addPhotoToAlbum } from "./common/FileSystem"
import { sendPictureBackend } from "./common/Backend"
import { theme, commonStyles } from './common/styles'
import { TextInputMask } from 'react-native-masked-text'
import GradientBackground from "./common/GradientBackground"
import constants, { getTopToolbarHeight, getFormattedDate, uuidv4, checkPrependZero, getSQLformattedDate } from "./common/constants"
import SetLabelText from "./SetLabelText";
import * as Permissions from 'expo-permissions';


const AddReceipt = props => {

    const [amount, setAmount] = useState(0.00);
    const [store, setStore] = useState('');
    const [memo, setMemo] = useState('');

    const [label, setLabel] = useState([]);
    const [category, setCategory] = useState('');
    const [hasPermission, setHasPermission] = useState(null);
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
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            console.log("received permission", status)
            setHasPermission(status === "granted");
        })()
    }, []);

    async function savePicture() {

        let asset = await addPhotoToAlbum(photo["uri"])

        console.log("here is the asset", asset)

        // sql doesn't store time. It only stores date.
        // hence js subtracts one day by if its exact midnight
        selectedDate.setDate(selectedDate.getDate() + 1)
        let receiptDetails = {
            amount: amount, memo: memo, store: store, uuid: uuidv4(), category: category,
            purchasedAt: getSQLformattedDate(selectedDate),
            fileuri: asset["uri"],
            fileid: asset["id"]
        }

        let receiptId = await addReceiptDb(receiptDetails)
        receiptDetails.id = receiptId

        if (label.length) {
            addReceiptLabelRelationDb(receiptId, label)
        }

        sendPictureBackend(selectedDate, amount, memo, store, photo, props.addSingleReceipt)
        props.addSingleReceipt(receiptDetails)
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

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

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
                                    <SelectCategoryAndroid initialValue="Category" onSubmit={setCategory} />

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
        addSingleReceipt: (receipt) => dispatch({ type: "ADD_SINGLE_RECEIPT", receipt: receipt }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReceipt)

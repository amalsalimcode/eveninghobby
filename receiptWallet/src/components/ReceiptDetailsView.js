
import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, ActivityIndicator, Image, KeyboardAvoidingView } from "react-native";
import { ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";

import ImageZoom from "react-native-image-pan-zoom";
import { TextInputMask } from "react-native-masked-text";

import { theme, commonStyles } from "./common/styles";
import GradientBackground from "./common/GradientBackground";
import constants, { getTopToolbarHeight, getBottomToolbarHeight, getFormattedDate } from "./common/constants";
import ChangeDate from "./common/ChangeDate";


const SingleEntryView = props => {
    return (
        <View style={{ flexDirection: "row", width: constants.windowWidth, marginBottom: "5%", borderWidth: 0, height: "3%" }}>
            <View style={{ width: constants.windowWidth / 2, borderWidth: 0, justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 50 }}>
                <Text style={{}} adjustsFontSizeToFit={true}>{props.labelName}</Text>
            </View>
            <View style={{ width: constants.windowWidth / 2 }}>
                <View style={{ height: 20, justifyContent: "center", alignItems: "center", width: 120, borderBottomWidth: 1 }}>
                    {props.children}
                </View>
            </View>
        </View>
    )
}

const DateView = props => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <View style={{ alignItems: "center", marginTop: "10%", marginBottom: "3%", width: constants.windowWidth }}>
            <View style={{ ...commonStyles.textInput, width: "40%", justifyContent: "center", alignItems: "center", borderWidth: 1, borderRadius: 100, backgroundColor: "white", marginBottom: "5%" }}>
                <TouchableWithoutFeedback onPress={() => { setShowDatePicker(true) }}>
                    <Text> {getFormattedDate(props.selectedDate)} </Text>
                </TouchableWithoutFeedback>
            </View>
            <ChangeDate visible={showDatePicker} setVisible={setShowDatePicker} setDate={props.setSelectedDate} date={props.selectedDate} />
        </View>
    )
}

const LabelView = props => {

    function renderActionButtons(actionButtons) {
        let actionButtonsContent = actionButtons.map((button, i) => {
            return (
                <View key={i} style={commonStyles.actionButton}>
                    <Text style={commonStyles.actionButtonText}>{button}</Text>
                </View>
            )
        })
        return actionButtonsContent
    }
    return (
        <View style={{ borderWidth: 0, marginHorizontal: "7%", paddingHorizontal: "1%", height: 100, ...commonStyles.conversationContainer }}>
            <ScrollView>
                <View style={commonStyles.actionButtonsContainer}>
                    {renderActionButtons(props.actionButtons)}
                </View>
            </ScrollView>
        </View>
    )

}

const ReceiptDetailsView = props => {

    const [amount, setAmount] = useState(props.data["amount"]);
    const [store, setStore] = useState(props.data["store"]);
    const [memo, setMemo] = useState(props.data["memo"]);
    const [category, setCategory] = useState(props.data["category"]);
    const [label, setLabel] = useState(props.data["label"]);
    const [selectedDate, setSelectedDate] = useState(new Date(props.data["purchasedAt"]));

    console.log("here is all the data", props.data)

    const availableHeight = constants.windowHeight - getBottomToolbarHeight() - getTopToolbarHeight()

    useEffect(() => {
    }, []);

    return (
        <>
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <KeyboardAvoidingView style={{ flex: 1, height: availableHeight, width: constants.windowWidth }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"} enabled={false}>
                    <View style={{ justifyContent: "flex-end", flex: 1, paddingBottom: 0 }}>

                        <View style={{ height: constants.windowHeight - getTopToolbarHeight() - getBottomToolbarHeight() }}>

                            <DateView selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                            <SingleEntryView labelName="Store:">
                                <TextInput placeholder="Store name" maxLength={50} onChangeText={setStore} value={store} />
                            </SingleEntryView>

                            <SingleEntryView labelName="Amount:">
                                <TextInputMask type={'money'} options={{ precision: 2, separator: '.', delimiter: ',', unit: '$', suffixUnit: '' }}
                                    style={{}} value={amount} onChangeText={(text) => { setAmount(text) }} />
                            </SingleEntryView>

                            <SingleEntryView labelName="Category">
                                <TextInput placeholder="Category Name" maxLength={50} onChangeText={setCategory} value={category} />
                            </SingleEntryView>

                            <View style={{ borderWidth: 1, marginHorizontal: "7%", padding: "1%", borderRadius: 10 }}>
                                <TextInput multiline={false} numberOfLines={2} textAlignVertical="top" placeholder="Memo" style={{ ...constants.textInput, height: 25 }} maxlength={50} onChangeText={(e) => { if (e.length < 200) { setMemo(e) } }} value={memo} />
                            </View>

                            <LabelView actionButtons={['asdf', 'test', 'another', 'second', 'asdfasd', 'gsdf', 'gsdfasdf', 'asdfasdfasdfasd', 'asdsdfsdfsdfssfa', 'asdfasdf', 'asdfasd', 'asdfsf']} />

                            <TouchableOpacity style={{ ...commonStyles.button, width: "30%", marginTop: "10%" }} onPress={() => { }}>
                                <View style={{ marginHorizontal: 10 }}>
                                    <Text style={commonStyles.buttonText}>Update</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ GradientBackground>
        </>

    );
}

export default ReceiptDetailsView

import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import { ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";

import { TextInputMask } from "react-native-masked-text";

import { theme, commonStyles } from "./common/styles";
import GradientBackground from "./common/GradientBackground";
import constants, { getTopToolbarHeight, getBottomToolbarHeight, getFormattedDate, getColor, getSQLformattedDate } from "./common/constants";
import ChangeDate from "./common/ChangeDate";
import { ReadRLRFromReceipt, addReceiptDb, addReceiptLabelRelationDb, updateReceiptDb, deleteReceiptLabelRelationDb } from "./common/Db";
import SetLabelBox from "./SetLabelBox";
import SetCategoryAndroid from "./SetCategoryAndroid";

const availableHeight = constants.windowHeight - getBottomToolbarHeight() - getTopToolbarHeight()


const SingleEntryView = props => {
    return (
        <View style={styles.allEntryContainer}>
            <View style={styles.singleEntryContainer}>
                <Text adjustsFontSizeToFit={true}>{props.labelName}</Text>
            </View>
            <View style={{ width: constants.windowWidth / 2 }}>
                <View style={styles.singleEntryValue}>
                    {props.children}
                </View>
            </View>
        </View>
    )
}

const DateView = props => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <View style={styles.dateContainer}>
            <View style={[commonStyles.textInput, styles.dateView]}>
                <TouchableWithoutFeedback onPress={() => { setShowDatePicker(true) }}>
                    <Text> {getFormattedDate(props.selectedDate)} </Text>
                </TouchableWithoutFeedback>
            </View>
            <ChangeDate visible={showDatePicker} setVisible={setShowDatePicker} setDate={props.setSelectedDate} date={props.selectedDate} />
        </View>
    )
}

const ReceiptDetailsView = props => {

    const [amount, setAmount] = useState(props.data["amount"]);
    const [store, setStore] = useState(props.data["store"]);
    const [memo, setMemo] = useState(props.data["memo"]);
    const [category, setCategory] = useState(props.data["category"]);
    const [dbLabel, setDbLabel] = useState([]);
    const [initialDbLabel, setInitialDbLabel] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date(props.data["purchasedAt"]));


    useEffect(() => {
        ReadRLRFromReceipt(dbLabelResponseHandler, props.data["id"])
    }, []);

    const dbLabelResponseHandler = (result) => {
        setDbLabel(result)
        setInitialDbLabel(result)
    }

    async function updateChanges() {
        let newChanges = { amount: amount, store: store, memo: memo, category: category }
        selectedDate.setDate(selectedDate.getDate() + 1)
        newChanges.purchasedAt = getSQLformattedDate(selectedDate)
        updateReceiptDb(newChanges, props.data["id"])
        props.updateSingleReceipt(newChanges, props.data["index"])

        let addedLabel = dbLabel.filter(x => !initialDbLabel.includes(x));
        if (addedLabel.length) {
            addReceiptLabelRelationDb(props.data["id"], addedLabel)
        }

        let removedLabel = initialDbLabel.filter(x => !dbLabel.includes(x));
        if (removedLabel.length) {
            deleteReceiptLabelRelationDb(removedLabel, props.data["id"])
        }

        props.navigation.goBack()

    }

    return (
        <>
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >

                    <View style={{ justifyContent: "flex-end", flex: 1, paddingBottom: 0, height: availableHeight, width: constants.windowWidth }}>
                        <View style={{ height: constants.windowHeight - getTopToolbarHeight() - getBottomToolbarHeight() }}>

                            <DateView selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                            <SingleEntryView labelName="Store:">
                                <TextInput textAlignVertical="bottom" textAlign='center' placeholder="Store name" maxLength={50} onChangeText={setStore} value={store} />
                            </SingleEntryView>

                            <SingleEntryView labelName="Amount:">
                                <TextInputMask type={'money'} options={{ precision: 2, separator: '.', delimiter: ',', unit: '$', suffixUnit: '' }}
                                    style={{}} value={amount} onChangeText={(text) => { setAmount(text) }} />
                            </SingleEntryView>

                            <View style={styles.allEntryContainer}>
                                <View style={styles.singleEntryContainer}>
                                    <Text adjustsFontSizeToFit={true}>Category</Text>
                                </View>
                                <View style={{ width: constants.windowWidth / 2 }}>
                                    <View>
                                        <SetCategoryAndroid initialValue={category ? category : "Category"} longView={true} onSubmit={setCategory} labelStyle={{ alignItems: "center", width: 120, justifyContent: "flex-end", height: 25 }} />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.memoView}>
                                <TextInput multiline={false} placeholder="Memo" style={{ ...constants.textInput, height: 30 }} maxlength={50} onChangeText={(e) => { if (e.length < 200) { setMemo(e) } }} value={memo} />
                            </View>

                            <SetLabelBox selectedTrueLabel={dbLabel} setSelectedTrueLabel={setDbLabel} />

                            <View style={{ ...commonStyles.button, width: "30%", marginTop: 0.10 * availableHeight, borderWidth: 1, borderColor: "grey" }}>
                                <TouchableOpacity style={{ width: 0.3 * constants.windowWidth }} onPress={updateChanges}>
                                    <Text style={commonStyles.buttonText}>Update</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
            </ GradientBackground>
        </>

    );
}

const styles = StyleSheet.create({
    labelLimitContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        marginHorizontal: "7%",
        height: 0.15 * availableHeight
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        flexWrap: 'wrap',
    },
    singleLabel: {
        backgroundColor: "grey",
        borderRadius: 30,
        padding: 7,
        marginRight: 10,
        marginBottom: 10,
    },
    singleLabelText: {
        color: 'white',
        fontSize: 12,
        alignSelf: 'center'
    },
    dateContainer: {
        alignItems: "center",
        marginTop: 0.05 * availableHeight,
        marginBottom: "6%",
        width: constants.windowWidth
    },
    allEntryContainer: {
        flexDirection: "row",
        width: constants.windowWidth,
        marginBottom: 0.03 * availableHeight,
        borderWidth: 0,
        height: 25,
    },
    singleEntryContainer: {
        width: constants.windowWidth / 2,
        borderWidth: 0,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingRight: 50
    },
    singleEntryValue: {
        justifyContent: "flex-end",
        alignItems: "center",
        width: 120,
        borderBottomWidth: 1,
        alignContent: "center",
        flex: 1,
    },
    dateView: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: "white"
    },
    memoView: {
        borderWidth: 1,
        marginHorizontal: "7%",
        padding: "1%",
        borderRadius: 10,
        marginTop: 0.03 * availableHeight,
        marginBottom: 0.06 * availableHeight,
        justifyContent: "center",
        alignContent: "center",
    }
})


function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSingleReceipt: (receiptDetails, index) => dispatch({ type: "UPDATE_SINGLE_RECEIPT", receiptDetails: receiptDetails, index: index })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptDetailsView)
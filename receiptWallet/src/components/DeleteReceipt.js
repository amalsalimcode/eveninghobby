import { connect } from "react-redux";
import React, { useEffect, } from "react";
import { View, Button } from "react-native";

import { deleteReceiptDb } from "./common/Db";
import { deleteReceipt } from "./common/Backend";
import GradientBackground from "./common/GradientBackground";
import { theme, commonStyles } from "./common/styles";
import { Text } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";


function getKeyByValue(object) {
    let selectKeys = []
    for (var key in object) {
        if (object[key]) {
            selectKeys.push(key)
        }
    }
    return selectKeys
}

const DeleteReceipt = props => {

    useEffect(() => {
    }, []);

    function deletePhoto() {
        let uuid = getKeyByValue(props.selectedItems)
        deleteReceiptDb(uuid)
        deleteReceipt(Object.keys(props.selectedItems))
        props.deleteReceiptSelected()
        props.decreaseReceiptCount()
        props.navigation.navigate("Receipts")
    }


    let deleteCount = Object.keys(props.selectedItems).length
    return (
        < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
            <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                <Text>Delete {deleteCount} receipt{deleteCount > 1 ? "s" : ""}</Text>
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <View style={{ ...commonStyles.button, borderWidth: 1, borderColor: "grey", marginRight: 50 }}>
                        <TouchableOpacity style={{ width: 100 }} onPress={() => { props.navigation.goBack() }}>
                            <Text style={commonStyles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...commonStyles.button, borderWidth: 1, borderColor: "grey" }}>
                        <TouchableOpacity style={{ width: 100 }} onPress={deletePhoto}>
                            <Text style={commonStyles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ GradientBackground>
    );
}

function mapStateToProps(state) {
    return {
        selectedItems: state.ReceiptSelectorReducer.selectedItems
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteReceiptSelected: () => dispatch({ type: "DELETE_RECEIPT_SELECTED" }),
        decreaseReceiptCount: () => dispatch({ type: "DEC_TOTAL_RECEIPT_COUNT" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteReceipt)
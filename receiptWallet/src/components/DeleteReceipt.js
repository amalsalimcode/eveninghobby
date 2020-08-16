import { connect } from "react-redux";
import React, { useEffect, } from "react";
import { View, Button } from "react-native";

import { deleteReceiptDb } from "./common/Db";
import { deleteReceipt } from "./common/Backend";


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

    return (
        <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
            <Button title="Press to Confirm" onPress={deletePhoto} />
        </View>
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
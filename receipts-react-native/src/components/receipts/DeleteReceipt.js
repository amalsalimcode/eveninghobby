import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from "react-native";
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import { connect } from "react-redux";
import constants, { getFormattedDate } from '../common/constants'

const DeleteReceipt = props => {


    useEffect(() => {
    }, []);

    function deletePhoto() {
        deletePhotoAsync()
        props.deleteReceiptSelected()
        props.navigation.navigate("Receipts")
    }

    async function deletePhotoAsync() {

        var request_body = JSON.stringify(
            Object.keys(props.selectedItems)
        )

        await fetch(constants.ngrokHost + 'receipt/delete', {
            method: 'POST',
            body: request_body
        })
    }


    return (
        <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
            <Button title="Press to Confirm" onPress={deletePhoto}/>
        </View>
    );
}

const styles = StyleSheet.create({

});


function mapStateToProps(state) {
    return {
        selectedItems: state.ReceiptSelectorReducer.selectedItems
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteReceiptSelected: () => dispatch({ type: "DELETE_RECEIPT_SELECTED" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteReceipt)
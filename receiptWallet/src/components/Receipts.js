'use strict'

import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import constants from "./common/constants"
import ReceiptsBottomToolbar from "./ReceiptsBottomToolbar";
import GradientBackground from "./common/GradientBackground";
import { theme } from "./common/styles";
import SingleReceipt from "./SingleReceipt";
import { createTable, ReadReceipt } from "./common/Db";
import { createImgDir } from "./common/FileSystem";


const Receipts = props => {

    useEffect(() => {
        createImgDir()
        createTable()
        ReadReceipt(props.setReceipt)
    }, []);


    const renderItem = ({ item, index }) => {
        if (props.deletedItems[item["uuid"]]) {
            return <></>
        }
        var tmpIndex = index - 1
        while (tmpIndex >= 0 && props.deletedItems[props.allReceipts[tmpIndex]["uuid"]]) {
            tmpIndex = tmpIndex - 1
        }
        let prev_dt = ''
        if (tmpIndex >= 0) {
            prev_dt = props.allReceipts[tmpIndex]["purchasedAt"]
        }
        item["index"] = index
        return <SingleReceipt {...props} value={item} prev_dt={prev_dt} />
    }

    if (!props.allReceipts) {
        return (
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <View style={{ justifyContent: "center", alignContent: "center" }}>
                    <ActivityIndicator />
                </View>
                <ReceiptsBottomToolbar {...props} />
            </ GradientBackground>
        )
    } else {
        return (
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <SafeAreaView style={{ height: constants.windowHeight - 55 }}>
                    <FlatList
                        bounces={false}
                        data={props.allReceipts}
                        renderItem={renderItem}
                        keyExtractor={(item) => {return item["fileId"]}} />
                </SafeAreaView>
                <ReceiptsBottomToolbar {...props} />
            </ GradientBackground >
        );
    }
}

function mapStateToProps(state) {
    return {
        allReceipts: state.AllReceiptsReducer.allReceipts,
        deletedItems: state.ReceiptSelectorReducer.deletedItems,
        toggleUpdate: state.AllReceiptsReducer.toggleUpdate,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setReceipt: (receipts) => dispatch({ type: "SET_RECEIPTS", receipts: receipts }),
        incReceiptCountBatch: (receipts) => dispatch({ type: "INC_RECEIPT_COUNT_BATCH", receipts: receipts }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipts)

'use strict'

import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import constants from "./common/constants"
import GradientBackground from "./common/GradientBackground";
import { theme } from "./common/styles";
import SingleReceipt from "./SingleReceipt";
import { executeQuery } from "./common/Db";
import TopToolbar from "./TopToolbar";
import { Text } from "native-base";


const SearchResults = props => {

    const [value, setValue] = useState(null)
    const [noResults, setNoresults] = useState(false)

    useEffect(() => {
        executeQuery(props.route.params["query"], setDbResults)
    }, []);

    const setDbResults = (arg) => {
        if (!arg.length) {
            setNoresults(true)
        }
        setValue(arg)
    }

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

    if (noResults) {
        return (
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <TopToolbar {...props} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>No receipts found for your search</Text>
                </View>
            </ GradientBackground>
        )
    }
    if (!value) {
        return (
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <View style={{ justifyContent: "center", alignContent: "center" }}>
                    <TopToolbar {...props} />
                    <ActivityIndicator />
                </View>
            </ GradientBackground>
        )
    } else {
        return (
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <TopToolbar {...props} />
                <FlatList
                    bounces={false}
                    data={value}
                    renderItem={renderItem}
                    keyExtractor={(item) => { return item["fileuri"] }} />
                <View style={{ height: 20 }} />
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
        incReceiptCountBatch: (receipts) => dispatch({ type: "INC_RECEIPT_COUNT_BATCH", receipts: receipts })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)

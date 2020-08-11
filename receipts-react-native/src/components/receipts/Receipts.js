import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from "react-native";
import constants, { uuidv4, getFormattedDate } from '../common/constants'
import ReceiptsBottomToolbar from "./ReceiptsBottomToolbar";
import { ScrollView, TouchableOpacity, FlatList } from "react-native-gesture-handler";
import GradientBackground from "../common/GradientBackground";
import { theme } from "../common/styles";
import SingleReceipt from "./SingleReceipt";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";

let allDataReceived = false

const Receipts = props => {

    const getNewReceiptBatch = () => {

        props.incReceiptCountBatch()

        var request_body = JSON.stringify({
            "initLen": props.totalCount
        })
        fetch(constants.ngrokHost + 'receipt/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: request_body
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                return "done"
            }
        }).then((json) => {
            if (json == "done") {
                allDataReceived = true
            } else {
                props.setReceipt(json)
            }
        })
    }

    useEffect(() => {
        getNewReceiptBatch()
    }, []);


    const renderItem = ({ item, index }) => {
        if (props.deletedItems[item["uuid_str"]]) {
            return <></>
        }
        var tmpIndex = index - 1
        while (tmpIndex >= 0 && props.deletedItems[props.allReceipts[tmpIndex]["uuid_str"]]) {
            tmpIndex = tmpIndex - 1
        }

        let prev_dt = ''
        if (tmpIndex >= 0) {
            prev_dt = props.allReceipts[tmpIndex]["purchasedAt_str"]
        }

        return <SingleReceipt {...props} value={item} prev_dt={prev_dt} />
    }

    const endReached = () => {
        if (!allDataReceived) {
            getNewReceiptBatch()
        }
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
                        onScrollBeginDrag={()=>{console.log("im being dragged®")}}
                        bounces={false}
                        data={props.allReceipts}
                        renderItem={renderItem}
                        removeClippedSubviews={true}
                        updateCellsBatchingPeriod={30}
                        maxToRenderPerBatch={40}
                        initialNumToRender={20}
                        windowSize={21}
                        onEndReached={endReached}
                        onEndReachedThreshold={5}
                        keyExtractor={item => item["uuid_str"]} />
                </SafeAreaView>
                <ReceiptsBottomToolbar {...props} />
            </ GradientBackground >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    visit: {
        fontWeight: '300',
        fontSize: 16,
        color: "black",
        marginBottom: 3
    },
    textContainer: {
        borderBottomWidth: 2,
        marginBottom: 10,
        width: constants.windowWidth - 50,
    },
    square: {
        alignSelf: "center",
        borderColor: "#3e424b",
        width: "95%",
        marginBottom: 8,
        borderWidth: 0.7,
    },
});


function mapStateToProps(state) {
    return {
        allReceipts: state.AllReceiptsReducer.allReceipts,
        toggleUpdate: state.AllReceiptsReducer.toggleUpdate,
        deletedItems: state.ReceiptSelectorReducer.deletedItems,
        totalCount: state.AllReceiptsReducer.totalCount
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setReceipt: (receipts) => dispatch({ type: "SET_RECEIPTS", receipts: receipts }),
        incReceiptCountBatch: (receipts) => dispatch({ type: "INC_RECEIPT_COUNT_BATCH", receipts: receipts })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipts)

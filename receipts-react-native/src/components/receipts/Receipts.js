import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import constants from '../common/constants'
import ReceiptsBottomToolbar from "./ReceiptsBottomToolbar";
import { FlatList } from "react-native-gesture-handler";
import GradientBackground from "../common/GradientBackground";
import { theme } from "../common/styles";
import SingleReceipt from "./SingleReceipt";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { getNewReceiptBatch } from "./Backend"
import { db, success, error } from './Db'


let allDataReceived = false

// success function
function useForceUpdate() {
    const [value, setValue] = useState(0);
    console.log("forceUpdate called!!!!!!")
    return [() => setValue(value + 1), value];
}

const Receipts = props => {

    const [forceUpdate, forceUpdateId] = useForceUpdate()

    // const addReceipt = (v: {amount: float; memo: String; store: String, purchasedAt: Date, imageUri: String}) => {
    const addReceipt = (amount, memo, store, purchasedAt, imageUri) => {

        db.transaction(
            tx => {
                tx.executeSql("insert into receipt (amount, store, memo, uri, purchasedAt) values (?, ?, ?, ?, ?)", [23.4, "testStore", "testMemo", "testURI", "2020/12/12"], success, error);
            },
            null,
            forceUpdate
        );
    }

    const ReadReceipt = () => {
        db.transaction(
            tx => {
                tx.executeSql("select * from receipt", [], (_, { rows }) =>console.log(rows["_array"]));
            },
            null,
            forceUpdate
        );
    }

    useEffect(() => {
        allDataReceived = getNewReceiptBatch(props.incReceiptCountBatch, props.totalCount, props.setReceipt)

        db.transaction(tx => {
            tx.executeSql("DROP TABLE IF EXISTS receipt")
            tx.executeSql(
                "create table if not exists receipt (id integer primary key not null, amount FLOAT, store TEXT, memo TEXT, uri TEXT, purchasedAt DATE);"
            );
        });

        addReceipt()

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
            allDataReceived = getNewReceiptBatch(props.incReceiptCountBatch, props.totalCount, props.setReceipt)
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
                        onScrollBeginDrag={() => { console.log("im being dragged®") }}
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

function mapStateToProps(state) {
    return {
        allReceipts: state.AllReceiptsReducer.allReceipts,
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

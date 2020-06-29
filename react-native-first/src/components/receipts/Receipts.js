import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator } from "react-native";
import constants, { uuidv4, getFormattedDate } from '../common/constants'
import SingleDataTemplate from "../transactions/details/SingleDataTemplate";
import ReceiptsBottomToolbar from "./ReceiptsBottomToolbar";

const Receipts = props => {

    const [allReceipts, setAllReceipts] = useState(null);

    useEffect(() => {
        var request_body = JSON.stringify({
            "test": "testVal"
        })

        fetch('http://127.0.0.1:8000/receipt/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: request_body
        }).then((response) => response.json())
            .then((json) => { setAllReceipts(json) })
    }, []);

    const getReceiptsStructured = () => {

        let idx = 0
        let receiptsStructured = []

        var cur_dt = ''
        for (idx = 0; idx < allReceipts.length; idx++) {
            let uuid = allReceipts[idx]["uuid_str"]
            if (cur_dt != allReceipts[idx]["createdAt_str"]) {
                cur_dt = allReceipts[idx]["createdAt_str"]
                receiptsStructured.push(
                    <View style={{ marginHorizontal: 10, opacity: 0.5, marginTop: 15, marginLeft: 15 }} key={uuidv4()}>
                        <View style={styles.textContainer}>
                            <Text style={styles.visit}>{getFormattedDate(new Date(allReceipts[idx]["createdAt_str"]), false)}</Text>
                        </View>
                    </View>
                )
            }
            receiptsStructured.push(
                <SingleDataTemplate onClick={() => { props.navigation.navigate('SingleReceipt', { 'uuid': uuid }) }} initialHeight={45} expandHeight={45} {...props} key={uuidv4()} highlightBorder={false}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ marginTop: 10 }}>{allReceipts[idx]["name"]}</Text>
                        <Text style={{ marginTop: 10 }}>${allReceipts[idx]["amount"]}</Text>
                    </View >
                </SingleDataTemplate >
            )
        }
        return receiptsStructured
    }

    if (!allReceipts) {
        return (
            <>
                <View style={{ justifyContent: "center", alignContent: "center" }}>
                    <ActivityIndicator />
                </View>
            </>
        )
    } else {
        return (
            <>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    {getReceiptsStructured()}
                </View>
                <ReceiptsBottomToolbar />
            </>
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
    }
});

export default Receipts

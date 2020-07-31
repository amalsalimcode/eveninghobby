import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from "react-native";
import constants, { uuidv4, getFormattedDate } from '../common/constants'
import SingleDataTemplate from "../transactions/details/SingleDataTemplate";
import ReceiptsBottomToolbar from "./ReceiptsBottomToolbar";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import GradientBackground from "../common/GradientBackground";
import { theme } from "../common/styles";
import SingleReceipt from "./SingleReceipt";
import { SafeAreaView } from "react-native-safe-area-context";

const Receipts = props => {

    const [allReceipts, setAllReceipts] = useState(null);

    useEffect(() => {
        var request_body = JSON.stringify({
            "test": "testVal"
        })

        fetch(constants.ngrokHost + 'receipt/', {
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

            /* first insert the date */
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

            /* insert the receipt */
            receiptsStructured.push(
                <SingleReceipt {...props} value={allReceipts[idx]} key={uuidv4()} />

            )
        }
        return receiptsStructured
    }

    if (!allReceipts) {
        return (
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <View style={{ justifyContent: "center", alignContent: "center" }}>
                    <ActivityIndicator />
                </View>
            </ GradientBackground>
        )
    } else {
        return (
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <SafeAreaView contentContainerStyle={{ justifyContent: "center" }}>
                    <ScrollView>
                        {getReceiptsStructured()}
                        {getReceiptsStructured()}
                        {getReceiptsStructured()}
                        <View style={{height: 100}} />
                    </ScrollView>
                </SafeAreaView>
                <ReceiptsBottomToolbar {...props} />
            </ GradientBackground>
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

export default Receipts

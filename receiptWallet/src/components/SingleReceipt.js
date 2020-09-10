import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants, { getFormattedDate } from './common/constants'
import { ReadRLRFromReceipt } from "./common/Db";

const SingleReceipt = props => {

    const [borderWidth, setBorderWidth] = useState(0.7);
    const [dbLabel, setDbLabel] = useState([])
    const [showImage, setShowImage] = useState(true)

    useEffect(() => {
    }, []);

    function processDbLabelResponse(arg) {
        if (JSON.stringify(arg) == JSON.stringify(dbLabel)) {
            return
        }
        setDbLabel(arg)
    }

    function longPressed() {
        if (borderWidth == 0.7) {
            setBorderWidth(2)
            props.incSelectCount(props.value["uuid"])
        } else {
            setBorderWidth(0.7)
            props.decSelectCount(props.value["uuid"])
        }
    }

    function shortPressed() {
        if (props.isSelected) {
            if (borderWidth == 0.7) {
                setBorderWidth(2)
                props.incSelectCount(props.value["uuid"])
            } else {
                setBorderWidth(0.7)
                props.decSelectCount(props.value["uuid"])
            }
        } else {
            props.navigation.navigate('ReceiptView', { 'fileuri': props.value["fileuri"], 'value': props.value })
        }
    }

    const insertDate = () => {
        if (props.prev_dt != props.value["purchasedAt"]) {
            let dt = new Date(props.value["purchasedAt"])

            return (
                <View style={{ marginHorizontal: 10, opacity: 0.5, marginTop: 15, marginLeft: 15 }}>
                    <View style={styles.textContainer}>
                        <Text style={styles.visit}>{getFormattedDate(dt)}</Text>
                    </View>
                </View>
            )
        }
    }

    const getAmount = () => {
        if (props.value["amount"]) {
            return (
                <Text style={{}}>{props.value["amount"]}</Text>
            )
        }
    }

    function renderbuttons() {

        let receiptId = "receiptid" in Object(props.value) ? props.value["receiptid"] : props.value["id"]
        ReadRLRFromReceipt(processDbLabelResponse, receiptId)

        let maxCount = 1
        let renderedButton = []
        for (let idx = 0; idx < dbLabel.length; idx++) {
            if (idx == maxCount) {
                renderedButton.push(
                    <View key={maxCount} style={styles.singleLabel}>
                        <Text style={styles.singleLabelText}>{dbLabel.length - maxCount}+</Text>
                    </View>
                )
                break
            }
            renderedButton.push(
                <View key={idx} style={styles.singleLabel}>
                    <Text style={styles.singleLabelText}>{dbLabel[idx]}</Text>
                </View>
            )
        }
        return renderedButton
    }

    return (
        <>
            {insertDate()}
            <TouchableOpacity style={{ ...styles.square, borderWidth: borderWidth }} onPress={shortPressed} onLongPress={longPressed}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", height: 60, width: "80%" }}>
                        {showImage ?
                            <Image style={{ borderRadius: 2, height: 55, width: 40, marginLeft: 5, marginVertical: 1, resizeMode: "contain" }} source={{ uri: props.value["fileuri"] }} onError={() => { setShowImage(false) }} />
                            : <></>}
                        <View style={{ justifyContent: "center" }}>
                            {props.value["store"] ? <Text style={{ marginLeft: 10 }}>{props.value["store"]}</Text> : <></>}
                            <View style={{ flexDirection: "row", width: "85%", marginVertical: 1 }}>
                                {props.value["memo"] ? <Text style={{ marginLeft: 10, height: 18 }}>{props.value["memo"]}</Text> : <></>}
                                {props.value["memo"].length > 50 ? <Text>...</Text> : <></>}
                            </View>
                            <View style={{ ...styles.labelContainer, marginVertical: 1 }}>
                                {renderbuttons()}
                            </View>
                        </View>
                    </View>
                    <View style={{ width: "20%", alignItems: "flex-end", paddingRight: 5 }}>
                        {getAmount()}
                    </View>
                </View >
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "#3e424b",
        width: "95%",
        marginBottom: 8,
        paddingVertical: 2
    },
    textContainer: {
        borderBottomWidth: 2,
        marginBottom: 10,
        width: constants.windowWidth - 50,

    },
    labelContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10,
        width: 200,
        opacity: 0.5,
    },
    singleLabel: {
        borderRadius: 30,
        borderWidth: 0.7,
        paddingHorizontal: 10,
        marginRight: 5
    },
    singleLabelText: {
        fontSize: 12,
        alignSelf: 'center'
    },
});


function mapStateToProps(state) {
    return {
        isSelected: state.ReceiptSelectorReducer.isSelected,
        isDeleted: state.ReceiptSelectorReducer.deletedItems
    }
}

function mapDispatchToProps(dispatch) {
    return {
        incSelectCount: (id) => dispatch({ type: "INC_SELECT_RECEIPT_COUNT", id: id }),
        decSelectCount: (id) => dispatch({ type: "DEC_SELECT_RECEIPT_COUNT", id: id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleReceipt)

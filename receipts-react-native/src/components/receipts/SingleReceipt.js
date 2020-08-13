import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import constants, { getFormattedDate } from '../common/constants'

const SingleReceipt = props => {

    // console.log("Im in single receipt")
    const [borderWidth, setBorderWidth] = useState(0.7);

    useEffect(() => {
    }, []);

    function longPressed() {
        if (borderWidth == 0.7) {
            setBorderWidth(2)
            props.incSelectCount(props.value["id"])
        } else {
            setBorderWidth(0.7)
            props.decSelectCount(props.value["id"])
        }
    }

    function shortPressed() {
        if (props.isSelected) {
            if (borderWidth == 0.7) {
                setBorderWidth(2)
                props.incSelectCount(props.value["id"])
            } else {
                setBorderWidth(0.7)
                props.decSelectCount(props.value["id"])
            }
        } else {
            // props.navigation.navigate('ReceiptView', { 'uuid': props.value["uuid_str"], 'img': props.value["image_fill"] })
            props.navigation.navigate('ReceiptView', { 'fileName': props.value["fileName"], 'value': props.value })
        }
    }

    const insertDate = () => {
        if (props.prev_dt != props.value["purchasedAt"]) {
            return (
                <View style={{ marginHorizontal: 10, opacity: 0.5, marginTop: 15, marginLeft: 15 }}>
                    <View style={styles.textContainer}>
                        <Text style={styles.visit}>{getFormattedDate(new Date(props.value["purchasedAt"]), false)}</Text>
                    </View>
                </View>
            )
        }
    }

    return (
        <>
            {insertDate()}
            <TouchableOpacity style={{ ...styles.square, borderWidth: borderWidth }} onPress={shortPressed} onLongPress={longPressed}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image style={{ borderRadius: 2, height: 45, width: 30, marginLeft: 5, marginVertical: 1, resizeMode: "contain" }} source={{ uri: constants.rootDir + "/" +  props.value["fileName"] }} />
                        <Text style={{ marginLeft: 10 }}>{props.value["store"]}</Text>
                    </View>
                    <Text style={{}}>${props.value["amount"]}</Text>
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
    },
    textContainer: {
        borderBottomWidth: 2,
        marginBottom: 10,
        width: constants.windowWidth - 50,
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
        incSelectCount: (id) => dispatch({ type: "INC_RECEIPT_COUNT", id: id }),
        decSelectCount: (id) => dispatch({ type: "DEC_RECEIPT_COUNT", id: id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleReceipt)


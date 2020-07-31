import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";

const SingleReceipt = props => {

    const [borderWidth, setBorderWidth] = useState(0.7);

    useEffect(() => {
    }, []);

    function longPressed() {
        console.log("long perssed", props.isSelected)
        if (borderWidth == 0.7) {
            setBorderWidth(2)
            props.incSelectCount()
        } else {
            setBorderWidth(0.7)
            props.decSelectCount()
        }
    }

    function shortPressed() {
        if (props.isSelected) {
            if (borderWidth == 0.7) {
                setBorderWidth(2)
                props.incSelectCount()
            } else {
                setBorderWidth(0.7)
                props.decSelectCount()
            }
        } else {
            props.navigation.navigate('ReceiptView', { 'uuid': props.value["uuid_str"] })
        }
    }

    return (
        <TouchableOpacity style={{ ...styles.square, borderWidth: borderWidth }} onPress={shortPressed} onLongPress={longPressed}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image style={{ borderRadius: 2, height: 45, width: 30, marginLeft: 5, marginVertical: 1, resizeMode: "contain" }} source={{ uri: props.value["image_fill"] }} />
                    <Text style={{ marginLeft: 10 }}>{props.value["name"]}</Text>
                </View>
                <Text style={{}}>${props.value["amount"]}</Text>
            </View >
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "#3e424b",
        width: "95%",
        marginBottom: 8,
    },
});


function mapStateToProps(state) {
    return {
        isSelected: state.ReceiptSelectorReducer.isSelected
    }
}

function mapDispatchToProps(dispatch) {
    return {
        incSelectCount: () => dispatch({ type: "INC_RECEIPT_COUNT" }),
        decSelectCount: () => dispatch({ type: "DEC_RECEIPT_COUNT" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleReceipt)


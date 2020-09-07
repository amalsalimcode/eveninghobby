import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants, { getFormattedDate } from './common/constants'

const SingleReceipt = props => {

    const [borderWidth, setBorderWidth] = useState(0.7);
    const [image, setImage] = useState(null);

    useEffect(() => {
        setImage(
            <Image style={{ borderRadius: 2, height: 45, width: 30, marginLeft: 5, marginVertical: 1, resizeMode: "contain" }} source={{ uri: constants.rootDir + "/" + props.value["fileName"] }} />
        )
    }, []);

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
            props.navigation.navigate('ReceiptView', { 'fileName': props.value["fileName"], 'value': props.value })
        }
    }

    const insertDate = () => {
        console.log("going to insert date", props.value["purchasedAt"])
        if (props.prev_dt != props.value["purchasedAt"]) {
            let dt = new Date(props.value["purchasedAt"])
            // sql doesn't store time. It only stores date.
            // hence js subtracts one day by if its exact midnight
            dt.setDate(dt.getDate() + 1);
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

    return (
        <>
            {insertDate()}
            <TouchableOpacity style={{ ...styles.square, borderWidth: borderWidth}} onPress={shortPressed} onLongPress={longPressed}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", height: 45 }}>
                        {image}
                        <View>
                            <Text style={{ marginLeft: 10 }}>{props.value["store"]}</Text>
                        </View>
                    </View>
                    {getAmount()}
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
        incSelectCount: (id) => dispatch({ type: "INC_SELECT_RECEIPT_COUNT", id: id }),
        decSelectCount: (id) => dispatch({ type: "DEC_SELECT_RECEIPT_COUNT", id: id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleReceipt)

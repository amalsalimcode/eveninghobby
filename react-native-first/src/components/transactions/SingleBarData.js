/*
 * All transaction Data is loaded here
 */

import { connect } from 'react-redux'
import React, { useRef } from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


const SingleBarData = props => {

    var total_height = 25
    const cur_height = useRef(new Animated.Value(total_height)).current;

    const change_height = () => {

        const expanded_height = 110
        if (total_height == expanded_height) {
            total_height = 25
        } else {
            total_height = expanded_height
        }

        Animated.timing(cur_height, {
            toValue: total_height,
            duration: 1000
        }).start()
    }

    const transaction = props.bar_data[props.uuid].transaction_data[props.trans_idx]
    const name = transaction["NAME"]
    const institution = transaction["institution"]
    const ref_num = transaction["FITID"]
    const amount_str = transaction["TRNAMT"]
    const memo = transaction["MEMO"]
    const purchase_date = transaction["month"] + "-" + transaction["day"] + "-" + transaction["year"]

    var institution_color = "grey"
    if (institution == "AMEX") {
        institution_color = "blue"
    } else if (institution == "WELLS") {
        institution_color = "red"
    }

    amount = Number(parseFloat(amount_str)).toFixed(2) * -1

    return (
        <>
            <TouchableOpacity onPress={() => (change_height())} style={{...styles.square, borderLeftColor: institution_color}}>
                <Animated.View style={{ height: cur_height, paddingTop: 3 }}>
                    <View style={{ marginLeft: 10 }} shadowOffset={{ height: 10 }}
                        shadowColor='black'
                        shadowOpacity={0.4}
                        shadowOffset={{ height: 2, width: 2 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>{name}</Text>
                            <Text>${amount}  </Text>
                        </View>
                        <Text></Text>
                        <Text>Date of Purchase: {purchase_date}</Text>
                        <Text>Memo: {memo}</Text>
                        <Text>Reference Number: {ref_num}  </Text>
                        <Text>Institution: {institution}</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "grey",
        borderLeftWidth: 4,
        backgroundColor: "white",
        borderWidth: 0.3,
        borderRadius: 10,
        shadowColor: "black",
        width: "95%",
        shadowOpacity: 0.1,
        shadowRadius: 40,
        marginBottom: 8,
    },
});

function mapStateToProps(state) {
    return {
        bar_data: state.TransactionsReducer.bar_data
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBarData)
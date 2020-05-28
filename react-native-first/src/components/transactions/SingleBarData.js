/*
 * All transaction Data is loaded here
 */

import { connect } from 'react-redux'
import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from './CommonStyles'


const SingleBarData = props => {

    const [fontSize, setFontSize] = useState(15);
    const [fontSizeExp, setFontSizeExp] = useState(1);
    const [height, setHeight] = useState(110)
    const [nameLen, setNameLen] = useState(15)

    const curHeight = useRef(new Animated.Value(25)).current;

    const changeHeight = () => {

        // check to see if the user was swiping for
        // accounts view, instead of expand bar data
        if (props.swipeIntercept) {
            return
        }

        Animated.timing(curHeight, {
            toValue: height,
            duration: 1000
        }).start()

        height == 110 ? setHeight(25) : setHeight(110)
        fontSize == 1 ? setFontSize(15) : setFontSize(1)
        nameLen == 15 ? setNameLen(110) : setNameLen(15)
        fontSizeExp == 1 ? setFontSizeExp(15) : setFontSizeExp(1)

    }

    useEffect(() => { });

    const transaction = props.barData[props.uuid].transaction_data[props.transIdx]

    const name = transaction["name"].slice(0, nameLen)
    const institution = transaction["institution"]
    const amount = transaction["charge"]
    const purchaseDate = transaction["date"]

    return (
        <>
            <TouchableOpacity onPress={() => (changeHeight())} style={{
                ...styles.square,
                borderLeftColor: institution in COLORS ? COLORS[institution].primary : "black"
            }}>

                <Animated.View style={{ height: curHeight, paddingTop: 3 }}>
                    <View style={{ marginLeft: 10 }} shadowOffset={{ height: 10 }}
                        shadowColor='black'
                        shadowOpacity={0.4}
                        shadowOffset={{ height: 2, width: 2 }}>

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>{name}</Text>
                            <Text style={{ fontSize: fontSize }}>${amount}  </Text>
                        </View>
                        <Text></Text>
                        <Text style={{ fontSize: fontSizeExp }}>Amount: ${amount}  </Text>
                        <Text>Institution: {institution}</Text>
                        <Text>Date of Purchase: {purchaseDate}</Text>
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
        barData: state.TransactionsReducer.bar_data,
        swipeIntercept: state.SwipeReducer.barDataSwiped
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBarData)
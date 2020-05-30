/*
 * All transaction Data is loaded here
 */

import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import SingleDataTemplate from './SingleDataTemplate';


const SingleBarData = props => {

    const [fontSize, setFontSize] = useState(15);
    const [fontSizeExp, setFontSizeExp] = useState(1);
    const [nameLen, setNameLen] = useState(15)

    const changeHeight = () => {

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
        <SingleDataTemplate onClick={changeHeight} expandHeight={80}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>{name}</Text>
                <Text style={{ fontSize: fontSize }}>${amount}  </Text>
            </View>
            <Text></Text>
            <Text style={{ fontSize: fontSizeExp }}>Amount: ${amount}  </Text>
            <Text>Institution: {institution}</Text>
            <Text>Date of Purchase: {purchaseDate}</Text>
        </SingleDataTemplate>
    )
}

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
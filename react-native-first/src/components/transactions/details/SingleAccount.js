import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SingleDataTemplate from "./SingleDataTemplate";
import { connect } from 'react-redux'


const SingleAccount = props => {
    useEffect(() => {
    });

    var accountId = props.data["accountId"]
    var expense = props.expensePerAccount[accountId]

    var expense_rounded = expense ? Number((expense).toFixed(1)) : expense
    const [fontSize, setFontSize] = useState(15);

    if (!expense) {
        return (<></>)
    } else {
        return (
            <SingleDataTemplate expandHeight={110}>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>{props.data["accountName"]}</Text>
                    <Text style={{ fontSize: fontSize }}>${expense_rounded}  </Text>
                </View>
                <Text></Text>
                <Text>
                    Account: {accountId}
                </Text>
                <Text>
                    Account Type: {props.data["accountType"]}
                </Text>
                <Text>
                    Bank: {props.data["institution"]}
                </Text>
            </SingleDataTemplate>
        );
    }
}

function mapStateToProps(state) {
    return {
        bar_data: state.TransactionsReducer.bar_data,
        meta: state.TransactionsReducer.meta_data,
        curDate: state.TransactionsReducer.meta_data.fullDate,
        expensePerAccount: state.BarSummaryReducer.expensePerAccount
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearEnabledBars: () => dispatch({ type: "CLEAR_ENABLED_BARS" }),
        changeCurWeek: (direction) => dispatch({ type: "CHANGE_CUR_WEEK", direction: direction })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleAccount)

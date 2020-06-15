import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import SingleDataTemplate from "./SingleDataTemplate";
import { connect } from 'react-redux'


export const bankMapping = {
    "Wells Fargo": require("../../../../assets/bank_logos/wells.png"),
    "Bank of America": require("../../../../assets/bank_logos/boa.png"),
    "Citi": require("../../../../assets/bank_logos/citi.jpg"),
    "US Bank": require("../../../../assets/bank_logos/us.png")
}



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
            <SingleDataTemplate onClick={() => { props.toggleAccount(props.data.accountId) }} initialHeight={45} expandHeight={45}>
                <View style={{ marginTop: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                        <Image style={{ height: 35, width: 50, marginRight: 10 }} source={bankMapping[props.data.institution]} />
                        <Text style={{ marginTop: 10 }}>{props.data["accountName"]}</Text>
                    </View>
                    <Text style={{ fontSize: fontSize }}>${expense_rounded}  </Text>

                </View >
                <Text></Text>
                <Text>
                    Account ID: {accountId}
                </Text>
                <Text>
                    {/* Account Type: {props.data["accountType"]} */}
                </Text>
                <Text>
                    {/* Bank: {props.data["institution"]} */}
                </Text>
            </SingleDataTemplate >
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
        toggleAccount: (accountId) => dispatch({ type: "TOGGLE_ACCOUNT", accountId: accountId })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleAccount)

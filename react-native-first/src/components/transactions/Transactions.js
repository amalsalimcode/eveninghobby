/*
 * All transactions to be displayed are setup and retrieved here
 */

'use strict'

import BarGraph from './graph/BarGraph'
import { connect } from 'react-redux'
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native'
import BarSummary from './summary/BarSummary'
import constants from '../common/constants';
import BarDetails, { toggleAccountTransaction } from './details/BarDetails';
import GradientBackground from '../common/GradientBackground';
import { theme } from '../common/styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Transactions = props => {


    useEffect(() => {

        // get curr date
        var dt = new Date(props.fullDate)
        var month = dt.getMonth() + 1
        var date_str = dt.getFullYear() + "-" + month + "-" + dt.getDate()

        var request_body = JSON.stringify({
            "email": "amal.salim@gmail.com",
            "start_date": date_str,
            "days": constants.diffDays,
        })

        fetch('http://127.0.0.1:8000/transaction/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: request_body
        }).then((response) => response.json())
            .then((json) => props.setTransactionData(json));

        fetch('http://127.0.0.1:8000/transaction/retrieveAccount', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: request_body
        }).then((response) => response.json())
            .then((json) => props.setAccountInfo(json));

    }, [props.fullDate]);

    return (
        // show loading sign until from backend is received
        < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
            <BarGraph />
            <BarSummary />
            <BarDetails {...props} />
            <View style={{ height: 10 }} />

            <View style={{ height: 60, paddingLeft: 10, backgroundColor: theme.subtlePrimary, borderTopWidth: 0.5 }} >
                <View style={{ height: 10 }} />

                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                    <TouchableOpacity onPress={() => { props.changeCurWeek(-1) }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <AntDesign name="swapleft" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Previous Week</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { toggleAccountTransaction(() => { }, "left") }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <Feather name="dollar-sign" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Transactions</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { toggleAccountTransaction(() => { }, "left") }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <AntDesign name="search1" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Search</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { toggleAccountTransaction(() => { }, "right") }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <MaterialCommunityIcons name="bank-outline" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Bank Accounts</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.changeCurWeek(1) }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <AntDesign name="swapright" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Next Week</Text>
                        </View>
                    </TouchableOpacity>

                </View>



            </View>

            <View style={{ height: 100, backgroundColor: theme.subtlePrimary }} />
        </GradientBackground >
    )
}

function mapStateToProps(state) {
    return {
        fullDate: state.TransactionsReducer.meta_data.fullDate,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTransactionData: (transactions) => dispatch({
            type: 'SET_TRANSACTION_DATA',
            transactions: transactions,
        }),
        setAccountInfo: (data) => dispatch({ type: "SET_ACCOUNT_INFO", data: data }),
        changeCurWeek: (direction) => dispatch({ type: "ADD_SUB_CUR_WEEK", direction: direction })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
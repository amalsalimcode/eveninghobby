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
import BarDetails from './details/BarDetails';

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
        <>
            <BarGraph />
            <BarSummary />
            <BarDetails {...props} />
            <View style={{ height: 400 }} />
        </>
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
        setAccountInfo: (data) => dispatch({ type: "SET_ACCOUNT_INFO", data: data })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
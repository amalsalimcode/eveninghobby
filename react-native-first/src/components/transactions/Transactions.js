/*
 * All transactions to be displayed are setup and retrieved here
 */

'use strict'

import axios from 'axios'
import BarData from './BarData';
import BarGraph from './BarGraph'
import { connect } from 'react-redux'
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native'
import BarSummary from './BarSummary'

const Transactions = props => {

    useEffect(() => {

        props.clear_transaction_data()

        axios.get(`http://127.0.0.1:8000/hello_test/`)
            .then(res => {
                let transactions = JSON.parse(JSON.stringify(res.data))
                props.set_transaction_data(transactions, "AMEX")
            })
        axios.get(`http://127.0.0.1:8000/wells_test/`)
            .then(res => {
                let transactions = JSON.parse(JSON.stringify(res.data))
                props.set_transaction_data(transactions, "WELLS")
            })
        // refresh the data when user swipes to get
        // data for another time period
    }, [props.date]);

    return (
        // show loading sign until from backend is received
        !props.data_loaded ?
            <ActivityIndicator /> :
            <>
                <BarGraph />
                <BarSummary />
                <BarData />
            </>
    )
}

function mapStateToProps(state) {
    return {
        data_loaded: state.TransactionsReducer.meta_data.data_loaded,
        date: state.TransactionsReducer.meta_data.date
    }
}

function mapDispatchToProps(dispatch) {
    return {
        set_transaction_data: (transactions, institution) => dispatch({
            type: 'SET_TRANSACTION_DATA',
            transactions: transactions,
            institution: institution
        }),
        clear_transaction_data: () => dispatch({type: 'CLEAR_TRANSACTION_DATA'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
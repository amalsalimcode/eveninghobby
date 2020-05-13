/*
 * All transactions to be displayed are setup and retrieved here
 */

import axios from 'axios'
import BarData from './BarData';
import BarGraph from './BarGraph'
import { connect } from 'react-redux'
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native'

const Transactions = props => {

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/hello_test/`)
            .then(res => {
                let transactions = JSON.parse(JSON.stringify(res.data))
                props.set_transaction_data(transactions)
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
        set_transaction_data: (transactions) => dispatch({
            type: 'SET_TRANSACTION_DATA',
            transactions: transactions
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
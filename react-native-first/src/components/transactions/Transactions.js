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
import constants from '../constants';
import {usePrevious} from './utils'

const Transactions = props => {


    const fullDate = props.fullDate
    const prevValues = usePrevious({ fullDate })

    useEffect(() => {

        if (prevValues) {
            /* when props.set_transaction_data() is called, component re-renders, so disable it*/
            if (JSON.stringify(prevValues.fullDate) == (JSON.stringify(props.fullDate))) {
                return
            }
        }

        // get curr date
        var dt= new Date(props.fullDate)
        var month = dt.getMonth() + 1
        var date_str = dt.getFullYear() + "-" + month + "-" + dt.getDate()

        var request_url = "http://127.0.0.1:8000/transaction/?email=amal.salim@gmail.com&start_date=" + date_str + "&days=" + constants.diffDays

        axios.get(request_url)
            .then(res => {
                let transactions = JSON.parse(JSON.stringify(res.data))
                props.set_transaction_data(transactions)
            })
        
    }, [props.fullDate]);

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
        fullDate: state.TransactionsReducer.meta_data.fullDate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        set_transaction_data: (transactions) => dispatch({
            type: 'SET_TRANSACTION_DATA',
            transactions: transactions,
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
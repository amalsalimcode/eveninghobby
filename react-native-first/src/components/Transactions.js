/*
 * All transactions to be displayed are setup and retrieved here
 */

import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native'
import BarGraph from './BarGraph'
import { ScrollView } from 'react-native-gesture-handler';
import BarData from './BarData';
import { connect } from 'react-redux'
import axios from 'axios'



const Transactions = props => {

    useEffect(() => {
        let response_data = []
        var done_loading = false
        axios.get(`http://127.0.0.1:8000/hello_test/`)
            .then(res => {
                response_data = JSON.parse(JSON.stringify(res.data))
                done_loading = true
                props.set_transaction_data(response_data)
            })
    }, []);

    return (
        !props.data_loaded ?
            <ActivityIndicator /> :
            <ScrollView>
                <BarGraph />
                <BarData />
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    sample: {
        backgroundColor: "rgba(60, 80, 101, 0.5)",
    },
});

function mapStateToProps(state) {
    return {
        data_loaded: state.TransactionsReducer.meta_data.data_loaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        set_transaction_data: (response_data) => dispatch({ type: 'SET_TRANSACTION_DATA', response_data: response_data }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
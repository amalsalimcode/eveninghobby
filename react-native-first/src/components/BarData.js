import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Animated } from 'react-native'
import { connect } from 'react-redux'
import SingleBarData from './SingleBarData';

const BarData = props => {

    function any_bar_enabled() {
        let idx = 0
        for (idx = 0; idx < props.bar_data.length; idx++) {
            if (props.bar_data[idx].display_data) {
                return true
            }
        }
        return false
    }

    function data_layout() {
        var bar_idx = 0;
        var trans_idx = 0;
        var bar_data = []
        var enabled = any_bar_enabled()

        for (bar_idx = 0; bar_idx < props.bar_data.length; bar_idx++) {
            // if all bars are disabled, then show all data 
            // otherwise, show data for only those bars that are clicked
            if (enabled && !props.bar_data[bar_idx].display_data) {
                continue
            }
            var uuid = bar_idx.toString()
            // passing in key, to get rid of error
            for (trans_idx = 0; trans_idx < props.bar_data[bar_idx].transaction_data.length; trans_idx++) {
                // make a unique key. In this case if 'bar_idx' concat 'trans_idx'
                uniq_key = bar_idx.toString().concat(trans_idx.toString())
                bar_data.push(<SingleBarData key={uniq_key} uuid={uuid} trans_idx={trans_idx} />)
            }
        }
        return (
            <>
                {bar_data}
            </>
        )
    }

    return (
        <>
            {data_layout()}
        </>
    )

}

const styles = StyleSheet.create({
    plot_container: {
        height: 150
    },
})

function mapStateToProps(state) {
    return {
        bar_data: state.TransactionsReducer.bar_data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeBarHeight: (uuid) => dispatch({ type: "CHANGE_BAR_HEIGHT", uuid: uuid })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarData)
import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Animated } from 'react-native'
import { connect } from 'react-redux'
import SingleBarData from './SingleBarData';

const BarData = props => {

    function any_bar_enabled(data) {
        let idx = 0
        for (idx = 0; idx < props.data.length; idx++) {
            if (props.data[idx].display_data) {
                return true
            }
        }
        return false
    }

    function data_layout(data) {
        var idx = 0;
        var bar_data = []
        var enabled = any_bar_enabled(data)

        for (idx = 0; idx < props.data.length; idx++) {
            // if all bars are disabled, then show all data 
            // otherwise, show data for only those bars that are clicked
            if (enabled && !props.data[idx].display_data) {
                continue
            }
            var uuid = idx.toString()
            // passing in key, to get rid of error
            bar_data.push(<SingleBarData uuid={uuid} key={uuid} />)
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
        data: state.TransactionsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeBarHeight: (uuid) => dispatch({ type: "CHANGE_BAR_HEIGHT", uuid: uuid })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarData)
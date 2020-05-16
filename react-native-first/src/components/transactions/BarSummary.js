'use strict'

import React, { useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Settings from './Settings'

const months = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October",
    "November", "December"]


const BarSummary = props => {

    var cur_month = months[props.meta.month]

    var idx = 0
    var enabled_bars = []
    for (idx = 0; idx < 7; idx++) {
        if (props.bar_data[idx].bar_enabled) {
            enabled_bars.push(idx)
        }
    }
    if (enabled_bars.length < 1) {
        enabled_bars = [0, 1, 2, 3, 4, 5, 6]
    }

    var total_spend = 0;
    for (idx = 0; idx < 7; idx++) {
        if (props.isAmexVisible && enabled_bars.includes(idx)) {
            total_spend += props.meta.total_spend["AMEX"][idx]
        }
        if (props.isWellsVisible && enabled_bars.includes(idx)) {
            total_spend += props.meta.total_spend["WELLS"][idx]
        }
    }

    total_spend = Number(parseFloat(total_spend)).toFixed(2)


    return (
        <>
            <TouchableOpacity onPress={props.showSettings} style={styles.square}>
                <Animated.View style={{ height: 30, paddingTop: 6 }}>
                    <View style={{ marginLeft: 10 }} shadowOffset={{ height: 10 }}
                        shadowColor='black'
                        shadowOpacity={0.4}
                        shadowOffset={{ height: 2, width: 2 }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, alignItems: "flex-start", marginLeft: 35 }}>
                                <Text>Week Start: </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>    {props.meta.date} {cur_month} {props.meta.year}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, alignItems: "flex-start", marginLeft: 35 }}>
                                <Text>Expense This Week: </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>    ${total_spend} </Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                <Settings />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "black",
        backgroundColor: "white",
        borderWidth: 0.7,
        borderRadius: 10,
        shadowColor: "black",
        width: "95%",
        shadowOpacity: 0.1,
        shadowRadius: 40,
        marginBottom: 10,
        marginTop: 20,
        height: 48
    },
});


function mapStateToProps(state) {
    return {
        meta: state.TransactionsReducer.meta_data,
        bar_data: state.TransactionsReducer.bar_data,
        isWellsVisible: state.SettingsReducer.showWells,
        isAmexVisible: state.SettingsReducer.showAmex
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeCurWeek: (direction) => dispatch({ type: "CHANGE_CUR_WEEK", direction: direction }),
        showSettings: () => dispatch({ type: "TOGGLE_SETTINGS_VISIBILITY" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarSummary)
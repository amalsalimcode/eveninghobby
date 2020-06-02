'use strict'

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import constants from '../../common/constants';
import { usePrevious } from '../utils';


const BarSummary = props => {

    const enabledBars = props.enabledBars
    const prevValues = usePrevious({ enabledBars })

    useEffect(() => {

        if (prevValues) {
            if (JSON.stringify(prevValues.enabledBars) != (JSON.stringify(props.enabledBars))) {
                props.setAllTotalExpensesCache(props.serverData, props.enabledBars)
                return
            }
        }

        // get curr date
        var dt = new Date(props.fullDate)
        var month = dt.getMonth() + 1
        var date_str = dt.getFullYear() + "-" + month + "-" + dt.getDate()

        var request_body = {
            "email": "amal.salim@gmail.com",
            "start_date": date_str,
            "days": constants.diffDays,
        }

        fetch('http://127.0.0.1:8000/transaction/totalSpent', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request_body)
        }).then((response) => response.json())
            .then((json) => props.setAllTotalExpenses(json, props.enabledBars));

    }, [props.fullDate, props.enabledBars]);

    var dt = new Date(props.fullDate)
    var dt_str = dt.getMonth() + 1 + "-" + dt.getDate() + "-" + dt.getFullYear()

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
                                <Text>    {dt_str}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, alignItems: "flex-start", marginLeft: 35 }}>
                                <Text>Expense This Week: </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>    ${props.totalSpent} </Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* <Settings /> */}
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
        visibleInstitutions: state.SettingsReducer.institutionVisibility,
        fullDate: state.TransactionsReducer.meta_data.fullDate,
        totalSpent: state.BarSummaryReducer.totalSpent,
        enabledBars: state.BarGraphReducer.enabledBars,
        serverData: state.BarSummaryReducer.serverData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showSettings: () => dispatch({ type: "TOGGLE_SETTINGS_VISIBILITY" }),
        setTotalSpent: (enabledBars) => dispatch({
            type: "SET_TOTAL_SPENT",
            enabledBars: enabledBars
        }),
        setAllTotalExpenses: (data, enabledBars) => dispatch({
            type: "SET_ALL_TOTAL_EXPENSES", data: data,
            enabledBars: enabledBars
        }),
        setAllTotalExpensesCache: (data, enabledBars) => dispatch({
            type: "SET_ALL_TOTAL_EXPENSES_CACHE", data: data,
            enabledBars: enabledBars
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarSummary)
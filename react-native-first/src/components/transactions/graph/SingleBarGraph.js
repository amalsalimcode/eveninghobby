import React, { useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { isAccountEnabled, isAnyAccountPressed } from '../utils';

const SingleBarGraph = props => {

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [pressOpacity, setPressOpacity] = useState(1)

    /*
     * only update component if the height
     * of the bar has changed
     */
    useEffect(() => {
        /* smallest possible height for a transaction
         * is 20. Otherwise, its not visible.
         * maximum allowed height is 100. Otherwise,
         * it goes off screen. */
        height = props.expensePerDay[props.uuid] ? props.expensePerDay[props.uuid] : 0

        // var height = props.expensePerDay[props.uuid]
        var highest = props.highestSpent

        if (highest != 0 && height != 0) {
            height = (height * (80) / (highest)) + 20
        }

        Animated.timing(fadeAnim, {
            toValue: height,
            duration: 1000
        }).start()
    }, []);

    function bar_pressed() {
        pressOpacity > 0.5 ? setPressOpacity(0.5) : setPressOpacity(1)
        props.barButtonPressed(props.uuid)
    }

    return (
        <TouchableWithoutFeedback onPress={() => { bar_pressed() }}>
            <Animated.View style={{ ...styles.bar, height: fadeAnim, opacity: pressOpacity }} />
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    bar: {
        marginHorizontal: 20,
        backgroundColor: "brown",
        width: 10,
        height: 90,
        marginBottom: 1,
        elevation: 2, // Android
        borderRadius: 8,
        shadowColor: "brown",
        shadowOffset: {
            width: 10,
            height: -10
        },
        shadowOpacity: 0.5,
        // increase this to see the effect
        shadowRadius: 1
    },
});

function mapStateToProps(state) {
    return {
        expensePerDay: state.BarSummaryReducer.expensePerDay,
        highestSpent: state.BarSummaryReducer.highestSpent,
        enabledBars: state.BarGraphReducer.enabledBars,
        curDate: state.TransactionsReducer.meta_data.fullDate,
        enabledAccounts: state.EnabledAccountsReducer.enabledAccounts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        barButtonPressed: (uuid) => dispatch({ type: 'TOGGLE_BAR', uuid: uuid }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBarGraph)
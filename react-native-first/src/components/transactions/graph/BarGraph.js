import React, { useEffect, useRef } from 'react'
import SingleBarGraph from './SingleBarGraph'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, PanResponder, Animated, ActivityIndicator } from 'react-native'
import DashedLine from './DashedLine'
import { theme } from '../../common/styles'


const BarGraph = props => {

    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dx > 1) {
                props.changeCurWeek(-1)
            } else if (gestureState.dx < 1) {
                props.changeCurWeek(1)
            }
        }
    })).current;

    useEffect(() => {
        props.clearEnabledBars();
        props.clearDataLoaded();
        // this is making accounts become rendered extra for some reason
        // props.clearAccountInfo();
    }, [props.curDate]);

    function bar_layout() {

        var idx = 0;
        var bars = []
        for (idx = 0; idx < props.bar_data.length; idx++) {
            var uuid = idx.toString()
            // passing in key, to get rid of error
            bars.push(<SingleBarGraph uuid={uuid} key={uuid} />)
        }
        return (
            <>
                {bars}
            </>
        )
    }

    function x_axis_layout() {
        var days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
        var days_layout = []
        var idx = 0;
        for (idx = 0; idx < days.length; idx++) {
            days_layout.push(<Text style={styles.day} key={idx.toString()}>{days[idx]}</Text>);
        }
        return (
            <>
                {days_layout}
            </>
        )
    }

    if (!props.dataLoaded) {
        return (
            <>
                <View style={{...styles.plot_container, justifyContent: "center", alignContent: "center"}}>
                    <ActivityIndicator />
                </View>
                <View style={styles.x_axis}>
                    {x_axis_layout()}
                </View>
            </>
        )
    } else {
        return (
            <>
                <View style={styles.plot_container}>
                    <DashedLine />
                    <Animated.View {...panResponder.panHandlers}>
                        <View style={styles.values_container}>
                            {bar_layout()}
                        </View>
                    </Animated.View>
                </View>

                <View style={styles.x_axis}>
                    {x_axis_layout()}
                </View>
            </>
        )
    }

}

const styles = StyleSheet.create({
    plot_container: {
        height: 150
    },
    values_container: {
        /* each bar should be next to each other*/
        flexDirection: "row",
        /* the bar should be at the bottom where the container ends */
        alignItems: "flex-end",
        justifyContent: "center",
        /* match the height of the container*/
        height: "100%",
    },
    x_axis: {
        backgroundColor: theme.vibrantSecondary,
        height: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
    day: {
        marginHorizontal: 12
    },
});


function mapStateToProps(state) {
    return {
        bar_data: state.TransactionsReducer.bar_data,
        meta: state.TransactionsReducer.meta_data,
        curDate: state.TransactionsReducer.meta_data.fullDate,
        dataLoaded: state.BarSummaryReducer.dataLoaded

    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearEnabledBars: () => dispatch({ type: "CLEAR_ENABLED_BARS" }),
        changeCurWeek: (direction) => dispatch({ type: "CHANGE_CUR_WEEK", direction: direction }),
        clearDataLoaded: () => dispatch({ type: "CLEAR_TOTAL_EXPENSES_LOADED" }),
        clearAccountInfo: () => dispatch({ type: "CLEAR_ACCOUNT_INFO" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarGraph)
import React, { useEffect } from 'react'
import SingleBarGraph from './SingleBarGraph'
import { connect } from 'react-redux'
import { View, StyleSheet, Text } from 'react-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import DashedLine from './DashedLine'


const BarGraph = props => {

    useEffect(() => {
        props.clearBarsPressed();
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

    function on_swipe(gestureName) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_UP:
            case SWIPE_DOWN:
                return
            case SWIPE_LEFT:
                props.changeCurWeek(1)
                return
            case SWIPE_RIGHT:
                props.changeCurWeek(-1)
                return
        }
    }

    return (
        <>
            <View style={styles.plot_container}>
                <DashedLine />
                <GestureRecognizer
                    onSwipe={(direction, state) => on_swipe(direction, state)}
                    config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}>
                    <View style={styles.values_container}>
                        {bar_layout()}
                    </View>
                </GestureRecognizer>
            </View>

            <View style={styles.x_axis}>
                {x_axis_layout()}
            </View>
        </>
    )

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
        backgroundColor: "grey",
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
        curDate: state.TransactionsReducer.meta_data.fullDate

    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearBarsPressed: () => dispatch({type: "CLEAR_BARS_PRESSED"}),
        changeCurWeek: (direction) => dispatch({ type: "CHANGE_CUR_WEEK", direction: direction })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarGraph)
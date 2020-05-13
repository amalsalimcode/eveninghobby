import React, { useRef, useEffect, useState } from 'react'
import SingleBar from './SingleBar'
import Dash from 'react-native-dash'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, Button } from 'react-native'
import AnimateNumber from 'react-native-animate-number'


import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';


// introduce animation to setHeight
// convert dashed line into setHeight
// set dashed line ending to a number that can be changed
// introduce animation to dashed line
const BarGraph = props => {

    useEffect(() => { }, [props.meta.highest_spend]);

    function bar_layout() {
        var idx = 0;
        var bars = []
        for (idx = 0; idx < props.bar_data.length; idx++) {
            var uuid = idx.toString()
            // passing in key, to get rid of error
            bars.push(<SingleBar uuid={uuid} key={uuid} />)
        }
        return (
            <>
                {bars}
            </>
        )
    }

    function change_bar_height() {
        var idx = 0;
        for (idx = 0; idx < 7; idx++) {
            props.changeBarHeight(idx)
        }
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

    function get_dash_flex(num_digit_highest) {
        switch (num_digit_highest) {
            case 4:
                return 8
            case 3:
                return 13
            case 2:
                return 20
            case 1:
                return 23
            default:
                return 6
        }
    }

    var num_digit_highest = props.meta.highest_spend.toString().length
    var upper_dash_flex = get_dash_flex(num_digit_highest)

    var num_digit_middle = parseInt(props.meta.highest_spend / 2).toString().length
    var lower_dash_flex = get_dash_flex(num_digit_middle)

    return (
        <>
            <View style={styles.plot_container}>

                <View style={{ flexDirection: "row", position: "absolute" }}>
                    <Dash dashColor="black" dashGap={4} dashThickness={1} style={{ ...styles.upperDash, flex: upper_dash_flex }} />
                    <AnimateNumber style={styles.upperDashNum} value={props.meta.highest_spend} countBy={10} timing={(interval, progress) => {return interval * (1 - Math.sin(Math.PI * progress)) * 10}} />
                </View>

                <View style={{ flexDirection: "row", position: "absolute" }}>
                    <Dash dashColor="black" dashGap={4} dashThickness={1} style={{ ...styles.lowerDash, flex: lower_dash_flex }} />
                    <AnimateNumber style={styles.lowerDashNum} value={parseInt(props.meta.highest_spend / 2)} countBy={10} timing={(interval, progress) => {return interval * (1 - Math.sin(Math.PI * progress)) * 10}} />
                </View>

                <GestureRecognizer
                    onSwipe={(direction, state) => on_swipe(direction, state)}
                    config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
                >
                    <View style={styles.values_container}>
                        {bar_layout()}
                    </View>
                </GestureRecognizer>

            </View>
            <View style={styles.x_axis}>
                {x_axis_layout()}
            </View>

            <View>
                <Text>
                    {props.meta.month}-{props.meta.date}
                </Text>

            </View>
            {/* <Button title="Press me" onPress={change_bar_height} /> */}
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
    upperDash: {
        marginTop: 50,
        opacity: 0.2
    },
    upperDashNum: {
        marginTop: 40,
        opacity: 0.2,
        flex: 1
    },
    lowerDash: {
        marginTop: 100,
        opacity: 0.1
    },
    lowerDashNum: {
        marginTop: 90,
        opacity: 0.15,
        flex: 1
    }
});


function mapStateToProps(state) {
    return {
        bar_data: state.TransactionsReducer.bar_data,
        meta: state.TransactionsReducer.meta_data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeBarHeight: (uuid) => dispatch({ type: "CHANGE_BAR_HEIGHT", uuid: uuid }),
        changeCurWeek: (direction) => dispatch({ type: "CHANGE_CUR_WEEK", direction: direction })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarGraph)
import React, { useEffect } from 'react'
import Dash from 'react-native-dash'
import { connect } from 'react-redux'
import { View, StyleSheet, Text } from 'react-native'
import AnimateNumber from 'react-native-animate-number'


const DashedLine = props => {

    useEffect(() => { }, [props.highestSpent]);

    function get_dash_flex(num_digit_highest) {
        switch (num_digit_highest) {
            case 4:
                return 9
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

    var num_digit_highest = parseInt(props.highestSpent)
    var upper_dash_flex = get_dash_flex(num_digit_highest.toString().length)

    var num_digit_middle = parseInt(num_digit_highest / 2)
    var lower_dash_flex = get_dash_flex(num_digit_middle.toString().length)

    return (
        <>
            <View style={{ flexDirection: "row", position: "absolute" }}>
                <Dash dashColor="black" dashGap={4} dashThickness={1} style={{ ...styles.upperDash, flex: upper_dash_flex }} />
                <Text style={styles.upperDashNum}>{num_digit_highest}</Text>
                {/* <AnimateNumber style={styles.upperDashNum} value={num_digit_highest} countBy={10} timing={(interval, progress) => { return interval * (1 - Math.sin(Math.PI * progress)) * 10 }} /> */}
            </View>
            <View style={{ flexDirection: "row", position: "absolute" }}>
                <Dash dashColor="black" dashGap={4} dashThickness={1} style={{ ...styles.lowerDash, flex: lower_dash_flex }} />
                <Text style={styles.lowerDashNum}>{parseInt(num_digit_highest/2)}</Text>
                {/* <AnimateNumber style={styles.lowerDashNum} value={num_digit_middle} countBy={10} timing={(interval, progress) => { return interval * (1 - Math.sin(Math.PI * progress)) * 10 }} /> */}
            </View>
        </>
    )

}

const styles = StyleSheet.create({
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
        highestSpent: state.BarSummaryReducer.highestSpent,
    }
}

export default connect(mapStateToProps)(DashedLine)
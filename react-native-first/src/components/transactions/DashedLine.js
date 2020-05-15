import React, { useEffect } from 'react'
import Dash from 'react-native-dash'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import AnimateNumber from 'react-native-animate-number'


const DashedLine = props => {

    useEffect(() => { }, [props.meta.highest_spend]);

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

    var num_digit_highest = props.meta.highest_spend.toString().length
    var upper_dash_flex = get_dash_flex(num_digit_highest)

    var num_digit_middle = parseInt(props.meta.highest_spend / 2).toString().length
    var lower_dash_flex = get_dash_flex(num_digit_middle)

    return (
        <>
            <View style={{ flexDirection: "row", position: "absolute" }}>
                <Dash dashColor="black" dashGap={4} dashThickness={1} style={{ ...styles.upperDash, flex: upper_dash_flex }} />
                <AnimateNumber style={styles.upperDashNum} value={props.meta.highest_spend} countBy={10} timing={(interval, progress) => { return interval * (1 - Math.sin(Math.PI * progress)) * 10 }} />
            </View>
            <View style={{ flexDirection: "row", position: "absolute" }}>
                <Dash dashColor="black" dashGap={4} dashThickness={1} style={{ ...styles.lowerDash, flex: lower_dash_flex }} />
                <AnimateNumber style={styles.lowerDashNum} value={parseInt(props.meta.highest_spend / 2)} countBy={10} timing={(interval, progress) => { return interval * (1 - Math.sin(Math.PI * progress)) * 10 }} />
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
        meta: state.TransactionsReducer.meta_data
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashedLine)
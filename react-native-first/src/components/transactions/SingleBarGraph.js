import React, { useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {connect} from 'react-redux' 

const SingleBarGraph = props => {

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [pressOpacity, setPressOpacity] = useState(1)

    /*
     * only update component if the height
     * of the bar has changed
     */
    useEffect(() => {
        // when re-rendering we want to clear
        // the button press
        setPressOpacity(1)

        Animated.timing(fadeAnim, {
            toValue: props.bar_data[props.uuid].bar_height,
            duration: 1000
        }).start()
    },[props.bar_data[props.uuid].bar_height]);

    function bar_pressed() {
        if (pressOpacity > 0.5) {
            setPressOpacity(0.5)
        } else {
            setPressOpacity(1)
        }
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
        bar_data: state.TransactionsReducer.bar_data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        barButtonPressed: (uuid) => dispatch({ type: 'BAR_BUTTON_PRESSED', uuid: uuid }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBarGraph)
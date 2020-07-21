import React, { useEffect } from "react";
import { Animated, View, StyleSheet, Text, Dimensions } from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { connect } from 'react-redux';

import BarData from "./BarData";
import Accounts from "./Accounts";
import constants from "../../common/constants";

const windowHeight = Dimensions.get('window').height;

var goHidden = true;
const bounceValue = new Animated.Value(0)

export function toggleAccountTransaction(notifySubscriber, direction) {

    let toVal = null
    if (direction == "left") {
        toVal = 0
    } else if (direction == "right") {
        toVal = constants.windowWidth * -1
    }

    notifySubscriber()

    goHidden = !goHidden
    Animated.timing(bounceValue, {
        toValue: toVal,
        duration: 1000
    }).start(notifySubscriber)
}

const BarDetails = props => {

    useEffect(() => {
    }, []);

    const on_swipe = (gestureName) => {
        const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_LEFT:
                toggleAccountTransaction(props.toggleBarDataSwipe, "right")
                return
            case SWIPE_RIGHT:
                toggleAccountTransaction(props.toggleBarDataSwipe, "left")
                return
        }
    }

    console.log("im in bar details")

    return (
        <>
            <View style={{ height: windowHeight - 340 }}>
                <GestureRecognizer onSwipe={(direction, state) => on_swipe(direction, state)} config={{ velocityThreshold: 0.1, directionalOffsetThreshold: 800 }}>
                    <Animated.View style={[styles.subView, { transform: [{ translateX: bounceValue }] }]}>
                        <View style={{ width: constants.windowWidth }}>
                            <BarData />
                        </View>
                        <View style={{ width: constants.windowWidth }}>
                            <Accounts {...props} />
                        </View>
                    </Animated.View>
                </GestureRecognizer >
            </View>
            <View style={{ height: 10 }} />
        </>
    )
}

const styles = StyleSheet.create({
    subView: {
        flexDirection: "row",
    }
});

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleBarDataSwipe: () => dispatch({ type: 'TOGGLE_BAR_DATA_SWIPE' }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarDetails)

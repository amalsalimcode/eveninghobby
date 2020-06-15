import React, { useEffect } from "react";
import { Animated, View, StyleSheet, Text, Dimensions } from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { connect } from 'react-redux';

import BarData from "./BarData";
import Accounts from "./Accounts";
import constants from "../../common/constants";

const windowHeight = Dimensions.get('window').height;

var goHidden = true;

const BarDetails = props => {

    useEffect(() => {
    }, []);


    const bounceValue = new Animated.Value(0)

    const toggleSubview = () => {
        props.toggleBarDataSwipe()

        goHidden = !goHidden
        Animated.timing(bounceValue, {
            toValue: goHidden ? 0 : constants.windowWidth * -1,
            duration: 1000
        }).start(props.toggleBarDataSwipe)
    }

    const on_swipe = (gestureName) => {
        const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_LEFT:
                toggleSubview()
                return
            case SWIPE_RIGHT:
                toggleSubview()
                return
        }
    }

    return (
        <View style={{ height: windowHeight - 300 }}>
            <GestureRecognizer onSwipe={(direction, state) => on_swipe(direction, state)} config={{ velocityThreshold: 0.1, directionalOffsetThreshold: 800 }}>
                <Animated.View style={[styles.subView, { transform: [{ translateX: bounceValue }] }]}>
                    <View style={{ width: constants.windowWidth }}>
                        <Accounts {...props} />
                    </View>
                    <View style={{ width: constants.windowWidth }}>
                        <BarData />
                    </View>
                </Animated.View>
            </GestureRecognizer >
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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

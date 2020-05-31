import React, { useEffect } from "react";
import { Animated, View, StyleSheet, Text, Dimensions } from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { connect } from 'react-redux';

import anim from '../../../assets/anim.json'
import BarData from "./BarData";
import AnimateNumber from "react-native-animate-number";
import Accounts from "./Accounts";

const windowPosition = Dimensions.get('window').width;

var goHidden = true;

const BarDetails = props => {

    useEffect(() => {
    }, []);


    const bounceValue = new Animated.Value(0)

    const toggleSubview = () => {
        props.toggleBarDataSwipe()

        goHidden = !goHidden
        Animated.timing(bounceValue, {
            toValue: goHidden ? 0 : windowPosition * -1,
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
        <GestureRecognizer onSwipe={(direction, state) => on_swipe(direction, state)} config={{ velocityThreshold: 0.1 }}>
            <Animated.View style={[styles.subView, { transform: [{ translateX: bounceValue }] }]}>
                <View style={{ width: windowPosition }}>
                    <Accounts />
                </View>
                <View style={{ width: windowPosition }}>
                    <BarData />
                </View>
            </Animated.View>
        </GestureRecognizer >
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
        barData: state.TransactionsReducer.bar_data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleBarDataSwipe: () => dispatch({type: 'TOGGLE_BAR_DATA_SWIPE'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarDetails)

'use strict';

import React, { useRef, Component, useState } from 'react';
import ReactNative, { Dimensions } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { StyleSheet, Text, View, Animated } from 'react-native'
import BarData from '../transactions/details/BarData';
import Transactions from '../transactions/Transactions';
import { connect } from 'react-redux';
import constants from '../common/constants';


var goHidden = true;

const SlideView = props => {

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
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
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
        <GestureRecognizer onSwipe={(direction, state) => on_swipe(direction, state)} config={{ velocityThreshold: 0.1, directionalOffsetThreshold: 800 }}>
            <Animated.View style={[styles.subView, { transform: [{ translateX: bounceValue }] }]}>
                <View style={{width: constants.windowWidth}}>
                    <Text>This is a sub view</Text>
                </View>
                <View style={{width: constants.windowWidth}}>
                    <Transactions />
                </View>
            </Animated.View>
        </GestureRecognizer >
    );
}

var styles = StyleSheet.create({
    subView: {
        marginTop: 100,
        flexDirection: "row",
        backgroundColor: "red",
        borderColor: "grey",
        borderWidth: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(SlideView)

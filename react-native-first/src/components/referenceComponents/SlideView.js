'use strict';

import React, { useRef, Component, useState } from 'react';
import ReactNative, { Dimensions } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { StyleSheet, Text, View, Animated } from 'react-native'


var goHidden = true;

// multiply by 2, so that the view is positioned
// to the right of the screen
const windowPosition = Dimensions.get('window').width * 2;

const SlideView = props => {

    const bounceValue = new Animated.Value(windowPosition)

    const toggleSubview = () => {

        goHidden = !goHidden

        Animated.timing(bounceValue, {
            toValue: goHidden ? windowPosition : 0,
            duration: 1000
        }).start()

    }

    const on_swipe = (gestureName) => {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_UP:
            case SWIPE_DOWN:
                return
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
                <View style={styles.container}>
                    <Animated.View style={[styles.subView, { transform: [{ translateX: bounceValue }] }]}>
                        <Text>This is a sub view</Text>
                    </Animated.View>
                </View>

                <View>
                    <Animated.View style={[styles.subView, { transform: [{ translateY: bounceValue }] }]}>
                        <Text>This is a sub view</Text>
                    </Animated.View>
                </View>
            </GestureRecognizer>
        );

}

var styles = StyleSheet.create({
    container: {
        marginTop: 100,
        flexDirection: "row",
        backgroundColor: "red"
    },
    subView: {
        borderColor: "grey",
        borderWidth: 1,
        width: "100%",
    }
});

export default SlideView

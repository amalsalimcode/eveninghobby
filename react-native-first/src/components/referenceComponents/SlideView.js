'use strict';

import React, { Component } from 'react';
import ReactNative, { Dimensions } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Animated
} = ReactNative;


var goHidden = true;

// multiply by 2, so that the view is positioned
// to the right of the screen
const windowPosition = Dimensions.get('window').width * 2;

class SlideView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(windowPosition),  //This is the initial position of the subview
            buttonText: "Show Subview"
        };
    }


    _toggleSubview() {

        goHidden = !goHidden

        this.setState({
            buttonText: goHidden ? "Show Subview" : "Hide Subview"
        });

        Animated.timing(this.state.bounceValue, {
            toValue: goHidden ? windowPosition : 0,
            duration: 1000
        }).start()

    }

    on_swipe(gestureName) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_UP:
            case SWIPE_DOWN:
                return
            case SWIPE_LEFT:
                this._toggleSubview()
                return
            case SWIPE_RIGHT:
                this._toggleSubview()
                return
        }
    }

    render() {
        return (
            <GestureRecognizer onSwipe={(direction, state) => this.on_swipe(direction, state)} config={{ velocityThreshold: 0.1, directionalOffsetThreshold: 800 }}>
                <View style={styles.container}>
                    <Animated.View style={[styles.subView, { transform: [{ translateX: this.state.bounceValue }] }]}>
                        <Text>This is a sub view</Text>
                    </Animated.View>
                </View>

                <View>
                    <Animated.View style={[styles.subView, { transform: [{ translateY: this.state.bounceValue }] }]}>
                        <Text>This is a sub view</Text>
                    </Animated.View>
                </View>
            </GestureRecognizer>
        );
    }
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

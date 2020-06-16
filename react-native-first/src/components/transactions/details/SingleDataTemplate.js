/*
 * All transaction Data is loaded here
 */

import { connect } from 'react-redux'
import React, { useRef, useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import GradientBackground from '../../common/GradientBackground';
import { theme } from '../../common/styles';


const SingleDataTemplate = props => {

    const initialHeight = props.initialHeight ? props.initialHeight : 25

    var expandHeight = props.expandHeight ? props.expandHeight : 110
    const [height, setHeight] = useState(expandHeight)
    const curHeight = useRef(new Animated.Value(initialHeight)).current;

    // upon click, adjust borderWidth
    const [borderStrength, setBorderStength] = useState(1)

    const changeHeight = () => {

        // check to see if the user was swiping for
        // accounts view, instead of expand bar data
        if (props.swipeIntercept) {
            return
        }

        // check there is a custom function the parent wants to execute
        props.onClick ? props.onClick() : {}

        // by default expand the container
        var enableExpand = props.enableExpand ? props.enableExpand : true
        if (enableExpand) {
            height == expandHeight ? setHeight(initialHeight) : setHeight(expandHeight)
            Animated.timing(curHeight, {
                toValue: height,
                duration: 1000
            }).start()
        }

        // by default don't highlight border
        var highlightBorder = props.highlightBorder ? props.highlightBorder : true
        if (highlightBorder && !props.borderLeftColor) {
            var toVal = borderStrength == 4 ? 1 : 4
            setBorderStength(toVal)
        }
    }

    return (
        <TouchableOpacity onPress={() => (changeHeight())} style={{
            ...styles.square, ...props.containerStyle, borderWidth: borderStrength,
            borderLeftColor: props.borderLeftColor ? props.borderLeftColor : "",
            borderLeftWidth: props.borderLeftColor ? 2 : borderStrength
        }}>
            <Animated.View style={{ height: curHeight, paddingTop: 3 }}>
                <View style={styles.viewStyle}>

                    {props.children}

                </View>
            </Animated.View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "grey",
        borderRadius: 1,
        width: "95%",
        shadowOpacity: 0.1,
        shadowColor: "black",
        shadowRadius: 40,
        marginBottom: 8,
        shadowOffset: { height: 2, width: 2 }
    },
    viewStyle: {
        marginHorizontal: 10
    }
});

function mapStateToProps(state) {
    return {
        barData: state.TransactionsReducer.bar_data,
        swipeIntercept: state.SwipeReducer.barDataSwiped,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleDataTemplate)
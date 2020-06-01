/*
 * All transaction Data is loaded here
 */

import { connect } from 'react-redux'
import React, { useRef, useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


const SingleDataTemplate = props => {


    var expandHeight = props.expandHeight ? props.expandHeight: 110
    const [height, setHeight] = useState(expandHeight)
    const curHeight = useRef(new Animated.Value(25)).current;

    const changeHeight = () => {

        // check to see if the user was swiping for
        // accounts view, instead of expand bar data
        if (props.swipeIntercept) {
            return
        }

        props.onClick ? props.onClick() : {}

        if (props.disableExpand) {
            return
        }

        height == expandHeight ? setHeight(25) : setHeight(expandHeight)
        Animated.timing(curHeight, {
            toValue: height,
            duration: 1000
        }).start()

    }

    return (
        <>
            <TouchableOpacity onPress={() => (changeHeight())} style={{
                ...styles.square, ...props.containerStyle,
                borderLeftColor: props.borderLeftColor ? props.borderLeftColor : "black"
            }}>

                <Animated.View style={{ height: curHeight, paddingTop: 3 }}>
                    <View style={styles.viewStyle} shadowOffset={{ height: 10 }}
                        shadowColor='black'
                        shadowOpacity={0.4}
                        shadowOffset={{ height: 2, width: 2 }}>

                        {props.children}

                    </View>
                </Animated.View>

            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "grey",
        borderLeftWidth: 4,
        backgroundColor: "white",
        borderWidth: 0.3,
        borderRadius: 10,
        shadowColor: "black",
        width: "95%",
        shadowOpacity: 0.1,
        shadowRadius: 40,
        marginBottom: 8,
    },
    viewStyle: {
        marginHorizontal: 10
    }
});

function mapStateToProps(state) {
    return {
        barData: state.TransactionsReducer.bar_data,
        swipeIntercept: state.SwipeReducer.barDataSwiped
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleDataTemplate)
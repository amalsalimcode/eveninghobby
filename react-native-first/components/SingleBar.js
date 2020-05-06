import React from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native'


const SingleBar = props => {

    return (
        <Animated.View style={{...styles.bar, ...props.style}}/>
    )

}

const styles = StyleSheet.create({
    bar: {
        marginHorizontal: 20,
        backgroundColor: "brown",
        width: 10,
        height: 90,
        borderRadius: 8,
        marginBottom: 1
    },
});

export default SingleBar
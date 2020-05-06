import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native'


const SingleBar = props => {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: props.final_height,
            duration: 1000
        }).start()
    }, []);


    return (
        <Animated.View style={{ ...styles.bar, height: fadeAnim }}>
        </Animated.View>
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
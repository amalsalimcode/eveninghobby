import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const SingleBar = props => {

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [pressOpacity, setPressOpacity] = useState(1)

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: props.final_height,
            duration: 1000
        }).start()
    });

    function logme() {
        console.log("log me")
    }

    return (
        <TouchableWithoutFeedback onPress={() => { pressOpacity > 0.5 ? setPressOpacity(0.5): setPressOpacity(1) }}>
            <Animated.View style={{ ...styles.bar, height: fadeAnim, opacity: pressOpacity }} />
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    bar: {
        marginHorizontal: 20,
        backgroundColor: "brown",
        width: 10,
        height: 90,
        borderRadius: 8,
        marginBottom: 1,

        shadowColor: 'red', // IOS
        shadowOffset: { height: 0, width: 0 }, // IOS
        shadowOpacity: 0.5, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },
});

export default SingleBar
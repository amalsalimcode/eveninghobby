import React, { useEffect } from 'react';
import { Animated, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const GradientBackground = (props) => {

    useEffect(() => {
    }, [])

    return (
        <LinearGradient
            start={{ x: 0.2, y: 0.4 }}
            end={{ x: 0.9, y: 1 }}
            style={{ flex: 1 }}
            colors={['#003f5c', '#191919']}>
            {/* colors={['#77a2b5', '#5a7d8c']}> */}

            {props.children}

        </LinearGradient>
    );
}

export default GradientBackground 
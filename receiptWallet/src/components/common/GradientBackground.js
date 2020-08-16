import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from './styles';


const GradientBackground = (props) => {

    useEffect(() => {
    }, [])

    const color = props.colors ? props.colors : [theme.primary, theme.secondary]

    return (
        <LinearGradient
            start={{ x: 0.2, y: 0.4 }}
            end={{ x: 0.9, y: 1 }}
            style={{ flex: 1 }}
            colors={color}>

            {props.children}

        </LinearGradient>
    );
}

export default GradientBackground 
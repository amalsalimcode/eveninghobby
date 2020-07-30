import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from './styles';
import constants from './constants';


const GradientBorder = (props) => {

    React.useEffect(() => {
    }, [])

    return (
        <LinearGradient start={[0, 0.5]}
            end={[1, 0.5]}
            colors={[theme.subtlePrimary, theme.subtlePrimary]}
            style={{ margin: 15, borderRadius: 20}}>

            <View style={styles.circleGradient}>

                {props.children}

            </View>

        </LinearGradient>
    );
}

export default GradientBorder

var styles = StyleSheet.create({
    circleGradient: {
        backgroundColor: "white",
        margin: 2,
        height: 50,
        width: constants.windowWidth
    },
});
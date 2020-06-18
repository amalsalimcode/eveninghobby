import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import { Button } from "react-native";
import { WebView } from 'react-native-webview';
import constants from "../../../common/constants";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import GradientBackground from "../../../common/GradientBackground";
import { LinearGradient } from "expo-linear-gradient";

const AddAccount = props => {

    useEffect(() => {
    }, []);

    return (
        <TouchableWithoutFeedback style={[styles.circle]}>
            <View style={{marginTop: 250, alignItems: "center"}}>
                <Text> hi amal </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({

    circle: {
        marginTop: -250,
        height: 350, // change these values according to your requirement.
        width: 750,
        borderBottomStartRadius: 500,
        borderBottomEndRadius: 500,
        backgroundColor: "grey",
        opacity: 0.6,
    },

});

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAccount)

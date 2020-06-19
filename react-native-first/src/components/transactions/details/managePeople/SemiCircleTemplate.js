import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import constants from "../../../common/constants";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { theme } from "../../../common/styles";

const SemiCircleTemplate = props => {

    useEffect(() => {
    }, []);

    console.log("here is email", props.email, "account", props.accountInfo)

    return (
        <TouchableWithoutFeedback style={[styles.circle]}>
            <View style={{ marginTop: 250, alignItems: "center" }}>
                {props.children}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({

    circle: {
        marginTop: -constants.windowWidth/2 - 50,
        // first width is determined, and then
        // marginLeft to center the circle
        marginLeft: -constants.windowWidth/2,
        width: constants.windowWidth*2,
        height: constants.windowHeight / 2 + 50,
        borderBottomStartRadius: 500,
        borderBottomEndRadius: 500,
        borderColor: theme.subleSecondary,
        borderWidth: 10,
        backgroundColor: "black",
        opacity: 0.5,
        justifyContent: "center"
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

export default connect(mapStateToProps, mapDispatchToProps)(SemiCircleTemplate)

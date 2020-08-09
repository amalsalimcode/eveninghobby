import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from "react-native";
import constants, { hasNotch, getTopToolbarHeight } from "../common/constants";
import { theme } from '../common/styles';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import SingleDataTemplate from "../transactions/details/SingleDataTemplate";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import GradientBackground from "../common/GradientBackground";

const TopToolbar = props => {

    useEffect(() => {
    }, []);

    var iconSize = constants.windowHeight * 0.05

    const getDone = () => {
        if (props.done) {
            //send data to backend
            return (
                <TouchableOpacity style={{ borderWidth: 0, padding: 5, marginRight: 5, marginBottom: 5 }} onPress={() => { props.done(); props.navigation.popToTop() }}>
                    <MaterialIcons name="done" size={iconSize * 1.1} color="black" style={{ marginRight: 0, marginBottom: 0 }} />
                </TouchableOpacity>
            )
        }
    }

    const getDelete = () => {
        if (props.delete) {
            return (
                <TouchableOpacity style={{ borderWidth: 0, padding: 5, marginRight: 5, marginBottom: 5 }} onPress={() => { props.navigation.popToTop() }}>
                    <MaterialCommunityIcons name="trash-can-outline" size={iconSize * 0.9} color="black" style={{ marginRight: 0, marginBottom: 0 }} />
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={{ height: getTopToolbarHeight(), width: constants.windowWidth, backgroundColor: theme.subtlePrimary, flexDirection: "column-reverse" }} >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15}}>
                <TouchableOpacity style={{ borderWidth: 0 }} onPress={() => { props.navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={iconSize} color="black" style={{ marginLeft: 10, marginBottom: 0 }} />
                </TouchableOpacity>
                {getDelete()}
                {getDone()}
            </View>
        </View>
    )

}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar)

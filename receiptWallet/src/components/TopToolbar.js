import { View } from "react-native";
import React, { useEffect } from "react";

import { theme } from './common/styles';
import { TouchableOpacity } from "react-native-gesture-handler";
import constants, { getTopToolbarHeight } from "./common/constants";
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const TopToolbar = props => {

    useEffect(() => {
    }, []);

    var iconSize = constants.windowHeight * 0.05

    const getDone = () => {
        if (props.done) {
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
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15 }}>
                <TouchableOpacity style={{ borderWidth: 0 }} onPress={() => { props.navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={iconSize} color="black" style={{ marginLeft: 10, marginBottom: 0 }} />
                </TouchableOpacity>
                {getDelete()}
                {getDone()}
            </View>
        </View>
    )

}

export default TopToolbar

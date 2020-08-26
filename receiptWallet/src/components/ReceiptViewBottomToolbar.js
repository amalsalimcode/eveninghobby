'use strict'

import { connect } from 'react-redux'
import React, { useEffect } from 'react';
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Entypo } from '@expo/vector-icons';
import constants, { hasNotch } from './common/constants'
import { theme } from './common/styles';


const ReceiptViewBottomToolbar = props => {

    useEffect(() => {
    }, []);

    var toolbarHeight = hasNotch() ? 70 : 55
    let iter = 0

    return (
        <>
            <View style={{ height: toolbarHeight, width: constants.windowWidth, borderWidth: 0.5, backgroundColor: theme.subtlePrimary }} >
                <View style={{ flexDirection: "row" }}>
                    <View style={{ height: toolbarHeight, width: constants.windowWidth / 2, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { if (iter != 0) {iter = 0; props.scroller.scrollTo({ x: -constants.windowWidth }) }} } style={{ width: 60 }}>
                            <View style={{ alignItems: "center", marginTop: 10 }}>
                                <Entypo name="image" size={24} color="black" />
                                <Text style={{ fontSize: 8 }}>Image</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: toolbarHeight, width: constants.windowWidth / 2, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { if (iter != 1) {iter = 1; props.scroller.scrollTo({ x: constants.windowWidth }) }} } style={{ width: 60 }}>
                            <View style={{ alignItems: "center", marginTop: 8 }}>
                                <Entypo name="menu" size={24} color="black" />
                                <Text style={{ fontSize: 8 }}>Details</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptViewBottomToolbar)
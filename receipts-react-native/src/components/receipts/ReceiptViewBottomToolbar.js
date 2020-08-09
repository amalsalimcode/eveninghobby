/*
 * All transactions to be displayed are setup and retrieved here
 */

'use strict'

import { connect } from 'react-redux'
import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { theme } from '../common/styles';
import constants, { uuidv4, getFormattedDate, hasNotch } from '../common/constants'
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { NativeModules } from 'react-native';


const ReceiptViewBottomToolbar = props => {

    useEffect(() => {
    }, []);

    var toolbarHeight = hasNotch() ? 70 : 55
    let iter = 0

    return (
        <>
            <View style={{ height: toolbarHeight, width: constants.windowWidth, position: "absolute", bottom: 0 }} >
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: constants.windowWidth / 2, borderTopWidth: 5, borderColor: "red", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { iter > 0 ? iter -= 1 : {}; props.scroller.scrollTo({ x: constants.windowWidth * iter }) }} style={{ width: 60 }}>
                            <View style={{ alignItems: "center", marginTop: 5 }}>
                                <AntDesign name="search1" size={24} color="black" />
                                <Text style={{ fontSize: 8 }}>Search</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: constants.windowWidth / 2, borderTopWidth: 5, borderColor: "blue", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { pickImage() }} style={{ width: 60 }}>
                            <View style={{ alignItems: "center", marginTop: 5 }}>
                                <MaterialIcons name="photo-album" size={24} color="black" />
                                <Text style={{ fontSize: 8 }}>Upload</Text>
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
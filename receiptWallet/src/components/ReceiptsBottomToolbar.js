/*
 * All transactions to be displayed are setup and retrieved here
 */

'use strict'

import { connect } from 'react-redux'
import React, { useEffect } from 'react';
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather, Entypo } from '@expo/vector-icons';
import { theme } from './common/styles';
import constants, { hasNotch } from './common/constants'
import * as ImagePicker from 'expo-image-picker';


const ReceiptsBottomToolbar = props => {

    useEffect(() => {
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (result.cancelled) {
            return
        }

        props.navigation.navigate("AddReceipt", {uri: result.uri, height: result.height, width: result.width})

    };

    var toolbarHeight = hasNotch() ? 70 : 55

    let iter = 0
    if (props.isSelected) {
        return (
            <>
                <View style={{ height: toolbarHeight, width: constants.windowWidth, paddingLeft: 10, backgroundColor: theme.subtlePrimary, borderTopWidth: 0.5, position: "absolute", bottom: 0 }} >
                    <View style={{ height: 10 }} />
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('DeleteReceipt') }} style={{ width: 60 }}>
                            <View style={{ alignItems: "center" }}>
                                <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
                                <Text style={{ fontSize: 8 }}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    } else {
        return (
            <>
                <View style={{ height: toolbarHeight, width: constants.windowWidth, paddingLeft: 10, backgroundColor: theme.subtlePrimary, borderTopWidth: 0.5, position: "absolute", bottom: 0 }} >
                    <View style={{ height: 10 }} />
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Search')  }} style={{ width: 60 }}>
                            <View style={{ alignItems: "center" }}>
                                <AntDesign name="search1" size={24} color="black" />
                                <Text style={{ fontSize: 8 }}>Search</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { props.navigation.navigate('CaptureReceipt') }} style={{ width: 60 }}>
                            <View style={{ alignItems: "center" }}>
                                <Feather name="camera" size={24} color="black" />
                                <Text style={{ fontSize: 8 }}>Capture</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { pickImage() }} style={{ width: 60 }}>
                            <View style={{ alignItems: "center" }}>
                                <Entypo name="images" size={24} color="black" />
                                <Text style={{ fontSize: 8 }}>Upload</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        isSelected: state.ReceiptSelectorReducer.isSelected
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptsBottomToolbar)
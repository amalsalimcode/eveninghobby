import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, Text, Image, KeyboardAvoidingView, Keyboard, Platform, ScrollView, Button } from "react-native"
import { TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler"

import { Overlay } from 'react-native-elements';
import ImageZoom from 'react-native-image-pan-zoom'

import TopToolbar from "./TopToolbar"
import { addReceiptDb } from "./common/Db"
import ChangeDate from "./common/ChangeDate"
import SelectCategory from "./common/SetCategory"
import { saveImgToDir } from "./common/FileSystem"
import { sendPictureBackend } from "./common/Backend"
import { theme, commonStyles } from './common/styles'
import { TextInputMask } from 'react-native-masked-text'
import GradientBackground from "./common/GradientBackground"
import constants, { getTopToolbarHeight, getFormattedDate, uuidv4 } from "./common/constants"
import SingleEntry from "./SingleEntry";


const SelectorOverlay = props => {

    const [visible, setVisible] = useState(true);
    const [newLabel, setNewLabel] = useState('');

    let height = constants.windowHeight * 0.5
    let newEntryHeight = 60


    function listContents() {
        let x = []
        var idx = 0
        for (idx = 0; idx < 20; idx++) {
            x.push(<SingleEntry />)
        }
        return (x)
    }

    useEffect(() => {
    }, []);

    return (

        <Overlay onBackdropPress={() => { setVisible(false) }} overlayStyle={{...commonStyles.overlayStyle, height: constants.windowHeight * 0.61, paddingTop: 20, position: "absolute"}} isVisible={visible} height={height}>
            <>
                <ScrollView>
                    {listContents()}
                </ScrollView>
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5, marginTop: 30, alignItems: "center", borderWidth: 0.4, borderRadius: 10 }}>
                    <TouchableOpacity containerStyle={{ height: 20, width: 20, backgroundColor: "grey" }} />
                    <View style={{ width: "60%", ...commonStyles.textInput, height: 25 }}>
                        <TextInput placeholder="New Label" style={{}} maxLength={50} onChangeText={setNewLabel} value={newLabel} />
                    </View>
                    <TouchableOpacity style={{ ...commonStyles.button, width: 80, marginTop: 5 }} onPress={() => { }}>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={{ color: "white" }}>Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        </Overlay>

    )
    return (

        {/* <View style={{ height: height }}>
            </View>
            <View style={{ height: newEntryHeight, borderTopWidth: 1 }}>
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <TextInput placeholder="New Label" style={commonStyles.textInput} maxLength={50} onChangeText={newLabel} value={setNewLabel} />
                </View>
            </View> */}
        // </Overlay >
    )
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addSingleReceipt: (receipt) => dispatch({ type: "ADD_SINGLE_RECEIPT", receipt: receipt })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectorOverlay)

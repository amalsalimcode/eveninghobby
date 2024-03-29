import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableHighlight, TextInput } from "react-native-gesture-handler";
import constants from './common/constants'
import { commonStyles } from "./common/styles";
import { AddNewLabelType } from "./common/Db";
import { Button } from "native-base";


const NewLabel = props => {

    const [input, setInput] = useState('');

    useEffect(() => {
    }, []);

    const setNewInput = (arg) => {
        if (arg == '') {
            return
        }
        setInput('')
        props.setNewLabel(arg)
    }

    return (
        <View style={{ ...commonStyles.singleEntryoutline, padding: 0, paddingHorizontal: 10 }} >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 0 }}>
                <TextInput placeholder="New Label" style={{ ...commonStyles.textInput, width: 170, height: 30 }} maxLength={30} onChangeText={setInput} value={input} />
                <Button transparent light onPress={() => { setNewInput(input) }} >
                    <View style={{ ...commonStyles.button, width: 60, paddingTop: 1 }} >
                        <Text style={commonStyles.buttonText}>Add</Text>
                    </View>
                </Button>
            </View >
        </View>
    );
}

export default NewLabel

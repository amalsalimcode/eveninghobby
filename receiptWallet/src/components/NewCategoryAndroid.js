import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableHighlight, TextInput } from "react-native-gesture-handler";
import { commonStyles } from "./common/styles";
import { Button } from "native-base";


const NewCategoryAndroid = props => {

    const [input, setInput] = useState('');

    useEffect(() => {
    }, []);

    const setNewInput = (arg) => {
        if (arg == '') {
            return
        }
        props.onSubmit(arg)
    }

    return (
        <View style={{...commonStyles.singleEntryoutline, padding: 0, paddingHorizontal: 10}} >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 0 }}>
                <TextInput placeholder="New Category" style={{ ...commonStyles.textInput, width: 150, height: 30 }} maxLength={30} onChangeText={setInput} value={input} />
                <Button transparent light onPress={ () => { setNewInput(input) }} >
                    <View style={{ ...commonStyles.button, width: 60, paddingTop: 1 }} >
                        <Text style={commonStyles.buttonText}>Add</Text>
                    </View>
                </Button>
            </View >
        </View>
    );
}

export default NewCategoryAndroid 

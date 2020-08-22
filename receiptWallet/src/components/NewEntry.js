import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableHighlight, TextInput } from "react-native-gesture-handler";
import constants from './common/constants'
import { commonStyles } from "./common/styles";


const NewEntry = props => {

    const [borderWidth, setBorderWidth] = useState(0.7);
    const [input, setInput] = useState('');

    useEffect(() => {
    }, []);

    const setNewInput = (arg) => {
        if (arg == '') {
            return
        }
        var result = props.setNewLabel(arg)
        if (result) {
            setInput('')
        }


    }

    return (
        <View style={{ ...styles.square, borderWidth: borderWidth }} >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 0 }}>
                <TextInput placeholder="New Category" style={{ ...commonStyles.textInput, width: 170 }} maxLength={30} onChangeText={setInput} value={input} />
                <TouchableHighlight style={{ ...styles.openButton  }} onPress={() => { setNewInput(input) }}>
                    <Text style={styles.textStyle}>Add</Text>
                </TouchableHighlight>
            </View >
        </View>
    );
}

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "#3e424b",
        marginBottom: 8,
        padding: 10,
        width: constants.windowWidth * 0.65,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    openButton: {
        backgroundColor: "grey",
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        width: 60
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

export default connect(mapStateToProps, mapDispatchToProps)(NewEntry)

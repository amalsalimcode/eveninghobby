import React, { useState, useEffect } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Keyboard
} from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import constants from "./common/constants";
import SingleEntry from "./SingleLabel";
import NewEntry from "./NewLabel";
import { commonStyles } from './common/styles';
import { ReadLabelTypes } from './common/Db';
import { ImageZoomProps } from "react-native-image-pan-zoom";

const SetLabel = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const [selectedLabel, setSelectedLabel] = useState({})
    const [value, setValue] = useState('Label')
    const [dbResult, setDbResult] = useState([])


    function generateLabelViews() {
        let x = []
        console.log("here is the dbresponse", dbResult)
        for (index = 0; index < dbResult.length; index++) {
            let entryPressed = props.selectedTrueLabel.includes(dbResult[index]) ? true : false
            console.log("this is the checkbox value", dbResult[index], entryPressed)
            x.push(<SingleEntry key={index} title={dbResult[index]} toggleCheckbox={toggleCheckbox} value={entryPressed}/>)
        }
        return x
    }

    function toggleCheckbox(title, value) {
        selectedLabel[title] = value
        setSelectedLabel(selectedLabel)
        console.log("here are selected labels", selectedLabel)
    }

    if (!dbResult.length) {
        ReadLabelTypes(setDbResult)
    } 

    function setNewLabel(arg) {
        if (dbResult.includes(arg)) {
            return false
        }
        console.log("trying to add new label", arg, dbResult)
        dbResult.push(arg)
        setDbResult(dbResult)
        return true
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = (e) => {
        setKeyboardOffset(e.endCoordinates.height / 2)
    };

    const _keyboardDidHide = () => {
        setKeyboardOffset(0)
    };

    const getColor = (value) => {
        if (value == "Label") {
            return ("rgb(150, 150, 150)")
        }
        else {
            return ("black")
        }
    }

    const donePressed = () => {
        var labelsSetTrue = [] 
        setModalVisible(!modalVisible)
        for (var key in selectedLabel) {
            if (selectedLabel[key]) {
                labelsSetTrue.push(key)
            }
        }
        if (labelsSetTrue.length == 1) {
            setValue(labelsSetTrue[0])
        } else if (labelsSetTrue.length == 0) {
            setValue ("Label")
        } else {
            setValue(labelsSetTrue.length + " Labels Chosen")
        }
        console.log("here are final labels", labelsSetTrue)
        props.setSelectedTrueLabel(labelsSetTrue)
    }

    return (
        <>
            <View style={{ ...commonStyles.textInput, width: "35%", justifyContent: "center" }}>
                <TouchableWithoutFeedback onPress={() => { setModalVisible(true) }}>
                    <Text style={{ color: getColor(value) }}>{value}</Text>
                </TouchableWithoutFeedback>
            </View>
            <View>
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
                    <View style={{ marginTop: constants.windowHeight / 2 - 200 - keyboardOffset }}>
                        <View style={styles.modalView}>
                            <View style={{ height: 250, marginTop: 20 }}>
                                <ScrollView contentContainerStyle={{ padding: 10 }}>
                                    {generateLabelViews()}
                                    <NewEntry setNewLabel={setNewLabel} />
                                </ScrollView>
                            </View>
                            <TouchableHighlight style={{ ...styles.openButton, marginVertical: 20 }} onPress={donePressed}>
                                <Text style={styles.textStyle}>Done</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal >
            </View >
        </>
    );
};

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "#3e424b",
        marginBottom: 8,
        padding: 10,
        width: constants.windowWidth * 0.65,
    },
    modalView: {
        marginHorizontal: 50,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "grey",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 100
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default SetLabel;

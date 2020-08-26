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
import { ScrollView, TouchableWithoutFeedback, FlatList } from "react-native-gesture-handler";
import constants from "./common/constants";
import SingleLabel from "./SingleLabel";
import NewEntry from "./NewLabel";
import { commonStyles } from './common/styles';
import { ReadLabelTypesAsync } from './common/Db';
import { AddNewLabelType } from "./common/Db";
import { SafeAreaView } from "react-native-safe-area-context";

const getModalOffset = (resultLength) => {
    let height = constants.windowHeight / 2 - (resultLength * 60 + 20)
    if (height < constants.windowHeight * 0.15) {
        height = constants.windowHeight * 0.15
    }
    return height
}

const getModalHeight = (resultLength) => {
    console.log("calculating height", resultLength)
    let maxHeight = constants.windowHeight * 0.60
    let offset = resultLength < 6 ? 60 : 30
    let allowedHeight = (resultLength * 60 + offset)
    let resultHeight = allowedHeight > maxHeight ? maxHeight : allowedHeight
    return resultHeight
}

const SetLabel = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const [selectedLabel, setSelectedLabel] = useState({})
    const [value, setValue] = useState('Label')
    const [dbResult, setDbResult] = useState([])

    const [modalHeight, setModalHeight] = useState(200)
    const [modalOffset, setModalOffset] = useState(200)

    function toggleCheckbox(title, value) {
        /* handler single label press */
        selectedLabel[title] = value
        setSelectedLabel(selectedLabel)
    }

    function handleNewLabel(arg) {
        /* user has entered a new label */

        // check if it already exists. if so deny it
        if (dbResult.includes(arg)) {
            return false
        }

        // add new entry to frontend
        dbResult.splice(dbResult.length - 2, 0, arg);
        setDbResult(dbResult)
        setModalHeight(getModalHeight(dbResult.length))
        setModalOffset(getModalOffset(dbResult.length))

        AddNewLabelType(arg)

        return true
    }

    async function getLabelResponse() {
        /* gets data from db and sets modal position */
        let x = await ReadLabelTypesAsync()
        x.push("newentrydeadbeef")
        setDbResult(x)
        setModalHeight(getModalHeight(x.length))
        setModalOffset(getModalOffset(x.length))
    }

    useEffect(() => {
        if (!dbResult.length) {
            getLabelResponse()
        }

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
            setValue("Label")
        } else {
            setValue(labelsSetTrue.length + " Labels Chosen")
        }
        console.log("here are final labels", labelsSetTrue)
        props.setSelectedTrueLabel(labelsSetTrue)
    }

    const renderItem = ({ item, index }) => {
        if (item == "newentrydeadbeef") {
            return (<NewEntry setNewLabel={handleNewLabel} />)
        } else {
            let entryPressed = props.selectedTrueLabel.includes(item) ? true : false
            return (<SingleLabel title={item} toggleCheckbox={toggleCheckbox} value={entryPressed} />)
        }
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
                    <View style={{ marginTop: modalOffset - keyboardOffset }}>
                        <View style={styles.modalView}>
                            <View style={{ height: modalHeight, marginTop: 20 }}>
                                <FlatList
                                    bounces={false}
                                    data={dbResult}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => { return item }} />
                            </View>
                            <TouchableHighlight style={{ ...commonStyles.button, marginVertical: 20, width: 100 }} onPress={donePressed}>
                                <Text style={commonStyles.buttonText}>Done</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal >
            </View >
        </>
    );
};

const styles = StyleSheet.create({
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
});

export default SetLabel;
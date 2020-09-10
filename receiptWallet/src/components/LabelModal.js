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
import { FlatList } from "react-native-gesture-handler";
import constants from "./common/constants";
import SingleLabel from "./SingleLabel";
import NewEntry from "./NewLabel";
import { commonStyles } from './common/styles';
import { ReadLabelTypesAsync, ReadCategoryTypesAsync, deleteLabel } from './common/Db';
import { AddNewLabelType } from "./common/Db";

const getModalOffset = (resultLength) => {
    let height = constants.windowHeight / 2 - (resultLength * 60 + 20)
    if (height < constants.windowHeight * 0.15) {
        height = constants.windowHeight * 0.15
    }
    console.log("calculated modal offset")
    return height
}

const getModalHeight = (resultLength) => {
    let heightMap = { 1: 50, 2: 100, 3: 155, 4: 210, 5: 260, 6: 315, 7: 370, 8: 390, 9: 450 }
    let height = 0
    if (!(resultLength in Object.keys(heightMap))) {
        height = 450
    } else {
        height = heightMap[resultLength]
    }

    if (height > constants.windowHeight * 0.5) {
        return constants.windowHeight * 0.5
    } else {
        return height
    }
}

const getInitialLabel = (arg) => {
    let result = {}
    for (let idx = 0; idx < arg.length; idx++) {
        result[arg[idx]] = true
    }
    return result
}

const LabelModal = props => {
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const [selectedLabel, setSelectedLabel] = useState({});
    const [dbResult, setDbResult] = useState([])

    const [modalHeight, setModalHeight] = useState(200)
    const [modalOffset, setModalOffset] = useState(200)

    const [action, setAction] = useState("done")

    function convertAction() {
        if (props.allowDelete) {
            action == "done" ? setAction("delete") : setAction("done")
        }
    }

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
        let x = []
        if (props.type == "category") {
            x = await ReadCategoryTypesAsync()
        } else {
            x = await ReadLabelTypesAsync()
        }
        if (props.allowNewEntry) {
            x.push("newentrydeadbeef")
        }
        setDbResult(x)
        setModalHeight(getModalHeight(x.length))
        setModalOffset(getModalOffset(x.length))
    }

    // the following can be refactored for better performance
    if (props.selectedTrueLabel.length > 0 && Object.keys(selectedLabel).length == 0) {
        setSelectedLabel(getInitialLabel(props.selectedTrueLabel))
    }

    useEffect(() => {
        getLabelResponse()

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

    const handleDone = () => {
        var labelsSetTrue = []
        for (var key in selectedLabel) {
            if (selectedLabel[key]) {
                labelsSetTrue.push(key)
            }
        }

        if (action == "delete") {
            deleteLabel(labelsSetTrue)
            let nonDeletedLabel = dbResult.filter(val => !labelsSetTrue.includes(val));
            setDbResult(nonDeletedLabel)
            setAction("done")
        } else {
            props.donePressed(labelsSetTrue)
        }

    }

    const onDelete = () => {
        console.log("on delete called")
    }

    const renderItem = ({ item, index }) => {
        if (item == "newentrydeadbeef") {
            return (<NewEntry setNewLabel={handleNewLabel} />)
        } else {
            let enabled = props.selectedTrueLabel.includes(item) ? true : false
            return (<SingleLabel title={item} toggleCheckbox={toggleCheckbox} enabled={enabled} callback={onDelete} longPress={convertAction} />)
        }
    }

    return (
        <View>
            <Modal animationType="slide" transparent={true} visible={props.modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
                <View style={{ marginTop: modalOffset - keyboardOffset }}>
                    <View style={styles.modalView}>
                        <View style={{ height: modalHeight, marginTop: 20 }}>
                            <FlatList
                                bounces={false}
                                data={dbResult}
                                renderItem={renderItem}
                                keyExtractor={(item) => { return item }} />
                        </View>
                        {action == "done" ?
                            <TouchableHighlight style={{ ...commonStyles.button, marginVertical: 20, width: 100 }} onPress={handleDone}>
                                <Text style={commonStyles.buttonText}>Done</Text>
                            </TouchableHighlight>
                            :
                            <TouchableHighlight style={{ ...commonStyles.button, marginVertical: 20, width: 100, backgroundColor: "red" }} onPress={handleDone}>
                                <Text style={commonStyles.buttonText}>Delete</Text>
                            </TouchableHighlight>
                        }
                    </View>
                </View>
            </Modal >
        </View >
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

export default LabelModal;

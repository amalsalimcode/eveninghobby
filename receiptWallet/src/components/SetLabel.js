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
import { ScrollView } from "react-native-gesture-handler";
import constants from "./common/constants";
import SingleEntry from "./SingleEntry";
import NewEntry from "./NewEntry";
import { ReadLabelTypes } from './common/Db';

const SetLabel = () => {
    const [modalVisible, setModalVisible] = useState(true);
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const [label, setLabel] = useState([])

    function setDbResponse(result) {
        let x = []
        console.log("here is the dbresponse", result)
        for (index = 0; index < result.length; index++) {
            x.push(<SingleEntry key={index} title={result[index]} />)
        }
        setLabel(x)
    }

    if (!label.length) {
        ReadLabelTypes(setDbResponse)
    }

    function setNewLabel(arg) {
        if (label.includes(arg)) {
            return false
        }
        let x = label
        x.push(<SingleEntry key={x.length+1} title={arg}/>)
        setLabel(x)
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
        console.log("Keyboard Shown", e.endCoordinates.height / 2);
    };

    const _keyboardDidHide = () => {
        setKeyboardOffset(0)
        console.log("keyboard hidden")
    };

    return (
        <View>
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
                <View style={{ marginTop: constants.windowHeight / 2 - 200 - keyboardOffset }}>
                    <View style={styles.modalView}>
                        <View style={{ height: 250, marginTop: 20 }}>
                            <ScrollView contentContainerStyle={{ padding: 10 }}>
                                {label}
                                <NewEntry setNewLabel={setNewLabel}/>
                            </ScrollView>
                        </View>
                        <TouchableHighlight style={{ ...styles.openButton, marginVertical: 20 }} onPress={() => { setModalVisible(!modalVisible); }}>
                            <Text style={styles.textStyle}>Done</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal >
        </View >
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

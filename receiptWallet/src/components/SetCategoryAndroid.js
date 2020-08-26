import React, { useState, useEffect } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    View,
    Keyboard
} from "react-native";
import { ScrollView, TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";
import constants from "./common/constants";
import NewEntry from "./NewLabel";
import { commonStyles } from './common/styles';
import { ReadCategoryTypesAsync, AddNewCategoryType } from './common/Db';
import SingleCategoryAndroid from "./SingleCategoryAndroid";
import NewCategoryAndroid from "./NewCategoryAndroid";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


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

const SetCategoryAndroid = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const [value, setValue] = useState('Category')
    const [dbResult, setDbResult] = useState([])

    const [modalHeight, setModalHeight] = useState(200)
    const [modalOffset, setModalOffset] = useState(200)

    function generateCategoryViews() {
        /* the view for each Label is generated */
        let x = []
        for (let index = 0; index < dbResult.length; index++) {
            x.push(<SingleCategoryAndroid key={index} title={dbResult[index]} handlePress={categorySelected} />)
        }
        return x
    }

    function handleNewCategory(arg) {
        /* check if it already exists. if so don't add to db */
        if (!dbResult.includes(arg)) {
            dbResult.push(arg)
            setDbResult(dbResult)
        }
        categorySelected(arg)
        AddNewCategoryType(arg)
    }

    async function getCategoryResponse() {
        let x = await ReadCategoryTypesAsync()
        setDbResult(x)
        setModalHeight(getModalHeight(x.length))
        setModalOffset(getModalOffset(x.length))
    }

    useEffect(() => {
        if (!dbResult.length) {
            getCategoryResponse()
        }

        // loadFont()

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
        if (value == "Category") {
            return ("rgb(150, 150, 150)")
        }
        else {
            return ("black")
        }
    }

    const categorySelected = (arg) => {
        setModalVisible(!modalVisible)
        setValue(arg)
        props.onSubmit(arg)
    }

    return (
        <>
            <View style={{ ...commonStyles.textInput, width: "37%", justifyContent: "center" }}>
                <TouchableWithoutFeedback onPress={() => { setModalVisible(true) }}>
                    <Text style={{ color: getColor(value) }}>{value}</Text>
                </TouchableWithoutFeedback>
            </View>
            <View>
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
                    <View style={{ marginTop: modalOffset - keyboardOffset }}>
                        <View style={styles.modalView}>
                            <View style={{ height: modalHeight, marginTop: 20 }}>
                                <ScrollView contentContainerStyle={{ padding: 10 }}>
                                    {generateCategoryViews()}
                                    <NewCategoryAndroid onSubmit={handleNewCategory} />
                                </ScrollView>
                            </View>
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

export default SetCategoryAndroid;

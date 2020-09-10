import React, { useState, useEffect } from "react";
import {
    Text,
    View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { commonStyles } from './common/styles';
import LabelModal from "./LabelModal";
import { getColor } from "./common/constants";

const SetLabelText = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState('Label')

    useEffect(() => {
    }, []);

    const donePressed = (labelsSetTrue) => {
        setModalVisible(!modalVisible)
        if (labelsSetTrue.length == 1) {
            setValue(labelsSetTrue[0])
        } else if (labelsSetTrue.length == 0) {
            setValue("Label")
        } else {
            setValue(labelsSetTrue.length + " Labels Chosen")
        }
        props.setSelectedTrueLabel(labelsSetTrue)
    }

    return (
        <>
            <View style={{ ...commonStyles.textInput, width: "35%", justifyContent: "center" }}>
                <TouchableWithoutFeedback onPress={() => { setModalVisible(true) }}>
                    <Text style={{ color: getColor(value, "Label") }}>{value}</Text>
                </TouchableWithoutFeedback>
            </View>
            <LabelModal allowNewEntry={true} donePressed={donePressed} selectedTrueLabel={props.selectedTrueLabel} modalVisible={modalVisible} {...props}/>
        </>
    );
};


export default SetLabelText;

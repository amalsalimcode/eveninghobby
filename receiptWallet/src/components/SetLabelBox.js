import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import LabelModal from "./LabelModal";
import { getColor } from "./common/constants";


const SetLabelBox = props => {
    const [modalVisible, setModalVisible] = useState(null);


    useEffect(() => {
    }, []);

    const donePressed = (labelsSetTrue) => {
        setModalVisible(!modalVisible)
        props.setSelectedTrueLabel(labelsSetTrue)
    }

    function renderbuttons(buttons) {
        if (!buttons.length) {
            return (
                <View>
                    <Text style={{ color: getColor("x", "x") }}>Label</Text>
                </View>
            )
        }
        let buttonsContent = buttons.map((button, i) => {
            return (
                <View key={i} style={styles.singleLabel}>
                    <Text style={styles.singleLabelText}>{button}</Text>
                </View>
            )
        })
        return buttonsContent
    }

    return (
        <>
            <TouchableWithoutFeedback containerStyle={styles.labelLimitContainer} onPress={() => { setModalVisible(true) }}>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => { setModalVisible(true) }}>
                        <View style={styles.labelContainer}>
                            {renderbuttons(props.selectedTrueLabel)}
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </TouchableWithoutFeedback>
            <LabelModal allowNewEntry={true} donePressed={donePressed} selectedTrueLabel={props.selectedTrueLabel} modalVisible={modalVisible} />
        </>
    )

};

const styles = StyleSheet.create({
    labelLimitContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        marginHorizontal: "7%",
        height: 120
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        flexWrap: 'wrap',
    },
    singleLabel: {
        backgroundColor: "grey",
        borderRadius: 30,
        padding: 7,
        marginRight: 10,
        marginBottom: 10,
    },
    singleLabelText: {
        color: 'white',
        fontSize: 12,
        alignSelf: 'center'
    },
});

export default SetLabelBox;

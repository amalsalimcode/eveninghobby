import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from './common/constants'
import CheckBox from 'react-native-check-box'



const SingleLabel = props => {

    const [isChecked, setIsChecked] = useState(props.value);

    useEffect(() => {
    }, []);

    const checkBoxPressed = () => {
        props.toggleCheckbox(props.title, !isChecked)
        setIsChecked(!isChecked)

    }

    return (
        <TouchableOpacity style={styles.square} onPress={checkBoxPressed} onLongPress={() => { }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 15 }}> 
                <CheckBox style={{ flex: 1 }} onClick={checkBoxPressed} isChecked={isChecked} leftText={props.title}/>
            </View >
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "#3e424b",
        marginBottom: 8,
        padding: 10,
        width: constants.windowWidth * 0.65,
        borderWidth: 0.7
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleLabel)

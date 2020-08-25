import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from './common/constants'
import CheckBox from 'react-native-check-box'
import { commonStyles } from "./common/styles";



const SingleLabel = props => {

    const [isChecked, setIsChecked] = useState(props.value);

    useEffect(() => {
    }, []);

    const checkBoxPressed = () => {
        props.toggleCheckbox(props.title, !isChecked)
        setIsChecked(!isChecked)

    }

    return (
        <TouchableOpacity style={commonStyles.singleEntryoutline} onPress={checkBoxPressed} onLongPress={() => { }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 15 }}> 
                <CheckBox style={{ flex: 1 }} onClick={checkBoxPressed} isChecked={isChecked} leftText={props.title}/>
            </View >
        </TouchableOpacity>
    );
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleLabel)

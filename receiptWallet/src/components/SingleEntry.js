import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from './common/constants'
import CheckBox from 'react-native-check-box'



const SingleEntry = props => {

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
    }, []);

    return (
        <TouchableOpacity style={styles.square} onPress={() => { setIsChecked(!isChecked) }} onLongPress={() => { }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 15 }}> 
                <CheckBox style={{ flex: 1 }} onClick={() => { setIsChecked(!isChecked) }} isChecked={isChecked} leftText={props.title}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleEntry)

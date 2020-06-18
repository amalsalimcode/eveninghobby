import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import AddAccount from "./AddAccount";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const ManageAccounts = props => {

    useEffect(() => {
    }, []);

    return (
        <TouchableWithoutFeedback style={{ borderWidth: 0.5, marginTop: 100, height: 400, marginHorizontal: 10}}>
            <TouchableWithoutFeedback style={{alignItems: "center"}}>
                <AddAccount />
            </TouchableWithoutFeedback>
        </TouchableWithoutFeedback>
    )
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccounts)

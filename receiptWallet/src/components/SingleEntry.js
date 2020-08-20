import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants, { getFormattedDate } from './common/constants'

const SingleEntry = props => {

    const [borderWidth, setBorderWidth] = useState(0.7);

    useEffect(() => {
    }, []);

    return (
        <>
            <TouchableOpacity style={{ ...styles.square, borderWidth: borderWidth }} onPress={() => { }} onLongPress={() => { }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 10 }}>
                    <Text style={{}}>label</Text>
                    <Text>checkbox</Text>
                </View >
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "#3e424b",
        width: "95%",
        marginBottom: 8,
        padding: 10
    },
    textContainer: {
        borderBottomWidth: 2,
        marginBottom: 10,
        width: constants.windowWidth - 50,
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

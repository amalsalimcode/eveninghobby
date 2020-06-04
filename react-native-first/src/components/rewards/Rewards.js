import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import { Button } from "react-native";

const Rewards = props => {

    useEffect(() => {
    }, []);


    console.log(props.navigation)

    return (
        <View style={styles.container}>
            <Text>
                Rewards + AdSpace
            </Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(Rewards)

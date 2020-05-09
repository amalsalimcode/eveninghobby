/*
 * All transaction Data is loaded here
 */

import React, { useRef, useState } from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';


const SingleBarData = props => {

    var total_height = 25
    const cur_height = useRef(new Animated.Value(total_height)).current;

    const change_height = (card_idx) => {
        console.log("clicked on change height!")

        if (total_height == 200) {
            total_height = 25
        } else {
            total_height = 200
        }
        Animated.timing(cur_height, {
            toValue: total_height,
            duration: 1000
        }).start()
    }

    return (
        <>
            <TouchableOpacity onPress={() => (change_height())} style={styles.square}>
                <Animated.View style={{ height: cur_height, justifyContent: "center" }}>
                    <View style={{ marginLeft: 10 }} shadowOffset={{ height: 10 }}
                        shadowColor='black'
                        shadowOpacity={0.4}
                        shadowOffset={{ height: 2, width: 2 }}>
                        <Text>Date..... Merchant .... Price</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "grey",
        backgroundColor: "white",
        borderWidth: 0.3,
        borderRadius: 10,
        shadowColor: "black",
        width: "95%",
        shadowOpacity: 0.1,
        shadowRadius: 40,
        marginBottom: 8,
    },
});

function mapStateToProps(state) {
    return {
        bar_data: state.TransactionsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBarData)
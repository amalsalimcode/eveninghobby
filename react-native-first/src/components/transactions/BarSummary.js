'use strict'

import React, { useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Overlay } from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';


const months = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October",
    "November", "December"]


const BarSummary = props => {

    var cur_month = months[props.meta.month]
    const [overlayVisible, setOverlayVisible] = useState(false);

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };


    return (
        <>
            <TouchableOpacity onPress={toggleOverlay} style={styles.square}>
                <Animated.View style={{ height: 30, paddingTop: 6 }}>
                    <View style={{ marginLeft: 10 }} shadowOffset={{ height: 10 }}
                        shadowColor='black'
                        shadowOpacity={0.4}
                        shadowOffset={{ height: 2, width: 2 }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, alignItems: "flex-start", marginLeft: 35 }}>
                                <Text>Week Start: </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>    {props.meta.date} {cur_month} {props.meta.year}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, alignItems: "flex-start", marginLeft: 35 }}>
                                <Text>Expense This Week: </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>    ${parseInt(props.meta.total_spend)} </Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>
                <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay} overlayStyle={{ ...styles.square, height: "80%" }}>

                    <Button
                        ViewComponent={LinearGradient} // Don't forget this!
                        linearGradientProps={{
                            colors: ['red', 'orange'],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                    />
                </Overlay>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "black",
        backgroundColor: "white",
        borderWidth: 0.7,
        borderRadius: 10,
        shadowColor: "black",
        width: "95%",
        shadowOpacity: 0.1,
        shadowRadius: 40,
        marginBottom: 10,
        marginTop: 20,
        height: 48
    },
});


function mapStateToProps(state) {
    return {
        meta: state.TransactionsReducer.meta_data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeBarHeight: (uuid) => dispatch({ type: "CHANGE_BAR_HEIGHT", uuid: uuid }),
        changeCurWeek: (direction) => dispatch({ type: "CHANGE_CUR_WEEK", direction: direction })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarSummary)
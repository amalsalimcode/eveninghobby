/*
 * All transaction Data is loaded here
 */

import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";
import SingleDataTemplate from './SingleDataTemplate';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const SingleBarData = props => {

    const [fontSize, setFontSize] = useState(15);
    const [fontSizeExp, setFontSizeExp] = useState(1);
    const [nameLen, setNameLen] = useState(15)

    const changeHeight = () => {

        fontSize == 1 ? setFontSize(15) : setFontSize(1)
        nameLen == 15 ? setNameLen(110) : setNameLen(15)
        fontSizeExp == 1 ? setFontSizeExp(15) : setFontSizeExp(1)

    }

    useEffect(() => { });

    const transaction = props.barData[props.uuid].transaction_data[props.transIdx]

    const name = transaction["name"].slice(0, nameLen)
    const institution = transaction["institution"]
    const amount = transaction["charge"]
    const purchaseDate = transaction["date"]

    const person = transaction["person"]
    const borderColor = props.personData[person].color

    return (
        <SingleDataTemplate onClick={changeHeight} expandHeight={150} borderLeftColor={borderColor}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>{name}</Text>
                <Text style={{ fontSize: fontSize }}>${amount}  </Text>
            </View>
            <Text></Text>
            <Text style={{ fontSize: fontSizeExp }}>Amount: ${amount}  </Text>
            <Text>Institution: {institution}</Text>
            <Text>Date of Purchase: {purchaseDate}</Text>
            <View style={{ marginTop: 10, height: 45 }}>
                <Grid>
                    <Row>
                        <Col style={styles.container}>
                            <TouchableHighlight onPress={() => { console.log("hi") }}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: 100 }}>
                                    <MaterialIcons name="receipt" size={24} color={borderColor} />
                                    <Text style={{ fontSize: 8 }}>Add Receipt</Text>
                                </View>
                            </TouchableHighlight>
                        </Col>
                        <Col style={styles.container}>
                            <TouchableHighlight onPress={() => { console.log("hi") }}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: 100 }}>
                                    <Entypo name="flag" size={24} color={borderColor} />
                                    <Text style={{ fontSize: 8 }}>Flag Transaction</Text>
                                </View>
                            </TouchableHighlight>
                        </Col>
                        <Col style={styles.container}>
                            <TouchableHighlight onPress={() => { console.log("hi") }}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: 100 }}>
                                    <Entypo name="eye-with-line" size={24} color={borderColor} />
                                    <Text style={{ fontSize: 8 }}>Hide Transaction</Text>
                                </View>
                            </TouchableHighlight>
                        </Col>
                    </Row>
                </Grid>
            </View>
        </SingleDataTemplate>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 2
    },
})

function mapStateToProps(state) {
    return {
        barData: state.TransactionsReducer.bar_data,
        swipeIntercept: state.SwipeReducer.barDataSwiped,
        personData: state.PersonReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBarData)
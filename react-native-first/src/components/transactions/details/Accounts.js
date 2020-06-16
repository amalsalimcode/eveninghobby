'use strict';

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import SingleAccount from './SingleAccount';
import SingleDataTemplate from './SingleDataTemplate';
import { uuidv4 } from '../../common/constants'
import FadeInView from '../../common/FadeInView';

const Accounts = props => {


    useEffect(() => {

    }, [props.fullDate])

    const on_swipe = (gestureName) => {
        const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_LEFT:
                props.setBarDataSwipe()
                return
            case SWIPE_RIGHT:
                props.setBarDataSwipe()
                return
        }
    }

    const newAccount = () => {
        props.navigation.navigate("AddAccount")
    }

    const setPersonDetails = (count, name, data) => {
        switch (count) {
            case 0:
                data.avatarPath = require('../../../../assets/avatar-pink.png')
                data.color = "#ff427f"
                data.name = name
                props.setPersonData(data)
                return
            default:
                data.avatarPath = require('../../../../assets/avatar-green.png')
                data.color = "green"
                data.name = name
                props.setPersonData(data)
                return

        }
    }

    const getAccounts = () => {

        let x = []
        let name = ""
        let prevName = ""
        let personCount = 0

        if (props.data.length) {

            for (let idx = 0; idx < props.data.length; idx++) {

                name = props.data[idx].firstName

                // new person
                if (name != prevName) {
                    var data = {}
                    setPersonDetails(personCount, name, data)
                    x.push(
                        < View style={{ ...styles.container }} key={uuidv4()} >
                            <Image style={styles.tinyLogo} source={data.avatarPath} />
                            <Text style={{ color: data.color }}> {name} </Text>
                        </View >
                    )
                    personCount += 1
                }

                x.push(
                    <SingleAccount key={uuidv4()} data={props.data[idx]} />
                )

                prevName = name
            }
        }

        // Ability to add a new Bank Account
        x.push(
            <SingleDataTemplate onClick={newAccount} containerStyle={styles.newAccountContainer} enableExpand={false} key={uuidv4()}>
                <Text >Click here to add new Account</Text>
            </SingleDataTemplate>
        )
        return x

    }

    if (!props.dataLoaded) {
        return (
            <>
                <View style={{ ...styles.plot_container, justifyContent: "center", alignContent: "center" }}>
                    <ActivityIndicator />
                </View>
            </>
        )
    } else {
        return (
            <ScrollView>
                <GestureRecognizer onSwipe={(direction, state) => on_swipe(direction, state)} config={{ velocityThreshold: 0.3, gestureIsClickThreshold: 100 }}>
                    <FadeInView>
                        {getAccounts()}
                    </FadeInView>
                </GestureRecognizer>
            </ScrollView>

        )
    }
}

var styles = StyleSheet.create({
    test: {
        backgroundColor: "red"
    },
    tinyLogo: {
        width: 40,
        height: 40,
    },
    avatar: {
    },
    container: {
        marginTop: 2,
        marginBottom: 2,
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "black",
        width: "95%",
        shadowOpacity: 0.1,
        shadowRadius: 40,
        marginBottom: 10,
        height: 50
    },
    newAccountContainer: {
        borderRightWidth: 4,
        borderRightColor: "black",
        alignItems: "center"

    }
});

function mapStateToProps(state) {
    return {
        data: state.AccountsReducer.accountInfo,
        fullDate: state.TransactionsReducer.meta_data.fullDate,
        dataLoaded: state.AccountsReducer.dataLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setBarDataSwipe: () => dispatch({
            type: 'SET_BAR_DATA_SWIPE',
            source: "accounts"
        }),

        setPersonData: (data) => dispatch({ type: "SET_PERSON_INFO", data: data })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)

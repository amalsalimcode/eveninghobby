/*
 * All transactions to be displayed are setup and retrieved here
 */

'use strict'

import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Keyboard } from 'react-native';
import { commonStyles, theme } from '../common/styles'
import { AntDesign } from '@expo/vector-icons';
import GradientBackground from '../common/GradientBackground';

const Search = props => {

    const [value, setValue] = useState('')

    useEffect(() => {
    }, []);

    return (
        < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
            <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                <View style={{
                    ...commonStyles.inputView, flexDirection: "row",
                    paddingLeft: 15, borderColor: "red", borderWidth: 0.2,
                    marginTop: 100
                }} >

                    <View style={{ marginRight: 10, marginTop: 12 }}>
                        <AntDesign name="search1" size={24} color="black" />
                    </View>
                    <TextInput
                        style={{ ...commonStyles.inputText, flex: 1 }}
                        placeholder="Search"
                        placeholderTextColor={theme.placeholderText}
                        onChangeText={setValue}
                        value={value}
                        autoCorrect={false}
                        autoCapitalize='none'
                        autoFocus={true}
                        onBlur={() => { console.log(value) }}
                    />
                </View>
            </View>
        </ GradientBackground>
    )
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeCurWeek: (direction) => dispatch({ type: "ADD_SUB_CUR_WEEK", direction: direction })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
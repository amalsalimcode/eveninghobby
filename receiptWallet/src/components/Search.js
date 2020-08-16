'use strict'

import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';


import { commonStyles, theme } from './common/styles'
import GradientBackground from './common/GradientBackground';

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
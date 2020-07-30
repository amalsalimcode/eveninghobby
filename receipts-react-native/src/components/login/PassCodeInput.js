import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ShadowPropTypesIOS } from 'react-native'
import React, { useState, useEffect } from "react";
import { Image } from "react-native"
import { commonStyles, theme } from '../common/styles'
import { connect } from 'react-redux'

/*
 * two ways of entering here:
 * 1. SignUp:
 *    1a. First time, no prop is passed in, and value is saved in redux
 *    1b. Second time, is to ensure values match with first time. all values are passed in
 * 
 * 2. SignIn:
 *    Only called once, no prop is passed in and value is savied in redux
 */

const PassCodeInput = props => {

  useEffect(() => {
  }, []);

  var borderWidth = props.borderWidth ? props.borderWidth : 0

  const passhandler = (enteredText) => {
    var filteredText = enteredText.replace(/[^0-9]/g, '')
    props.setPassCode ? props.setPassCode(filteredText) : props.setCode(filteredText)
  }

  return (
    <View style={{
      ...commonStyles.inputView, flexDirection: "row",
      paddingLeft: 15, borderColor: "red", borderWidth: borderWidth
    }} >

      <Image style={{ marginRight: 10, marginTop: 13, height: 20, width: 20 }} source={require('../../../assets/lock.png')} />

      <TextInput
        style={{ ...commonStyles.inputText, flex: 1 }}
        placeholder={props.placeholder ? props.placeholder : "4 digit passcode"}
        onChangeText={props.onChangeText ? props.onChangeText : passhandler}
        value={props.value ? props.value : props.code}
        placeholderTextColor={theme.placeholderText}
        keyboardType="number-pad"
        secureTextEntry={true}
        maxLength={4}
      />

    </View>
  )
}

function mapStateToProps(state) {
  return {
    code: state.PersonalInformationReducer.code,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCode: (entered_code) => { dispatch({ type: 'SET_CODE', new_code: entered_code }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PassCodeInput)
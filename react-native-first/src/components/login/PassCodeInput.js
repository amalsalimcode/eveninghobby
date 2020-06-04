import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ShadowPropTypesIOS } from 'react-native'
import React, { useState, useEffect } from "react";
import { Image } from "react-native"
import { commonStyles } from '../common/styles'
import { connect } from 'react-redux'



const PassCodeInput = props => {

  /*
   * If the user clicked next and then previous,
   * show them the data that was filled in
   */
  useEffect(() => {
  }, []);


  const passhandler = (enteredText) => {
    var filteredText = enteredText.replace(/[^0-9]/g, '')
    props.setPassCode ? props.setPassCode(filteredText) : props.setCode(filteredText)
  }

  return (
    <View style={{ ...commonStyles.inputView, flexDirection: "row", paddingLeft: 15 }} >
      <Image style={{ marginRight: 10, marginTop: 8 }} source={require('../../../assets/male-user.png')} />
      <TextInput
        style={{ ...commonStyles.inputText, flex: 1 }}
        placeholder={props.placeholder ? props.placeholder : "4 digit passcode"}
        placeholderTextColor="#003f5c"
        onChangeText={passhandler}
        maxLength={4}
        secureTextEntry={true}
        keyboardType="number-pad"
        value={props.value ? props.value: props.code}
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
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import React, { useEffect, useState } from "react";
import { Image } from "react-native"
import EmailInput from './EmailInput';
import { commonStyles, colorPallette } from '../common/styles'
import PassCodeInput from './PassCodeInput';
import LoginButton from './LoginButton';



const SignIn = props => {

  const next_button_pressed = () => {

    if (props.email && props.code) {
      props.setScreen(0)
    } else {
      console.log("not all fields are filled in")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={-150}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ ...commonStyles.authScreen, paddingTop: 100 }}>

        <View style={{ backgroundColor: colorPallette.background, alignItems: "center", paddingTop: 50 }}>
          <Image style={{ height: 200, width: 200, backgroundColor: colorPallette.background }} source={require('../../../assets/dolphin.png')} />
        </View>

        <EmailInput defaultEmail={props.defaultEmail} />
        <PassCodeInput />
        <LoginButton btnMsg="SignIn" pressAction={next_button_pressed} />

      </KeyboardAvoidingView >
    </TouchableWithoutFeedback>
  )
}

function mapStateToProps(state) {
  return {
    name: state.PersonalInformationReducer.name,
    number: state.PersonalInformationReducer.number,
    code: state.PersonalInformationReducer.code,
    email: state.PersonalInformationReducer.email,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setName: (entered_name) => { dispatch({ type: 'SET_NAME', new_name: entered_name }) },
    setCode: (entered_code) => { dispatch({ type: 'SET_CODE', new_code: entered_code }) },
    setScreen: (data) => dispatch({ type: "SET_SCREEN", data: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
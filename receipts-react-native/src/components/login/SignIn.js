import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import React, { useEffect, useState } from "react";
import { Image } from "react-native"
import EmailInput from './EmailInput';
import PassCodeInput from './PassCodeInput';
import LoginButton from './LoginButton';
import GradientBackground from '../common/GradientBackground';


const SignIn = props => {

  const next_button_pressed = () => {

    if (props.email && props.code) {
      props.navigation.navigate("Home")
    } else {
      console.log("not all fields are filled in")
    }
  }

  return (
    <>
      <GradientBackground>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>

            <Image style={{ height: 200, width: 200 }} source={require('../../../assets/dolphin.png')} />
            <EmailInput defaultEmail={props.defaultEmail} />
            <PassCodeInput />
            <LoginButton btnMsg="SignIn" pressAction={next_button_pressed} />

          </KeyboardAvoidingView >
        </TouchableWithoutFeedback>
        <View style={{ paddingBottom: 150 }} />
      </GradientBackground>
    </>
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
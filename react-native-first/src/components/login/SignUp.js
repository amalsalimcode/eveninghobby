import { View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements';
import PhoneNumberInputs from './PhoneNumberInput'
import PassCodeSignup from './PassCodeSignup';
import { connect } from 'react-redux'
import React, { useEffect } from "react";
import { TextInput, Text, Image } from 'react-native';
import { commonStyles, colorPallette } from '../common/styles';
import EmailInput from './EmailInput';
import NameInput from './NameInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import LoginButton from './LoginButton';
import GradientBackground from '../common/GradientBackground';

const SignUp = props => {

  const next_button_pressed = () => {

    console.log("Current information name: " + props.name +
      " number: " + props.number + " code: " + props.code)

    if (props.name && props.number && props.code && props.email) {
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
            style={{ alignItems: "center", flex: 1, justifyContent: "center", paddingBottom: 100 }}>
            <Image style={{ height: 200, width: 200 }} source={require('../../../assets/dolphin.png')} />
            <NameInput />
            <EmailInput />
            <PhoneNumberInputs />
            <PassCodeSignup />
            <LoginButton btnMsg="SignUp" pressAction={next_button_pressed} />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback >

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
    email: state.PersonalInformationReducer.email
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setName: (entered_name) => { dispatch({ type: 'SET_NAME', new_name: entered_name }) },
    setScreen: (data) => dispatch({ type: "SET_SCREEN", data: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
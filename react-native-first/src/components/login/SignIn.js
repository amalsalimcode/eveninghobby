import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import React, { useEffect, useState } from "react";
import EmailInput from './EmailInput';
import { commonStyles } from '../common/styles'


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
        style={styles.personal_info}>

        <EmailInput defaultEmail={props.defaultEmail} />
        <View style={commonStyles.inputView} >
          <TextInput
            style={commonStyles.inputText}
            placeholder="4 digit passcode"
            placeholderTextColor="#003f5c"
            onChangeText={(entered_text) => { props.setCode(entered_text.replace(/[^0-9]/g, '')) }}
            maxLength={4}
            secureTextEntry={true}
            keyboardType="number-pad"
          />
        </View>


        <View style={{ padding: 20 }}>
          <Button raised
            // icon={<Ionicons name="md-checkmark-circle" size={32} color="green" />}
            buttonStyle={{
              backgroundColor: "rgba(120, 160, 201, 0.5)",
              borderRadius: 10, height: 40, width: 40, borderRadius: 80
            }}
            onPress={next_button_pressed}
            rounded={false}
            disabled={false}
          />
        </View>
      </KeyboardAvoidingView >
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  personal_info: {
    backgroundColor: "#342b38",
    backgroundColor: "#3f3f44",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
});


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
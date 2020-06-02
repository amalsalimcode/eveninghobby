import { View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import React, { useEffect, useState } from "react";
import EmailInput from './EmailInput';


const SignIn = props => {

  const next_button_pressed = () => {

    console.log("Current information name: " + props.email +
      " code: " + props.code)

    if (props.email && props.code) {
      props.setScreen(4)
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

        <View style={styles.input}>
          <EmailInput defaultEmail={props.defaultEmail}/>
        </View>

        <View style={styles.input}>
          <Input label="4 digit passcode"
            placeholder=''
            errorStyle={{ color: 'red' }}
            errorMessage=''
            onChangeText={(entered_text) => { props.setCode(entered_text.replace(/[^0-9]/g, '')) }}
            secureTextEntry={true}
            maxLength={4}
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
    backgroundColor: "rgba(60, 80, 101, 0.5)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  input: {
    width: "80%",
    height: 100
  }
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
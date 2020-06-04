import { View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements';
import PhoneNumberInputs from './PhoneNumberInput'
import PassCodeSignup from './PassCodeSignup';
import { connect } from 'react-redux'
import React, { useEffect } from "react";
import { TextInput } from 'react-native';
import { commonStyles } from '../common/styles';
import EmailInput from './EmailInput';


const SignUp = props => {

  const next_button_pressed = () => {

    console.log("Current information name: " + props.name +
      " number: " + props.number + " code: " + props.code)

    if (props.name && props.number && props.code && props.email) {
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

        <View style={commonStyles.inputView} >
          <TextInput  
            style={commonStyles.inputText}
            placeholder="Name"
            placeholderTextColor="#003f5c"
            autoCapitalize='words'
            onChangeText={props.setName} 
            value={props.name}
            />
        </View>

        <EmailInput />

        <PhoneNumberInputs />
        <PassCodeSignup />

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
    backgroundColor: "rgba(91, 194, 231, 0.3)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  input: {
    width: "80%",
    height: 100
  },


});


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
import { View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements';
import PhoneNumberInputs from './PhoneNumberInput'
import PasscodeInput from './PassCodeInput';
import { connect } from 'react-redux'
import React, { useEffect } from "react";


const SignUp = props => {

  const next_button_pressed = () => {

    console.log("Current information name: " + props.name +
      " number: " + props.number + " code: " + props.code)

    if (props.name && props.number && props.code) {
      props.setScreen(1)
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
          <Input
            label="Name"
            placeholder='Amal Salim'
            errorStyle={{ color: 'maroon' }}
            errorMessage=''
            onChangeText={props.setName}
            value={props.name}
          />
        </View>

        <View style={styles.input}>
          <Input label="Email" placeholder='amal.salim@gmail.com'  
            errorStyle={{ color: 'maroon' }} errorMessage=''
            onChangeText={props.setName} value={props.name}
          />
        </View>

        <PhoneNumberInputs />
        <PasscodeInput />

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
    code: state.PersonalInformationReducer.code
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setName: (entered_name) => { dispatch({ type: 'SET_NAME', new_name: entered_name }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
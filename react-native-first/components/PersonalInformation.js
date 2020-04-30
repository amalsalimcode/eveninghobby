import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements';
import PhoneNumberInputs from './PhoneNumberInput'
import PasscodeInput from './PassCodeInput';

const PersonalInformation = props => {
  const [name, setName] = useState(props.curProfile["name"])
  const [number, setNumber] = useState(props.curProfile["number"])
  const [code, setCode] = useState(props.curProfile["code"])

  const next_button_pressed = () => {
    if (name && number && code) {
      console.log("both name and numbers and code are filled in")
      props.setProfile({ "name": name, "number": number, "code": code })
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
            onChangeText={setName}
            value={name}
          />
        </View>

        <PhoneNumberInputs setNumber={setNumber} number={number} />
        <PasscodeInput setCode={setCode} code={code} />

        <View style={{ padding: 20 }}>
          <Button raised
            icon={<Icon name="navigate-next" />}
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

export default PersonalInformation
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements';
import PhoneNumberInputs from './PhoneNumberInput'
import PasscodeInput from './PassCodeInput';

const PersonalInformation = props => {

  const [name, setName] = useState('')

  return (
    <View style={styles.personal_info}>
      <View style={styles.input}>
        <Input
          label="Name"
          placeholder='Amal Salim'
          errorStyle={{ color: 'maroon' }}
          errorMessage=''
        />
      </View>

      <PhoneNumberInputs />
      <PasscodeInput />

      <View style={{ padding: 20 }}>
        <Button raised
          icon={<Icon name="navigate-next" />}
          buttonStyle={{
            backgroundColor: "rgba(120, 160, 201, 0.5)",
            borderRadius: 10, height: 40, width: 40, borderRadius: 80
          }}
          onPress={props.setPersonalInfo.bind(this, 1)}
          rounded={false}
          disabled={false}
        />
      </View>
    </View>
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
    height: "12%"
  }
});

export default PersonalInformation
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PersonalInformation from './components/PersonalInformation'
import CardInfo from './components/CardInfo'
import { Input } from 'react-native-elements';
import { formatNumber } from "libphonenumber-js";
import { AsYouType, parsePhoneNumberFromString, findPhoneNumbersInText  } from 'libphonenumber-js'



export default function App() {

  /*
   * currentScreen initial value should come from
   * backend, saying whether this person is new or not
   */
  const [currentScreen, setCurrentScreen] = useState(0);
  const [formattedNumber, setFormattedNumber] = useState('')
  const [absoluteNumber, setAbsoluteNumber] = useState('')

  function on_change(data) {
    /* 
     * bug inside parsePhoneNumberFromString 
     * Happens when number is (324) and you hit backspace
     */
    if (data.length < formattedNumber.length && 
          formattedNumber.charAt(formattedNumber.length-1) == ')') {
      setFormattedNumber(data)
      return
    }

    /* "1 (789) 234-7893" */
    if (data.charAt(0) == "1" && data.length > 16 ) {
      return
    }

    /* "(789) 234-7893" */
    if (data.charAt(0) != "1" && data.length > 14) {
      return
    }    
  
    setFormattedNumber(new AsYouType('US').input(data));
  
  }

  function on_blur(data) {
    let absolute_number = formattedNumber.replace(/[^0-9]/g, '');
    if (absolute_number.length == 10 || absolute_number.length == 11) {
      setAbsoluteNumber(absolute_number)
    } else {
      console.log("phone number is not filled in")
    }
  }
  

  if (currentScreen == 0) {
    return (<PersonalInformation setPersonalInfo={setCurrentScreen} />)
  } else if (currentScreen == 1) {
    return (<CardInfo setCardInfo={setCurrentScreen} />)
  } else {
    return (
      <View>
        <Input
          placeholder='(918)-859-2034'
          errorStyle={{ color: 'red' }}
          errorMessage=''
          label='Phone number'
          color="white"
          onChangeText={on_change}
          value={formattedNumber}
          onBlur={on_blur}
        />
        <Input placeholder="test"/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  test: {
    backgroundColor: "rgba(60, 80, 101, 0.5)",
  }
});
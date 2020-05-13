/*
 * Sample component code
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import { AsYouType } from 'libphonenumber-js'
import {connect} from 'react-redux' 


const PhoneNumberInputs = props => {

    const [formattedNumber, setFormattedNumber] = useState('')

    /*
     * If the user clicked next and then previous,
     * show them the data that was filled in
     */
    useEffect(() => {
        setFormattedNumber(new AsYouType('US').input(props.number));
      }, []);

    function on_change(data) {
        /* 
         * bug inside parsePhoneNumberFromString 
         * Happens when number is (324) and you hit backspace
         */
        if (data.length < formattedNumber.length &&
            formattedNumber.charAt(formattedNumber.length - 1) == ')') {
            setFormattedNumber(data)
            return
        }

        /* "1 (789) 234-7893" */
        if (data.charAt(0) == "1" && data.length > 16) {
            return
        }

        /* "(789) 234-7893" */
        if (data.charAt(0) != "1" && data.length > 14) {
            return
        }

        setFormattedNumber(new AsYouType('US').input(data));

    }

    function on_blur() {
        let absolute_number = formattedNumber.replace(/[^0-9]/g, '');
        if (absolute_number.length == 10 || absolute_number.length == 11) {
            props.setNumber(absolute_number)
        } else {
            props.setNumber("")
        }
    }

    return (
        <View style={styles.input}>
            <Input
                placeholder='(918)-859-2034'
                errorStyle={{ color: 'red' }}
                errorMessage=''
                label='Phone number'
                color="white"
                onChangeText={on_change}
                value={formattedNumber}
                onBlur={on_blur}
                keyboardType="phone-pad"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "80%",
        height: 100
    },
});



function mapStateToProps(state){
    return {
      number: state.PersonalInformationReducer.number
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      setNumber: (entered_number) => {dispatch({type: 'SET_NUMBER', new_number: entered_number})}
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberInputs)
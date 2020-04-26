/*
 * Sample component code
 */

import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native'
import {Input} from 'react-native-elements'
import { AsYouType } from 'libphonenumber-js'


const PhoneNumberInputs = props => {

    const [formattedNumber, setFormattedNumber] = useState('')
    const [absoluteNumber, setAbsoluteNumber] = useState('')

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

    function on_blur(data) {
        let absolute_number = formattedNumber.replace(/[^0-9]/g, '');
        if (absolute_number.length == 10 || absolute_number.length == 11) {
            setAbsoluteNumber(absolute_number)
        } else {
            console.log("phone number is not filled in")
        }
        console.log("hi amal")
        console.log(absoluteNumber)
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
            />
        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        width: "80%",
        height: "12%"
    },
});

export default PhoneNumberInputs
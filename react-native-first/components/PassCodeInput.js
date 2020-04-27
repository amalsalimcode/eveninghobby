import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'


const PasscodeInput = props => {

    const [passCode, setPassCode] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const enterPassHandler = (entered_text) => {
        setPassCode(entered_text.replace(/[^0-9]/g, ''));
        props.setCode('')
    }

    const reEnterPassHandler = (entered_text) => {
        setErrorMsg("")
        if (entered_text.length >= passCode.length && 
            entered_text != passCode) {
            props.setCode('')
                setErrorMsg("The passcodes don't match")
        } else {
            props.setCode(entered_text)
        }
    }

    return (
        <>
            <View style={styles.input}>
                <Input
                    label="4 digit passcode"
                    placeholder='4082'
                    errorStyle={{ color: 'red' }}
                    errorMessage=''
                    onChangeText={enterPassHandler}
                    secureTextEntry={true}
                    value={passCode}
                    maxLength={4}
                />
            </View>
            <View style={styles.input}>
                <Input
                    label="Re-enter passcode"
                    placeholder='4082'
                    errorStyle={{ color: 'red' }}
                    errorMessage={setErrorMsg}
                    onChangeText={reEnterPassHandler}
                    secureTextEntry={true}
                    errorStyle={{ color: 'maroon' }}
                    errorMessage={errorMsg}
                />
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    input: {
        width: "80%",
        height: 100
    },
    inputs: {
    }
});

export default PasscodeInput

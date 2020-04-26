import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'


const PasscodeInput = props => {

    const [passCode, setPassCode] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const enterPassHandler = (entered_text) => {
        if (entered_text.length > 4) {
            return
        }
        setPassCode(entered_text);
    }

    const reEnterPassHandler = (entered_text) => {
        setErrorMsg("")
        if (entered_text.length >= 4 && 
            entered_text != passCode) {
                setErrorMsg("The passcodes don't match")
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
        height: "12%"
    },
    inputs: {
    }
});

export default PasscodeInput

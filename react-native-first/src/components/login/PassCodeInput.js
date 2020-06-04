import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Input } from 'react-native-elements'
import { commonStyles } from '../common/styles'
import { connect } from 'react-redux'


const PasscodeInput = props => {

    const [passCode, setPassCode] = useState('')
    const [reEnterPassCode, setReEnterPassCode] = useState('')
    const [reEnterLabel, setReEnterLabel] = useState('Re-enter passcode')
    const [errWidth, setErrWidth] = useState(0)

    /*
     * If the user clicked next and then previous,
     * show them the data that was filled in
     */
    useEffect(() => {
        props.setCode("")
    }, []);

    const enterPassHandler = (entered_text) => {
        setPassCode(entered_text.replace(/[^0-9]/g, ''));
        props.setCode("")
    }

    const reEnterPassHandler = (entered_text) => {
        setReEnterPassCode(entered_text)
        if (entered_text.length >= passCode.length &&
            entered_text != passCode) {
            setErrWidth(2)
            props.setCode("")
            setReEnterPassCode("")
            setReEnterLabel("Try Again: passcodes didn't match")
        }

        if (entered_text == passCode) {
            props.setCode(entered_text)
            setErrWidth(0)
        }
    }

    return (
        <>
        
            <View style={commonStyles.inputView} >
                <TextInput
                    style={commonStyles.inputText}
                    placeholder="4 digit passcode"
                    placeholderTextColor="#003f5c"
                    onChangeText={enterPassHandler}
                    value={passCode}
                    maxLength={4}
                    secureTextEntry={true}
                    keyboardType="number-pad"
                />
            </View>
            <View style={{...commonStyles.inputView, borderColor: "red", borderWidth: errWidth}} >
                <TextInput
                    style={commonStyles.inputText}
                    placeholder={reEnterLabel}
                    placeholderTextColor="#003f5c"
                    onChangeText={reEnterPassHandler}
                    value={reEnterPassCode}
                    secureTextEntry={true}
                    keyboardType="number-pad"
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

function mapStateToProps(state) {
    return {
        code: state.PersonalInformationReducer.code,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCode: (entered_code) => { dispatch({ type: 'SET_CODE', new_code: entered_code }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasscodeInput)
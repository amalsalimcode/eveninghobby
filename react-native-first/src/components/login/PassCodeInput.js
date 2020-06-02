import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import { connect } from 'react-redux' 


const PasscodeInput = props => {

    const [passCode, setPassCode] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

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
        setErrorMsg("")
        if (entered_text.length >= passCode.length && 
            entered_text != passCode) {
            props.setCode("")
            setErrorMsg("The passcodes don't match")
        }

        if (entered_text == passCode) {
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
                    keyboardType="number-pad"
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

function mapStateToProps(state){
    return {
      code: state.PersonalInformationReducer.code,
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      setCode: (entered_code) => {dispatch({type: 'SET_CODE', new_code: entered_code})}
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PasscodeInput)
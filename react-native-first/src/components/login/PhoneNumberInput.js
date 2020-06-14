import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native'
import { Input } from 'react-native-elements'
import { AsYouType } from 'libphonenumber-js'
import { connect } from 'react-redux'
import { commonStyles, theme } from '../common/styles';


const PhoneNumberInputs = props => {

    const [formattedNumber, setFormattedNumber] = useState('')

    /*
     * If the user clicked next and then previous,
     * show them the data that was filled in
     */
    useEffect(() => {
        setFormattedNumber(new AsYouType('US').input(props.number));
    }, []);

    function onChange(data) {
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

    function onBlur() {
        let absolute_number = formattedNumber.replace(/[^0-9]/g, '');
        if (absolute_number.length == 10 || absolute_number.length == 11) {
            props.setNumber(absolute_number)
        } else {
            props.setNumber("")
        }
    }

    return (

        <>
            <View style={{
                ...commonStyles.inputView, flexDirection: "row",
                paddingLeft: 15, borderColor: "red"
            }} >

                <Image style={{ marginRight: 10, marginTop: 10, height: 30, width: 20 }} source={require('../../../assets/mobile.png')} />

                <TextInput
                    style={{ ...commonStyles.inputText, flex: 1 }}
                    placeholder="Phone Number"
                    onChangeText={onChange}
                    value={formattedNumber}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                    placeholderTextColor={theme.placeholderText}
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
});



function mapStateToProps(state) {
    return {
        number: state.PersonalInformationReducer.number
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setNumber: (entered_number) => { dispatch({ type: 'SET_NUMBER', new_number: entered_number }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberInputs)
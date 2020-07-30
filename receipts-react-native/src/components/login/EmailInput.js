import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { View, TextInput, Image } from 'react-native';
import { commonStyles, theme } from '../common/styles'


const EmailInput = props => {

    const [errorWidth, setErrorWidth] = useState('')
    const [tmpEmail, setTmpEmail] = useState(props.email)

    /*
     * If the user clicked next and then previous,
     * show them the data that was filled in
     */
    useEffect(() => {
    }, []);

    const validateEmailHandler = () => {
        console.log("validating email")
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(tmpEmail)) {
            props.setEmail(tmpEmail)
            setErrorWidth(0)
        } else {
            props.setEmail("")
            setErrorWidth(2)
        }
    }

    return (
        <View style={{
            ...commonStyles.inputView, flexDirection: "row",
            paddingLeft: 15, borderColor: "red", borderWidth: errorWidth
        }} >

            <Image style={{ marginRight: 10, marginTop: 15, height: 20, width: 20 }} source={require('../../../assets/email.png')} />

            <TextInput
                style={{ ...commonStyles.inputText, flex: 1 }}
                placeholder="Email"
                placeholderTextColor={theme.placeholderText}
                onChangeText={(entered_text) => { setTmpEmail(entered_text) }}
                value={props.name}
                autoCorrect={false}
                autoCapitalize='none'
                onBlur={validateEmailHandler}
            />

        </View>
    )

}

function mapStateToProps(state) {
    return {
        email: state.PersonalInformationReducer.email,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setEmail: (email) => { dispatch({ type: 'SET_EMAIL', new_email: email }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailInput)
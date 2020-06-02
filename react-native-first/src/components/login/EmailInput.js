import React, { useState, useEffect } from 'react';
import { Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { View } from 'react-native';
import { commonStyles } from '../common/styles'


const EmailInput = props => {

    const [errorMsg, setErrorMsg] = useState('')
    const [tmpEmail, setTmpEmail] = useState(props.email)

    /*
     * If the user clicked next and then previous,
     * show them the data that was filled in
     */
    useEffect(() => {
    }, []);


    const validateEmailHandler = () => {
        setErrorMsg("")
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(tmpEmail)) {
            props.setEmail(tmpEmail)
        } else {
            setErrorMsg("Bad Email")
            props.setEmail("")
        }
    }

    return (
        <View style={commonStyles.input}>
            <Input
                label="Email"
                placeholder={props.email}
                errorStyle={{ color: 'red' }}
                errorMessage={setErrorMsg}
                value={tmpEmail}
                onChangeText={(entered_text) => { setTmpEmail(entered_text) }}
                errorStyle={{ color: 'maroon' }}
                errorMessage={errorMsg}
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
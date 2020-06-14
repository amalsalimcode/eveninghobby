import SignIn from './SignIn';
import SignUp from './SignUp';
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';


const AuthScreen = props => {

    const [curScreen, setCurScreen] = useState(1)

    async function login() {
        // await AsyncStorage.setItem("email", "amal.salim@gmail.com")
        var email = await AsyncStorage.getItem("email")
        if (email) {
            props.setEmail(email)
            setCurScreen(0)
        }
    }

    useEffect(() => {
        login()
    }, [])

    function get_current_screen() {
        switch (curScreen) {
            case 0:
                return (props.navigation.navigate("SignIn"))
            default:
                return (props.navigation.navigate("SignUp"))
        }
    }

    return (
        <>
            {get_current_screen()}
        </>
    )
}

function mapStateToProps(state) {
    return {
        // curScreen: state.ScreenReducer.curScreen,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setEmail: (email) => { dispatch({ type: 'SET_EMAIL', new_email: email}) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)
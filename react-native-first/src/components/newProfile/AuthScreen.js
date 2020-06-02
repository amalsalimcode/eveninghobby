import React, { useState, useEffect } from 'react'
import SignIn from './SignIn';
import SignUp from './SignUp';
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native';


const AuthScreen = props => {

    const [curScreen, setCurScreen] = useState(1)


    async function login() {
        // await AsyncStorage.setItem("email","amal.salim@gmail.com")
        var email = await AsyncStorage.getItem("emails")
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
                return (<SignIn />)
            default:
                return (<SignUp/>)
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
        setScreen: (data) => dispatch({ type: "SET_SCREEN", data: data }),
        setEmail: (email) => { dispatch({ type: 'SET_EMAIL', new_email: email}) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)
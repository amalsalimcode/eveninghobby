import React, { useState, useEffect } from 'react';
import { Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { View, TextInput, Image } from 'react-native';
import { commonStyles } from '../common/styles'


const NameInput = props => {

    /*
     * If the user clicked next and then previous,
     * show them the data that was filled in
     */
    useEffect(() => {
    }, []);

    return (
        <>
            <View style={{
                ...commonStyles.inputView, flexDirection: "row",
                paddingLeft: 13, borderColor: "red"
            }} >

                <Image style={{ marginRight: 7, marginTop: 13, height: 25, width: 25 }} source={require('../../../assets/user.png')} />

                <TextInput
                    style={{ ...commonStyles.inputText, flex: 1 }}
                    placeholder="Name"
                    placeholderTextColor="#003f5c"
                    autoCapitalize='words'
                    onChangeText={props.setName}
                    value={props.name}
                />

            </View>
        </>
    )

}

function mapStateToProps(state) {
    return {
        name: state.PersonalInformationReducer.name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setName: (name) => { dispatch({ type: 'SET_NAME', new_name: name }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameInput)
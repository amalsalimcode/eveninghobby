import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Button, Keyboard, Switch } from 'react-native';
import ViewSlider from 'react-native-view-slider'
import constants, { uuidv4 } from '../../../common/constants';
import { ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import SemiCircleTemplate from './SemiCircleTemplate';
import { connect } from 'react-redux';
import { theme } from '../../../common/styles';
import { commonStyles } from '../../../common/styles'
import SingleDataTemplate from '../SingleDataTemplate';
import GradientBackground from '../../../common/GradientBackground';


const RestrictedPerson = props => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledReceipt, setIsEnabledReceipt] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitchReceipt = () => setIsEnabledReceipt(previousState => !previousState);

    // change as needed to test
    const createView = props.create ? true : true 

    const getAvatarPath = () => {
        return require('../../../../../assets/restricted-avatar.png')
    }

    const deleteAccount = (idx) => {
        var request_body = JSON.stringify({
            "accountId": props.accountDetails[idx]["accountId"]
        })

        fetch('http://127.0.0.1:8000/person/delete', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: request_body
        }).then((response) => { props.renderAccountsAgain() });
    }

    return (
        < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SemiCircleTemplate>
                    <Image style={styles.logo} source={getAvatarPath()} />

                    <View style={{
                        flexDirection: "row", height: 50, width: 150,
                        paddingLeft: 13, borderWidth: 1,
                        borderRadius: 45,
                        height: 30,
                        marginBottom: 20,
                        justifyContent: "center",
                        paddingLeft: 20,
                        marginTop: 10
                    }} >

                        <TextInput
                            style={{ flex: 1 }}
                            placeholder="Name"
                            autoCapitalize='words'
                            onChangeText={props.setName}
                            value={props.name}
                            placeholderTextColor={theme.placeholderText}
                        />

                    </View>

                </SemiCircleTemplate>

                <View style={{ alignItems: "center", marginHorizontal: 30 }}>
                    <View style={{ marginTop: 20, alignItems: "center" }}>
                        <View style={{
                            borderRadius: 45, marginBottom: 20, justifyContent: "center",
                            flexDirection: "row", height: 40, paddingLeft: 15, borderColor: "black", borderWidth: 1
                        }} >
                            <Image style={{ marginRight: 10, marginTop: 7, height: 20, width: 20 }} source={require('../../../../../assets/lock.png')} />
                            <TextInput
                                style={{ ...commonStyles.inputText, flex: 1, height: 40 }}
                                placeholder={props.placeholder ? props.placeholder : "username"}
                                onChangeText={() => { }}
                                value={props.value ? props.value : props.code}
                                placeholderTextColor={theme.placeholderText}
                                secureTextEntry={true}
                                blurOnSubmit={false}
                                onSubmitEditing={() => Keyboard.dismiss()}
                            />
                        </View>

                        <View style={{
                            borderRadius: 45, marginBottom: 10, justifyContent: "center",
                            flexDirection: "row", height: 40, paddingLeft: 15, borderColor: "black", borderWidth: 1
                        }} >
                            <Image style={{ marginRight: 10, marginTop: 7, height: 20, width: 20 }} source={require('../../../../../assets/lock.png')} />
                            <TextInput
                                style={{ ...commonStyles.inputText, flex: 1, height: 40 }}
                                placeholder={props.placeholder ? props.placeholder : "password"}
                                onChangeText={() => { }}
                                value={props.value ? props.value : props.code}
                                placeholderTextColor={theme.placeholderText}
                                secureTextEntry={true}
                                blurOnSubmit={false}
                                onSubmitEditing={() => Keyboard.dismiss()}
                            />
                        </View>
                        <Text style={{ fontSize: 10 }}>*Credentials for VISA credit card</Text>
                    </View>
                </View>

                <View style={{ borderWidth: 0.5, marginHorizontal: 10, paddingVertical: 20, borderRadius: 10, marginTop: 35 }}>
                    <View style={{ height: 25, flexDirection: "row", marginHorizontal: 35, justifyContent: "space-between" }}>
                        <View style={{ justifyContent: "center" }}>
                            <Text>Expense allowed per week</Text>
                        </View>
                        <TextInput
                            style={{ borderWidth: 1, borderRadius: 20, height: 25, width: 100, paddingLeft: 10 }}
                            placeholder={props.placeholder ? props.placeholder : "$"}
                            onChangeText={() => { }}
                            value={props.value ? props.value : props.code}
                            placeholderTextColor={theme.placeholderText}
                            keyboardType="decimal-pad"
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                    </View>

                    <View style={{ marginTop: 10, height: 25, flexDirection: "row", marginHorizontal: 35, justifyContent: "space-between" }}>
                        <View style={{ justifyContent: "center" }}>
                            <Text>ATM limit per week</Text>
                        </View>
                        <TextInput
                            style={{ borderWidth: 1, borderRadius: 20, height: 25, width: 100, paddingLeft: 10 }}
                            placeholder={props.placeholder ? props.placeholder : "$"}
                            onChangeText={() => { }}
                            value={props.value ? props.value : props.code}
                            placeholderTextColor={theme.placeholderText}
                            keyboardType="decimal-pad"
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                    </View>
                    <View style={{ marginTop: 10, flexDirection: "row", marginHorizontal: 35, justifyContent: "space-between", alignContent: "center" }}>
                        <View style={{ justifyContent: "center" }}>
                            <Text>Suspend Card</Text>
                        </View>
                        <Switch
                            trackColor={{ false: "black", true: "green" }}
                            thumbColor={isEnabled ? "#1e4620" : "grey"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], marginRight: 20 }}
                        />
                    </View>
                    <View style={{ marginTop: 10, flexDirection: "row", marginHorizontal: 35, justifyContent: "space-between", alignContent: "center" }}>
                        <View style={{ justifyContent: "center" }}>
                            <Text>Disable card if receipts are not</Text>
                            <Text>uploaded</Text>
                        </View>
                        <Switch
                            trackColor={{ false: "black", true: "green" }}
                            thumbColor={isEnabledReceipt ? "#1e4620" : "grey"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchReceipt}
                            value={isEnabledReceipt}
                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], marginRight: 20 }}
                        />
                    </View>
                    {createView ? <></> : 
                        <View style={{ marginTop: 30 }}>
                            <SingleDataTemplate onClick={() => { props.navigation.navigate("AddAccount") }} containerStyle={{ ...styles.newAccountContainer, width: 300 }} enableExpand={false} key={uuidv4()}>
                                <Text style={{ color: "white" }}>Update</Text>
                            </SingleDataTemplate>
                        </View>}
                </View>

                <View style={{ marginTop: 200 }}>
                    <SingleDataTemplate onClick={() => { props.navigation.navigate("AddAccount") }} containerStyle={{ ...styles.newAccountContainer, width: 300 }} enableExpand={false} key={uuidv4()}>
                        {createView ?
                            <Text style={{ color: "white" }}>Create</Text> :
                            <Text style={{ color: "white" }}>Delete Account</Text>}
                    </SingleDataTemplate>
                </View>

            </TouchableWithoutFeedback>
        </ GradientBackground>

    )
}

var styles = StyleSheet.create({
    test: {
        backgroundColor: "red"
    },
    logo: {
        width: 70,
        height: 70,
        marginTop: 20
    },
    avatar: {
    },
    container: {
        marginTop: 2,
        marginBottom: 2,
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
        borderWidth: 0.3,
        borderRadius: 10,
        shadowColor: "black",
        width: "95%",
        shadowOpacity: 0.1,
        shadowRadius: 40,
        marginBottom: 10,
        height: 50
    },
    newAccountContainer: {
        alignItems: "center",
        backgroundColor: theme.primary,
        borderRadius: 10

    }
});

function mapStateToProps(state) {
    return {
        email: state.PersonalInformationReducer.email,
        peopleInfo: state.PersonReducer.people
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestrictedPerson)
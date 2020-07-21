import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Button } from 'react-native';
import ViewSlider from 'react-native-view-slider'
import constants, { uuidv4 } from '../../../common/constants';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SemiCircleTemplate from './SemiCircleTemplate';
import { connect } from 'react-redux';
import { theme } from '../../../common/styles';
import SingleAccount from '../SingleAccount';
import { Entypo } from '@expo/vector-icons';
import SingleDataTemplate from '../SingleDataTemplate';
import GradientBackground from '../../../common/GradientBackground';

const Person = props => {

    const getAvatarPath = (fileId) => {
        switch (fileId) {
            case "avatar-green":
                return require('../../../../../assets/avatar-green.png')
            case "avatar-pink":
                return require('../../../../../assets/avatar-pink.png')
            default:
                return
        }
    }

    const deleteAccount = (idx) => {
        var request_body = JSON.stringify({
            "accountId": props.accountDetails[idx]["accountId"]
        })

        fetch('http://127.0.0.1:8000/account/delete', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: request_body
        }).then((response) => { props.renderAccountsAgain() });
    }

    let personInfo = props.peopleInfo[props.personEmail]
    const retrieveAccounts = () => {
        let accounts = []
        for (let idx = 0; idx < props.accountDetails.length; idx++) {
            accounts.push(
                <SingleAccount onClick={() => { deleteAccount(idx) }} data={props.accountDetails[idx]} showExpense={false} key={uuidv4()} highlightBorder={false} >
                    {props.allowAddAccount ?
                        <Entypo style={{ marginTop: 5 }} name="circle-with-cross" size={24} color="brown" /> :
                        <></>
                    }
                </SingleAccount>
            )
        }
        return accounts
    }

    return (
        < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
            <View>
                <SemiCircleTemplate>
                    <Image style={styles.logo} source={getAvatarPath(personInfo.avatarFileName)} />
                    <Text style={{ marginTop: 10, color: "white" }}>{personInfo.name}</Text>
                </SemiCircleTemplate>
                <ScrollView contentContainerStyle={{ marginTop: 20 }}>
                    {retrieveAccounts()}
                    {props.allowAddAccount ?
                        <>
                            <SingleDataTemplate onClick={() => { props.navigation.navigate("AddAccount") }} containerStyle={styles.newAccountContainer} enableExpand={false} key={uuidv4()}>
                                <Text style={{ color: "white" }}>Click here to add account</Text>
                            </SingleDataTemplate>
                            <View style={{ height: 300 }} />
                        </>
                        : <></>
                    }
                    <View style={{ height: 50 }} />
                </ScrollView>
            </View>
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
        accountInfo: state.AccountsReducer.accountInfo,
        peopleInfo: state.PersonReducer.people
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person)
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import constants, { uuidv4 } from "../../../common/constants";
import Person from "./Person";
import ManagePeopleBottomToolbar from "./ManagePeopleBottomToolbar";
import { View, ActivityIndicator } from "react-native";
import RestrictedPerson from "./RestrictedPerson";
import GradientBackground from "../../../common/GradientBackground";
import { theme } from "../../../common/styles";

const ManagePeople = props => {

    const [accountInfo, setAccountInfo] = useState('');
    const [renderAccounts, requestRenderAccounts] = useState(1);

    useEffect(() => {

        var email = props.email ? props.email : "amal.salim@gmail.com"
        var request_body = JSON.stringify({
            "email": email
        })

        fetch('http://127.0.0.1:8000/account/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: request_body
        }).then((response) => response.json())
            .then((json) => { setAccountInfo(json) });
    }, [renderAccounts]);

    const renderAccountsAgain = () => {
        requestRenderAccounts(renderAccounts * -1)
    }

    const [viewScroller, setViewScroller] = useState(null)

    var accountPerPerson = {}
    for (let idx = 0; idx < accountInfo.length; idx++) {
        let curEmail = accountInfo[idx]["email"]
        if (!(curEmail in accountPerPerson)) {
            accountPerPerson[curEmail] = []
        }
        accountPerPerson[curEmail].push(accountInfo[idx])
    }

    var accountsView = []

    // first put in the signed in user
    var account = props.email in accountPerPerson ? accountPerPerson[props.email] : []
    accountsView.push(<Person personEmail={props.email} accountDetails={account} allowAddAccount={true} key={uuidv4()} renderAccountsAgain={renderAccountsAgain} {...props} />)

    for (email in accountPerPerson) {
        if (email == props.email) {
            continue
        }
        if (accountPerPerson[email]["restricted"]) {
            accountsView.push(<RestrictedPerson personEmail={email} accountDetails={accountPerPerson[email]} key={uuidv4()} {...props} />)
        } else {
            accountsView.push(<Person personEmail={email} accountDetails={accountPerPerson[email]} key={uuidv4()} {...props} />)
        }
    }

    // Now put in restricted people
    if (!accountInfo) {
        return (
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <View style={{ height: 150, justifyContent: "center", alignContent: "center" }}>
                    <ActivityIndicator />
                </View>
            </ GradientBackground>
        )
    } else {
        return (
            <>
                <ScrollView scrollEnabled={false} contentContainerStyle={{ height: constants.windowHeight - 50 }} horizontal={true} ref={(node) => setViewScroller(node)} >
                    {accountsView}
                </ScrollView>
                <ManagePeopleBottomToolbar scroller={viewScroller} maxScrollCount={accountsView.length} {...props} />
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        email: state.PersonalInformationReducer.email,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePeople)

import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import SemiCircleTemplate from "./SemiCircleTemplate";
import { Text, Button, View } from "react-native";
import constants, { uuidv4 } from "../../../common/constants";
import Person from "./Person";

const ManagePeople = props => {

    useEffect(() => {
    }, []);


    var accountPerPerson = {}
    for (let idx = 0; idx < props.accountInfo.length; idx++) {
        let email = props.accountInfo[idx]["email"]
        if (!(email in accountPerPerson)) {
            accountPerPerson[email] = []
        }
        accountPerPerson[email].push(props.accountInfo[idx])
    }

    var accountsView = []

    // first put in the signed in user
    accountsView.push(<Person accountDetails={accountPerPerson[props.email]} key={uuidv4()} />)
    accountsView.push(<Person accountDetails={accountPerPerson[props.email]} key={uuidv4()} />)

    for (email in accountPerPerson) {
        if (email == props.email) {
            continue
        }
        accountsView.push(<Person accountDetails={accountPerPerson[props.email]} key={uuidv4()} />)
    }

    console.log("accounts so far", accountsView.length)
    return (
        <>
            <ScrollView horizontal={true}>
                {accountsView}
            </ScrollView>
        </>
    )

    let scroller = null
    return (
        <>
            <ScrollView horizontal={true} ref={(node) => scroller = node}>
                <View style={{ width: constants.windowWidth, flex: 1, justifyContent: "center", backgroundColor: "red" }}>
                    <Button title="press" onPress={() => { scroller.scrollTo({ x: constants.windowWidth }) }} />
                </View>
                <View style={{ width: constants.windowWidth, flex: 1, justifyContent: "center", backgroundColor: "blue" }}>
                    <Button title="press" onPress={() => { scroller.scrollTo({ x: constants.windowWidth * -1 }) }} />
                </View>
            </ScrollView>
        </>
    )

}

function mapStateToProps(state) {
    return {
        email: state.PersonalInformationReducer.email,
        accountInfo: state.AccountsReducer.accountInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePeople)

import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import constants, { uuidv4 } from "../../../common/constants";
import Person from "./Person";
import ManagePeopleBottomToolbar from "./ManagePeopleBottomToolbar";

const ManagePeople = props => {

    useEffect(() => {
    }, []);

    const [viewScroller, setViewScroller] = useState(null)

    var accountPerPerson = {}
    for (let idx = 0; idx < props.accountInfo.length; idx++) {
        let curEmail = props.accountInfo[idx]["email"]
        if (!(curEmail in accountPerPerson)) {
            accountPerPerson[curEmail] = []
        }
        accountPerPerson[curEmail].push(props.accountInfo[idx])
    }
    var accountsView = []

    // first put in the signed in user
    var account = props.email in accountPerPerson ? accountPerPerson[props.email] : []
    accountsView.push(<Person personEmail={props.email} accountDetails={account} allowAddAccount={true} key={uuidv4()} />)

    for (emailKey in accountPerPerson) {
        if (emailKey == props.email) {
            continue
        }
        accountsView.push(<Person personEmail={emailKey} accountDetails={accountPerPerson[emailKey]} key={uuidv4()} />)
    }


    let iter = 0
    return (
        <>
            <ScrollView scrollEnabled={false} contentContainerStyle={{ height: constants.windowHeight - 50 }} horizontal={true} ref={(node) => setViewScroller(node)} >
                {accountsView}
            </ScrollView>
            <ManagePeopleBottomToolbar scroller={viewScroller} maxScrollCount={accountsView.length} />
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

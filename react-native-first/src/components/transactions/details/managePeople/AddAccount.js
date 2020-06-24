import React, { useEffect } from "react";
import { View } from "react-native";
import { connect } from 'react-redux';
import { Button } from "react-native";
import { WebView } from 'react-native-webview';

const AddAccount = props => {

    useEffect(() => {
    }, []);

    var acc_create_url = 'http://127.0.0.1:8000/account/create'

    return (
        <View style={{ flex: 1 }}>
            <View style={{ margin: 80 }} />
            <WebView
                source={{
                    uri: acc_create_url, method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
                    body: 'personEmail=amal.salim@gmail.com'
                }}
                style={{ flex: 1 }}
            />
            <Button title="Click here when you are done" onPress={() => { props.navigation.goBack() }} />
            <View style={{ margin: 80 }} />
        </View>
    )
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAccount)

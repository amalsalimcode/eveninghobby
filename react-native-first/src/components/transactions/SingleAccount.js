import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import SingleDataTemplate from "./SingleDataTemplate";


const SingleAccount = props => {
    useEffect(() => {
    }, []);

    var accId = props.data["accountId"]
    var accName = props.data["accountName"]
    var acctype = props.data["accountType"]
    var inst = props.data["institution"]
    return (
            <SingleDataTemplate expandHeight={110}>
                <Text>
                    {accName}
                </Text>
                <Text></Text>
                <Text>
                    Account: {accId}
                </Text>
                <Text>
                    Account Type: {acctype}
                </Text>
                <Text>
                    Bank: {inst}
                </Text>
            </SingleDataTemplate>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});

export default SingleAccount 
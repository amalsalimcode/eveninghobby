import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import SingleDataTemplate from "../transactions/details/SingleDataTemplate";
import GradientBackground from "../common/GradientBackground";
import { theme } from "../common/styles";

const Rewards = props => {

    useEffect(() => {
    }, []);


    console.log(props.navigation)

    return (
        <GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]}>
            <View style={styles.container}>
                <SingleDataTemplate containerStyle={{borderRadius: 20}} initialHeight={245} expandHeight={245}>
                    <Text></Text>
                    <Text style={{ color: "#ff427f" }}>American Express Delta SkyMiles</Text>
                    <Text></Text>
                    <Text style={{ marginVertical: 3 }}>Next Payment Due:                         July 13, 2020</Text>
                    <Text style={{ marginVertical: 3 }}>Balance Due:                                               $2143</Text>
                    <Text style={{ marginVertical: 3 }}>Remaining Limit:                                      $12,857</Text>
                    <Text></Text>
                    <Text style={{ marginVertical: 3 }}>Points Accumulated:                                134,123</Text>
                    <Text style={{ marginVertical: 3 }}>Points Eligiblity:</Text>
                    <Text style={{ marginVertical: 3 }}>Travel: 2 points per dollar spent</Text>
                    <Text style={{ marginVertical: 3 }}>Non Travel: 1 point per dollar spent</Text>
                </SingleDataTemplate>

                <View style={{ marginVertical: 10 }}></View>

                <SingleDataTemplate containerStyle={{borderRadius: 20}} initialHeight={225} expandHeight={225}>
                    <Text></Text>
                    <Text style={{ color: "#ff427f" }}>Discover it</Text>
                    <Text></Text>
                    <Text style={{ marginVertical: 3 }}>Next Payment Due:                         July 16, 2020</Text>
                    <Text style={{ marginVertical: 3 }}>Balance Due:                                               $2143</Text>
                    <Text style={{ marginVertical: 3 }}>Remaining Limit:                                      $12,857</Text>
                    <Text></Text>
                    <Text style={{ marginVertical: 3 }}>Cashback Earned:                                      $17.23</Text>
                    <Text style={{ marginVertical: 3 }}>Points Eligiblity:                            5% on Amazon</Text>
                </SingleDataTemplate>

                <View style={{ marginVertical: 10 }}></View>

                <View style={{height: 10}}/>
                <SingleDataTemplate onClick={() => {}} containerStyle={styles.newAccountContainer} enableExpand={false} >
                    <Text style={{ color: "white" }}>Click here to add new Credit Card</Text>
                </SingleDataTemplate>

            </View>
        </GradientBackground >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newAccountContainer: {
        alignItems: "center",
        backgroundColor: theme.primary,
        borderRadius: 10

    }
});

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rewards)

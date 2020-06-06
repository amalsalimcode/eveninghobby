// In App.js in a new project

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Transactions from './transactions/Transactions';
import Rewards from './rewards/Rewards'
import Receipts from './receipts/Receipts'
import SingleDataTemplate from './transactions/details/SingleDataTemplate';
import AddAccount from './transactions/details/AddAccount'
import FadeInView from './common/FadeInView';
import GradientBackground from './common/GradientBackground';


function HomeScreen({ navigation }) {
    return (
        <GradientBackground>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FadeInView>
                    <SingleDataTemplate onClick={() => navigation.navigate('Transactions')} containerStyle={styles.newAccountContainer} disableExpand={true}>
                        <Text>Transactions</Text>
                    </SingleDataTemplate>
                    <SingleDataTemplate onClick={() => navigation.navigate('Rewards')} containerStyle={styles.newAccountContainer} disableExpand={true}>
                        <Text>Rewards</Text>
                    </SingleDataTemplate>
                </FadeInView>
            </View >
        </GradientBackground>
    );
}

const Stack = createStackNavigator();

export default function MainNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' mode="modal">
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: "", headerStyle: { backgroundColor: "red" } }} />
                <Stack.Screen name="Transactions" component={Transactions} options={{ title: "", headerStyle: { backgroundColor: "white" } }} />
                <Stack.Screen name="Rewards" component={Rewards} options={{ title: "", headerStyle: { backgroundColor: "white" } }} />
                <Stack.Screen name="Receipts" component={Receipts} options={{ title: "", headerStyle: { backgroundColor: "white" } }} />
                <Stack.Screen name="AddAccount" component={AddAccount} options={{ title: "", headerStyle: { backgroundColor: "white" } }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

var styles = StyleSheet.create({
    newAccountContainer: {
        borderRightWidth: 4,
        borderRightColor: "black",
        alignItems: "center",
        width: 200

    }
});
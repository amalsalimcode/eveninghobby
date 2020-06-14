// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Transactions from './transactions/Transactions';
import Rewards from './rewards/Rewards'
import Receipts from './receipts/Receipts'
import AddAccount from './transactions/details/AddAccount'
import AuthScreen from './login/AuthScreen';
import SignIn from './login/SignIn';
import SignUp from './login/SignUp';
import Home from './home/Home';

const Stack = createStackNavigator();

export default function MainNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' mode="modal">
                <Stack.Screen name="AuthScreen" component={AuthScreen} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Home" component={Home} options={{ title: "", headerStyle: { backgroundColor: "red" } }} />
                <Stack.Screen name="Transactions" component={Transactions} options={{ title: "", headerStyle: { backgroundColor: "white" } }} />
                <Stack.Screen name="Rewards" component={Rewards} options={{ title: "", headerStyle: { backgroundColor: "white" } }} />
                <Stack.Screen name="Receipts" component={Receipts} options={{ title: "", headerStyle: { backgroundColor: "white" } }} />
                <Stack.Screen name="AddAccount" component={AddAccount} options={{ title: "", headerStyle: { backgroundColor: "white" } }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
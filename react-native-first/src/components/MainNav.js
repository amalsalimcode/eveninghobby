// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Transactions from './transactions/Transactions';
import Rewards from './rewards/Rewards'
import Receipts from './receipts/Receipts'
import SingleReceipt from './receipts/SingleReceipt'
import AuthScreen from './login/AuthScreen';
import SignIn from './login/SignIn';
import SignUp from './login/SignUp';
import Home from './home/Home';
import Search from './transactions/Search';
import ManagePeople from './transactions/details/managePeople/ManagePeople';
import AddAccount from './transactions/details/managePeople/AddAccount';
import RestrictedPerson from './transactions/details/managePeople/RestrictedPerson';
import ShareTransactions from './transactions/details/managePeople/ShareTransactions';

const Stack = createStackNavigator();

export default function MainNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' mode="modal">
                <Stack.Screen name="AuthScreen" component={AuthScreen} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Home" component={Home} options={{ title: "", headerStyle: { backgroundColor: "red" } }} />
                <Stack.Screen name="Transactions" component={Transactions} />
                <Stack.Screen name="Rewards" component={Rewards} />
                <Stack.Screen name="Receipts" component={Receipts} />
                <Stack.Screen name="AddAccount" component={AddAccount} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="ManagePeople" component={ManagePeople} />
                <Stack.Screen name="RestrictedPerson" component={RestrictedPerson} />
                <Stack.Screen name="ShareTransactions" component={ShareTransactions} />
                <Stack.Screen name="SingleReceipt" component={SingleReceipt} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
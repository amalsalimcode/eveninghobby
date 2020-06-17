import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Transactions from './Transactions';
import MainNav from '../MainNav';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function TransactionsTab() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Transactions} />
        <Tab.Screen name="Main" component={MainNav} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
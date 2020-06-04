import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Transactions from '../transactions/Transactions';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="blue"
        inactiveColor="black"
        barStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen name="Transactions" component={Transactions} />
        <Tab.Screen name="Rewards" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Receipts from './Receipts'
import DeleteReceipt from './DeleteReceipt';
import ReceiptView from './ReceiptView'
import CaptureReceipt from './CaptureReceipt'
import UploadReceipt from './UploadReceipt'
import Search from './Search';
import AddReceipt from './AddReceipt';
import SelectorOverlay from './SetLabel';

const Stack = createStackNavigator();

export default function MainNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' mode="modal">
                <Stack.Screen name="Receipts" component={Receipts} />
                <Stack.Screen name="DeleteReceipt" component={DeleteReceipt} />
                <Stack.Screen name="ReceiptView" component={ReceiptView} />
                <Stack.Screen name="CaptureReceipt" component={CaptureReceipt} />
                <Stack.Screen name="UploadReceipt" component={UploadReceipt} />
                <Stack.Screen name="AddReceipt" component={AddReceipt} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="SelectorOverlay" component={SelectorOverlay} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
/*
 * Sample component code
 */

import React from 'react';
import { View, StyleSheet } from 'react-native'
import BarGraph from './BarGraph'
import SingleBarData from './SingleBarData'
import { ScrollView } from 'react-native-gesture-handler';
import BarData from './BarData';


const Transactions = props => {

    return (
        <ScrollView>
            <BarGraph />
            <BarData />
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    sample: {
        backgroundColor: "rgba(60, 80, 101, 0.5)",
    },
});

export default Transactions
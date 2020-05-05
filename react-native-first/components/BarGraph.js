import React from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { Dimensions } from "react-native";
import Dash from 'react-native-dash';
import Svg, { Line } from 'react-native-svg';


const screenWidth = Dimensions.get("window").width / 2;

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

function on_change(data) {
}

const BarGraph = props => {

    return (
        <>
            <View style={styles.plot_container}>
                <Dash dashColor="blue" dashGap={4} dashThickness={1} style={{ position: "absolute", paddingTop: 100, width: "100%", height: 0.5 }} />
                <View style={styles.values_container}>
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                </View>
            </View>
            <View style={styles.x_axis}>
                <Text style={styles.day}>Sat</Text>
                <Text style={styles.day}>Sun</Text>
                <Text style={styles.day}>Mon</Text>
                <Text style={styles.day}>Tue</Text>
                <Text style={styles.day}>Wed</Text>
                <Text style={styles.day}>Thu</Text>
                <Text style={styles.day}>Fri</Text>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    plot_container: {
        height: 150
    },
    values_container: {
        /* each dollar bar should be next to each other*/
        flexDirection: "row",
        /* the bar should be at the bottom where the container ends */
        alignItems: "flex-end",
        justifyContent: "center",
        /* match the height of the container*/
        height: "100%"
    },
    x_axis: {
        backgroundColor: "grey",
        height: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
    day: {
        marginHorizontal: 12
    },
    bar: {
        marginHorizontal: 20,
        backgroundColor: "brown",
        width: 10,
        height: 90,
        borderRadius: 8,
        marginBottom: 1,
    },
    lineStyle: {
        position: "absolute",
        marginTop: 80,

        height: 1,
        width: '100%',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'dotted'
    }
});

export default BarGraph
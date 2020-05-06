import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native'
import { Dimensions } from "react-native";
import Dash from 'react-native-dash';
import SingleBar from './SingleBar';

const screenWidth = Dimensions.get("window").width / 2;

// introduce animation to setHeight
// convert dashed line into setHeight
// set dashed line ending to a number that can be changed
// introduce animation to dashed line
const BarGraph = props => {

    const [height, setHeight] = useState([70, 20, 30, 50, 23, 24, 9]);

    function bar_layout(data) {
        var idx = 0;
        var bars = [];
        for (idx = 0; idx < 7; idx++) {
            bars.push(<SingleBar style={{ height: height[idx] }} />);
        }
        return (
            <>
                {bars}
            </>
        )
    }

    function x_axis_layout() {
        var days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
        var days_layout = []
        var idx = 0;
        for (idx = 0; idx < days.length; idx++) {
            days_layout.push(<Text style={styles.day}>{days[idx]}</Text>);
        }
        return (
            <>
                {days_layout}
            </>
        )
    }

    function change_bar_height() {
        var random_num = [];
        var idx = 0;
        for (idx = 0; idx < 7; idx++) {
            random_num.push((Math.random() * 100) + 1);
        }
        setHeight(random_num);
    }

    return (
        <>
            <View style={styles.plot_container}>
                <View style={{ flexDirection: "row", position: "absolute" }}>
                    <Dash dashColor="blue" dashGap={4} dashThickness={1} style={styles.dashStyle} />
                    <Text style={styles.textStyle}>Hi amalaaaaaaaaaaaaaaaaa </Text>
                </View>
                <View style={styles.values_container}>
                    {bar_layout()}
                </View>
            </View>
            <View style={styles.x_axis}>
                {x_axis_layout()}
            </View>

            <Button title="Press me" onPress={change_bar_height} />
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
    },
    dashStyle: {
        paddingTop: 50,
        width: "100%",
    },
    textStyle: {
        paddingTop: 200
    }
});

export default BarGraph
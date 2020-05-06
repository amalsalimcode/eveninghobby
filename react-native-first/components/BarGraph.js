import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Animated } from 'react-native'
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
        console.log("bar layout called")
        console.log(height)
        var idx = 0;
        var bars = []
        for (idx = 0; idx < 7; idx++) {
            bars.push(<SingleBar final_height={height[idx]} />)
        }
        console.log("hey amal")
        return (
            <>
                {bars}
            </>
        )
    }

    useEffect(() => {

        console.log("hi amal");

    });

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
        console.log("change bar height called")
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
                    <Dash dashColor="black" dashGap={4} dashThickness={1} style={styles.dashStyle} />
                    <Text style={{ marginTop: 40, opacity: 0.2, flex: 1 }}> 80</Text>
                </View>

                <View style={{ flexDirection: "row", position: "absolute" }}>
                    <Dash dashColor="black" dashGap={4} dashThickness={1} style={styles.dashStyle2} />
                    <Text style={{ marginTop: 90, opacity: 0.2, flex: 1 }}> 20</Text>
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
        /* each bar should be next to each other*/
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
    dashStyle: {
        paddingTop: 50,
        flex: 14,
        opacity: 0.2
    },
    dashStyle2: {
        paddingTop: 100,
        flex: 14,
        opacity: 0.2
    },
});

export default BarGraph
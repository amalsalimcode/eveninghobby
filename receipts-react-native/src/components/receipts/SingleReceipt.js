import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SingleReceipt = props => {

    const [borderWidth, setBorderWidth] = useState(0.7);

    useEffect(() => {
    }, []);

    return (
        <TouchableOpacity style={{...styles.square, borderWidth: borderWidth}} onPress={() => { props.navigation.navigate('ReceiptView', { 'uuid': props.value["uuid_str"] }) }} onLongPress={() =>setBorderWidth(2)}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image style={{ borderRadius: 2, height: 45, width: 30, marginLeft: 5, marginVertical: 1, resizeMode: "contain" }} source={{ uri: props.value["image_fill"] }} />
                    <Text style={{ marginLeft: 10 }}>{props.value["name"]}</Text>
                </View>
                <Text style={{}}>${props.value["amount"]}</Text>
            </View >
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "#3e424b",
        width: "95%",
        marginBottom: 8,
    },
});

export default SingleReceipt 

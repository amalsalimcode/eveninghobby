import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { commonStyles } from "./common/styles";
import { Button } from 'native-base';



const SingleCategoryAndroid = props => {

    useEffect(() => {
    }, []);

    const onPress = () => {
        props.handlePress(props.title)
    }

    return (
        <>
            <Button transparent light onPress={onPress}>
                <View style={{ ...commonStyles.singleEntryoutline, marginBottom: 0, height: 40 }}>
                    <Text>{props.title}</Text>
                </View>
            </Button>
            <View style={{marginBottom: 5}} />
        </>
    );
}

export default SingleCategoryAndroid

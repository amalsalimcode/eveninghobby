import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from "react-native";
import constants from "../common/constants";
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const UploadReceipt = props => {

    useEffect(() => {
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }

        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = photo["uri"];
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('image', { uri: image ? image : localUri, name: 'test.jpg', type: type });

        console.log(formData)

        return await fetch('http://127.0.0.1:8000/account/receipt', {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        });

    };


    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            {pickImage}
        </View>
    );
}

export default UploadReceipt

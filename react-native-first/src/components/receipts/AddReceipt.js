import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from "react-native";
import constants from "../common/constants";
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const AddReceipt = props => {

    useEffect(() => {
    }, []);

    async function takeAndUploadPhotoAsync() {
        let photo = await cam.takePictureAsync()


        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = photo["uri"];
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('image', { uri: localUri, name: 'test.jpg', type: type });

        console.log(formData)

        return await fetch('http://127.0.0.1:8000/account/receipt', {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
    }

    let cam = null
    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Camera style={{ height: constants.windowHeight - 100, width: constants.windowWidth }} type={Camera.Constants.Type.back}
                ref={camera => cam = camera}>
            </Camera>
            <Button title="Capture" onPress={takeAndUploadPhotoAsync} />
        </View>
    );
}

export default AddReceipt

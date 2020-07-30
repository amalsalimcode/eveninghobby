import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from "react-native";
import constants from "../common/constants";
import { theme } from '../common/styles';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import SingleDataTemplate from "../transactions/details/SingleDataTemplate";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const AddReceipt = props => {

    const [newImg, setNewImg] = useState(null);

    useEffect(() => {
    }, [])

    async function takeAndUploadPhotoAsync() {
        let photo = await cam.takePictureAsync()

        setNewImg(photo["uri"])

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

        return await fetch(constants.ngrokHost + 'account/receipt', {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        });

    }

    let cam = null

    if (!newImg) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Camera style={{ height: constants.windowHeight - 200, width: constants.windowWidth }} type={Camera.Constants.Type.back}
                    ref={camera => cam = camera}>
                </Camera>

                <TouchableOpacity onPress={takeAndUploadPhotoAsync} >
                    <Image style={{ marginTop: 30, height: 70, width: 70 }} source={require('../../../assets/circle.png')} />
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image style={{ height: constants.windowHeight, width: constants.windowWidth, resizeMode: "contain" }} source={{ uri: newImg }} />
            </View>
        )
    }
}

export default AddReceipt

var styles = StyleSheet.create({
    newAccountContainer: {
        alignItems: "center",
        backgroundColor: theme.primary,
        borderRadius: 10

    }
});
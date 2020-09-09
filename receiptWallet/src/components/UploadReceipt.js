import { View } from "react-native";
import React, { useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';

import {uploadNewReceipt} from './common/Backend'

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

        if (!result.cancelled) {
            setImage(result.uri);
        }

        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = photo["uri"];
        let fileId = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(fileId);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('image', { uri: image ? image : localUri, name: 'test.jpg', type: type });

        uploadNewReceipt(formData)

    };

    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            {pickImage}
        </View>
    );
}

export default UploadReceipt
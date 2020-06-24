import React, { useState, useEffect } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';

export default function ImgPicker() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);


    const takeAndUploadPhotoAsync = async () => {
        // Display the camera to the user and wait for them to take a photo or to cancel
        // the action
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (result.cancelled) {
            return;
        }

        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('photo', { uri: localUri, name: filename, type });

        return await fetch(YOUR_SERVER_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
    }


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
    };

    async function snap() {
        let photo = await cam.takePictureAsync()
        console.log("hi amal, i took a photo")
        console.log(photo)


        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = photo["uri"];
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('photo', { uri: localUri, name: filename, type });

        console.log(formData)

        return await fetch('http://127.0.0.1:8000/account/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />

            <Camera style={{ height: 300, width: 300 }} type={Camera.Constants.Type.back}
                ref={camera => cam = camera}>
            </Camera>
            <Button title="Say Cheese" onPress={snap} />

            <Button title="Take a picture" onPress={takeAndUploadPhotoAsync} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}
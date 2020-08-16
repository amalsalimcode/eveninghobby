import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import { Camera } from 'expo-camera';
import { connect } from "react-redux";
import TopToolbar from "./TopToolbar";
import { theme } from './common/styles';
import constants, { hasNotch } from "./common/constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import GradientBackground from "./common/GradientBackground";


const CaptureReceipt = props => {

    const [newImg, setNewImg] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    async function takeAndUploadPhotoAsync() {
        // let photo = await cam.takePictureAsync()
        let photo = "http://personal.psu.edu/xqz5228/jpg.jpg"

        props.navigation.navigate("AddReceipt", {
            uri: photo["uri"],
            height: photo["height"],
            width: photo["width"]
        })

    }

    let cam = null

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text style={styles.text}>No access to camera</Text>;
    }

    if (!newImg) {

        var toolbarHeight = hasNotch() ? 100 : constants.windowHeight * 0.1
        var cameraHeight = constants.windowHeight * 0.7
        var iconSpace = constants.windowHeight - toolbarHeight - cameraHeight
        var captureIconSize = constants.windowHeight * 0.1

        return (
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <TopToolbar {...props} />
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Camera style={{ height: cameraHeight, width: constants.windowWidth }}
                        type={Camera.Constants.Type.back} flashMode={Camera.Constants.FlashMode.off}
                        onCameraReady={onCameraReady} onMountError={(error) => { console.log("camera error", error) }}
                        ref={camera => cam = camera} />

                    <TouchableOpacity onPress={takeAndUploadPhotoAsync} containerStyle={{ height: iconSpace, justifyContent: "center" }} >
                        <Image resizeMode="stretch" style={{ height: captureIconSize, width: captureIconSize }} source={require('../../assets/circle.png')} />
                    </TouchableOpacity>
                </View>
            </ GradientBackground>
        );
    } else {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image style={{ height: constants.windowHeight, width: constants.windowWidth, resizeMode: "contain" }} source={{ uri: newImg }} />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addSingleReceipt: (receipt) => dispatch({ type: "ADD_SINGLE_RECEIPT", receipt: receipt })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptureReceipt)

var styles = StyleSheet.create({
    newAccountContainer: {
        alignItems: "center",
        backgroundColor: theme.primary,
        borderRadius: 10

    }
});

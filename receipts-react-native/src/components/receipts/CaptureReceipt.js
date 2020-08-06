import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from "react-native";
import constants, { hasNotch } from "../common/constants";
import { theme } from '../common/styles';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import SingleDataTemplate from "../transactions/details/SingleDataTemplate";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import GradientBackground from "../common/GradientBackground";
import TopToolbar from "./TopToolbar";

const CaptureReceipt = props => {

    const [newImg, setNewImg] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    let capturedImage = ''


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
        let photo = await cam.takePictureAsync()

        capturedImage = photo["uri"]


        props.navigation.navigate("AddReceipt", {img: capturedImage})

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
                <TopToolbar {...props}/>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Camera style={{ height: cameraHeight, width: constants.windowWidth }}
                        type={Camera.Constants.Type.back} flashMode={Camera.Constants.FlashMode.off}
                        onCameraReady={onCameraReady} onMountError={(error) => { console.log("camera error") }}
                        ref={camera => cam = camera} />

                    <TouchableOpacity onPress={takeAndUploadPhotoAsync} containerStyle={{ height: iconSpace, justifyContent: "center" }} >
                        <Image resizeMode="stretch" style={{height: captureIconSize, width: captureIconSize}} source={require('../../../assets/circle.png')} />
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
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
// import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

const Receipts = props => {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    var capturing = false;
    var flashMode = CameraFlashModes.off;
    var onCaptureIn, onCaptureOut, onLongCapture, onShortCapture;



    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    var cam = null


    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    async function snap() {
        let photo = await cam.takePictureAsync()
        console.log("hi amal, i took a photo")
        console.log(photo)
    }

    return (
        // <>
        //     <Grid style={styles.bottomToolbar}>
        //         <Row>
        //             <Col style={styles.alignCenter}>
        //                 <TouchableOpacity onPress={() => setFlashMode(
        //                     flashMode === CameraFlashModes.on ? CameraFlashModes.off : CameraFlashModes.on
        //                 )}>
        //                     {/* <Text>hello amal, here is flash</Text> */}
        //                     <Ionicons
        //                         name={flashMode == CameraFlashModes.on ? "md-flash" : 'md-flash-off'}
        //                         color="white"
        //                         size={30}
        //                     />
        //                 </TouchableOpacity>
        //             </Col>
        //             <Col size={2} style={styles.alignCenter}>
        //                 <TouchableWithoutFeedback
        //                     onPressIn={onCaptureIn}
        //                     onPressOut={onCaptureOut}
        //                     onLongPress={onLongCapture}
        //                     onPress={onShortCapture}>
        //                     <View style={[styles.captureBtn, capturing && styles.captureBtnActive]}>
        //                         {capturing && <View style={styles.captureBtnInternal} />}
        //                     </View>
        //                 </TouchableWithoutFeedback>
        //             </Col>
        //         </Row>
        //     </Grid>
        // </>

        <View style={{ height: 500 }}>
            <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}
                    ref={camera => cam = camera}>
            </Camera>
            <Button title="Say Cheese" onPress={snap}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomToolbar: {
        width: 800,
        position: 'absolute',
        height: 100,
        bottom: 0,
    },
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default Receipts

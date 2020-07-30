/*
 * All transactions to be displayed are setup and retrieved here
 */

'use strict'

import { connect } from 'react-redux'
import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { theme } from '../common/styles';
import constants, { uuidv4, getFormattedDate } from '../common/constants'
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ReceiptsBottomToolbar = props => {

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
        if (result.cancelled) {
            return
        }


        let localUri = result.uri
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('image', { uri: localUri, name: 'test.jpg', type: type });

        console.log(formData)

        return await fetch('http://127.0.0.1:8000/receipt/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        });


    };

    let iter = 0
    return (
        <>
            <View style={{ height: 55, paddingLeft: 10, backgroundColor: theme.subtlePrimary, borderTopWidth: 0.5 }} >
                <View style={{ height: 10 }} />

                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                    <TouchableOpacity onPress={() => { iter > 0 ? iter -= 1 : {}; props.scroller.scrollTo({ x: constants.windowWidth * iter }) }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <AntDesign name="search1" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Search</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.navigation.navigate('AddReceipt') }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <Feather name="camera" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Capture</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { pickImage() }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <MaterialIcons name="photo-album" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Upload</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
            {/* <View style={{ height: 10, backgroundColor: theme.subtlePrimary }} /> */}
        </>
    )
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeCurWeek: (direction) => dispatch({ type: "ADD_SUB_CUR_WEEK", direction: direction })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptsBottomToolbar)
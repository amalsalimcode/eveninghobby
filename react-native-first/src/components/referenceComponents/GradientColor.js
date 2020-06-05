import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native'

export default class GradientColor extends React.Component {
    render() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['orange', '#ff427f']}
            style={{ marginTop: 30, height: 500, width: 200, borderRadius: 200 }}>
            </LinearGradient>
        );
    }
}


var styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    }
})
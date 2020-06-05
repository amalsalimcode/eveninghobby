import React, { useEffect } from 'react';
import { Animated, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const LoginButton = (props) => {

    useEffect(() => {
    }, [])

    return (
        <View>
            <TouchableOpacity onPress={props.pressAction}>
                <LinearGradient start={{ x: 0.2, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    colors={['#ff427f', 'orange']}
                    style={{ marginTop: 30, height: 50, width: 200, borderRadius: 25 }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text>
                            {props.btnMsg}
                        </Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

export default LoginButton 


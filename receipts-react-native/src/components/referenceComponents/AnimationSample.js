import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animation from 'lottie-react-native';

import anim from '../../../assets/anim.json'

const AnimationSample = props => {
    let anim_local;
    useEffect(() => {
        anim_local.play()
    }, []);

    return (
        <View style={styles.container}>
            <Animation ref={animation => { anim_local = animation; }}
                style={{ width: 80, height: 80 }}
                loop={true}
                source={anim}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AnimationSample
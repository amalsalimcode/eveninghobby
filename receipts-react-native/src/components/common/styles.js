import { StyleSheet } from 'react-native'

export const COLORS = {
    "Wells Fargo": {
        primary: "red"
    },
    "AMEX": {
        primary: "blue"
    },
    "Chase": {
        primary: "olive"
    }
}

const colorPallette = {
    "zima": {
        primary: "#003f5c",
        secondary: "#191919",
        inputText: "#003f5c",
        placeholderText: "#003f5c",
        inputBg: "grey",
        vibrantPrimary: "#ff427f",
        vibrantSecondary: "orange",
        subtlePrimary: "white",
        subleSecondary: "#e5f7ff"
    },
    "grey": {
        primary: "#424242",
        secondary: "#191919",
        inputText: "#17181B",
        placeholderText: "#17181B",
        inputBg: "white",
        vibrantPrimary: "#ff427f",
        vibrantSecondary: "orange",
        subtlePrimary: "#bdbdbd",
        subleSecondary: "#fffaf0"
    }
}
export const theme = colorPallette["grey"]


export const commonStyles = StyleSheet.create({
    input: {
        width: "80%",
        height: 100
    },
    inputView: {
        width: "80%",
        backgroundColor: theme.inputBg,
        borderRadius: 45,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        paddingLeft: 20,
    },
    inputText: {
        height: 50,
        fontSize: 16,
    },
    authScreen: {
        flex: 1,
        backgroundColor: "black",
        backgroundColor: "grey",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    overlayStyle: {
        backgroundColor: theme.subtlePrimary,
        borderWidth: 0.5,
        borderRadius: 12
    },
});
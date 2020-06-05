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

export const colorPallette = {
    background: "#4d4d4d"
}

export const commonStyles = StyleSheet.create({
    input: {
        width: "80%",
        height: 100
    },
    inputView: {
        width: "80%",
        backgroundColor: "grey",
        borderRadius: 45,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        paddingLeft: 20,
    },
    inputText: {
        height: 50,
        fontSize: 16,
        color: "#ff427f",
    },
    authScreen: {
        flex: 1,
        backgroundColor: "black",
        backgroundColor: "grey",
        justifyContent: "flex-start",
        alignItems: "center",
    },
});
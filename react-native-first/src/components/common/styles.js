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

export const commonStyles = StyleSheet.create({
    input: {
        width: "80%",
        height: 100
    },
    inputView: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 45,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        paddingLeft: 20,
    },
    inputText: {
        height: 50,
        fontSize: 16,
        color: "#ff427f"
    }
});
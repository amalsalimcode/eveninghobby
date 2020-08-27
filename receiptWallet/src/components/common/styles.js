import { StyleSheet } from 'react-native'
import constants from './constants';

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
    singleEntryoutline: {
        alignSelf: "center",
        borderColor: "#3e424b",
        marginBottom: 8,
        padding: 10,
        width: constants.windowWidth * 0.65,
        borderWidth: 0.7,
        marginHorizontal: 5,
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
        borderRadius: 12,
        width: "90%"
    },
    textInput: {
        height: 35,
        borderColor: "#000000",
        borderBottomWidth: 1,
    },
    button: {
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderColor: "#3e424b",
        shadowOpacity: 0.1,
        shadowColor: "black",
        shadowRadius: 40,
        shadowOffset: { height: 2, width: 2 },
        backgroundColor: theme.primary,
        borderRadius: 40,
        height: 30
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },


    conversationContainer:{
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        borderWidth: 1
    },
    actionButtonsContainer:{
        flex:1,
        flexDirection: 'row',
        paddingTop: 10,
        flexWrap: 'wrap',
      },
      actionButton:{
        backgroundColor:"grey",
        borderRadius:30,
        padding: 7,
        marginRight: 10,
        marginBottom: 10,
      },
      actionButtonText:{
        color:'white',
        fontSize:12,
        alignSelf: 'center'
      },

});
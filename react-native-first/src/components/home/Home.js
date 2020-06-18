import React from 'react'
import { connect } from 'react-redux'
import { Text, Keyboard, View, StyleSheet, Image } from 'react-native';
import GradientBackground from '../common/GradientBackground';
import { theme } from '../common/styles';
import FadeInView from '../common/FadeInView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GradientBorder from '../common/GradientBorder';
import constants from '../common/constants';
import CardFlip from 'react-native-card-flip';


const Home = props => {

    var mainCard;

    Keyboard.dismiss()
    return (
        < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
            <FadeInView>
                <View style={{ marginTop: 150, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("Transactions") }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.visit}>Transactions</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("Rewards") }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.visit}>Rewards</Text>
                        </View>
                    </TouchableOpacity>
                    <CardFlip style={{ height: 200, width: constants.windowWidth - 50 }} ref={(card) => mainCard = card} >
                        <TouchableOpacity style={{ }} onPress={() => mainCard.flip()}>
                            <Image style={{...styles.adSpaceContainer, borderWidth: 0}} source={require('../../../assets/philz.jpg')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.adSpaceContainer, backgroundColor: "blue" }} onPress={() => mainCard.flip()}>
                            <Image style={{...styles.adSpaceContainer, borderWidth: 0}} source={require('../../../assets/barCode.jpg')} />
                        </TouchableOpacity>
                    </CardFlip>
                </View>
            </FadeInView>
        </ GradientBackground >
    );
}

function mapStateToProps(state) {
    return {
        curScreen: state.ScreenReducer.curScreen,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setScreen: (data) => dispatch({ type: "SET_SCREEN", data: data })
    }
}

var styles = StyleSheet.create({
    newAccountContainer: {
        borderRightWidth: 4,
        borderRightColor: "black",
        alignItems: "center",
        width: 200
    },
    adSpaceContainer: {
        height: 200,
        width: constants.windowWidth - 50,
        borderRadius: 40,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    circleGradient: {
        backgroundColor: "white",
        margin: 2,
    },
    visit: {
        // fontWeight: '300',
        fontSize: 16,
        color: "black",
        marginBottom: 3

    },
    textContainer: {
        borderBottomWidth: 2,
        marginBottom: 50,
        width: constants.windowWidth - 50
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
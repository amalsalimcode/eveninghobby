import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native'
import { Button, Overlay } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux'

const Settings = props => {

  useEffect(() => {


    // get curr date
    fetch('http://127.0.0.1:8000/account/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": "GU2wb2YOboJF6V9B",
      })
    }).then((response) => response.json())
      .then((json) => props.setAccountInfo(json));
  }, [])


  console.log("hi amal, here is account info", props.accountInfo)
  
  return (
    <Overlay isVisible={props.isVisible} onBackdropPress={props.toggleVisibility} overlayStyle={styles.overlay}>

      {props.isWellsVisible ?
        <Button title="Wells Fargo"
          ViewComponent={LinearGradient} // Don't forget this!
          onPress={props.toggleWells}
          buttonStyle={{ marginTop: 10, width: 120, height: 60 }}
          linearGradientProps={{
            colors: ['red', 'red'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />
        :
        <Button title="Wells Fargo"
          ViewComponent={LinearGradient} // Don't forget this!
          onPress={props.toggleWells}
          buttonStyle={{ marginTop: 10, width: 120, height: 60 }}
          linearGradientProps={{
            colors: ['grey', 'grey'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />
      }

      {props.isAmexVisible ?
        <Button title="American Express"
          onPress={props.toggleAmex}
          ViewComponent={LinearGradient} // Don't forget this!
          buttonStyle={{ marginTop: 10, width: 120 }}
          linearGradientProps={{
            colors: ['blue', 'blue'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />
        :
        <Button title="American Express"
          onPress={props.toggleAmex}
          ViewComponent={LinearGradient} // Don't forget this!
          buttonStyle={{ marginTop: 10, width: 120 }}
          linearGradientProps={{
            colors: ['grey', 'grey'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />}

    </Overlay>
  );
};


const styles = StyleSheet.create({
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 0.7,
    borderRadius: 10,
    shadowColor: "black",
    height: 600
  },
});

function mapStateToProps(state) {
  return {
    isVisible: state.SettingsReducer.enable,
    accountInfo: state.SettingsReducer.accountInfo,
    isAmexVisible: state.SettingsReducer.institutionVisibility["AMEX"],
    isWellsVisible: state.SettingsReducer.institutionVisibility["Wells Fargo"]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAccountInfo: (data) => dispatch({ type: "SET_ACCOUNT_INFO", data: data }),
    toggleVisibility: () => dispatch({ type: "TOGGLE_SETTINGS_VISIBILITY" }),
    toggleAmex: () => dispatch({ type: "TOGGLE_AMEX_VISIBILITY" }),
    toggleWells: () => dispatch({ type: "TOGGLE_WELLS_VISIBILITY" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
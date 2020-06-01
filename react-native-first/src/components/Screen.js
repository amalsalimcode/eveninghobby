import React from 'react'
import { WebView } from 'react-native-webview';
import PersonalInformation from './newProfile/PersonalInformation';
import CardInput from './newProfile/CardInput';
import AnimationSample from './referenceComponents/AnimationSample';
import StmtGraph from './referenceComponents/StmtGraph';
import Transactions from './transactions/Transactions';
import SlideView from './referenceComponents/SlideView';
import { connect } from 'react-redux'
import { View, Text, Button } from 'react-native';

const Screen = props => {

  var acc_create_url = 'http://127.0.0.1:8000/account/create'
  function get_current_screen(screen_val) {
    switch (screen_val) {
      case 0:
        return
      // the component needs to be refactored so that setCurrentScreen
      // is a reducer action in the component
      // return (<PersonalInformation setScreen={setCurrentScreen} />)
      case 1:
        return
      // the component needs to be refactored so that setCurrentScreen
      // is a reducer action in the component
      // return (<CardInput setCardInput={setCurrentScreen} />)
      case 2:
        return (<AnimationSample />)
      case 3:
        return (<StmtGraph />)
      case 4:
        return (<Transactions />)
      case 5:
        return (<SlideView />)
      default:
        return (
          <View style={{ flex: 1 }}>
            <View style={{ margin: 80 }} />
            <Button title="Click here when you are done" onPress={() => { props.setScreen(4) }} />
            <WebView
              source={{ uri: acc_create_url, method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
              body: 'personEmail=amal.salim@gmail.com' }}
              style={{ flex: 1 }}
            />
            <View style={{ margin: 80 }} />
          </View>
        )
    }
  }

  return (
    <>
      {get_current_screen(props.curScreen)}
    </>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
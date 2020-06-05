import React from 'react'
import AnimationSample from './referenceComponents/AnimationSample';
import Transactions from './transactions/Transactions';
import SlideView from './referenceComponents/SlideView';
import { connect } from 'react-redux'
import AuthScreen from './login/AuthScreen'
import BottomNavBar from './referenceComponents/BottomNavBar';
import TopNavBar from './TopNavBar';
import GradientColor from './referenceComponents/GradientColor';

const Screen = props => {

  function get_current_screen(screen_val) {
    switch (screen_val) {
      case 0:
        return (<TopNavBar />)
      case 1:
        return (<BottomNavBar />)
      case 2:
        return (<AnimationSample />)
      case 3:
        return(<AuthScreen/>)
      case 4:
        return (<Transactions />)
      case 5:
        return (<SlideView />)
      case 6:
        return (<GradientColor />)
      default:
        console.log("nothing doing")
        return
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
import React from 'react'
import AnimationSample from './referenceComponents/AnimationSample';
import Transactions from './transactions/Transactions';
import SlideView from './referenceComponents/SlideView';
import { connect } from 'react-redux'
import GradientColor from './referenceComponents/GradientColor';
import MainNav from './MainNav';
import GradientBackground from './common/GradientBackground';
import Rewards from './rewards/Rewards';
import Home from './home/Home';
import TransactionsNav from './transactions/TransactionsNav'
import ChangeDate from './transactions/summary/ChangeDate';

const Screen = props => {

  function get_current_screen(screen_val) {
    switch (screen_val) {
      case 0:
        return (<MainNav/>)
      case 1:
        return(<GradientBackground />)
      case 2:
        return (<AnimationSample />)
      case 3:
        return (<Home/>)
      case 4:
        return (<Transactions />)
      case 5:
        return (<SlideView />)
      case 6:
        return (<ChangeDate/>)
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
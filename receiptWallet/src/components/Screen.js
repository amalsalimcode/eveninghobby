import React from 'react'
import { connect } from 'react-redux'
import MainNav from './MainNav';

const Screen = props => {

  function get_current_screen(screen_val) {
    switch (screen_val) {
      case 0:
        return (<MainNav/>)
      default:
        return
    }
  }

  return (
    <>
      {get_current_screen(0)}
    </>
  )
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
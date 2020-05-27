import React, { useState } from 'react';
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'

const UserAccount = props => {

    useEffect(() => {
    }, [])

  return (
    <>
    </>
  );
};


const styles = StyleSheet.create({
  overlay: {
    shadowColor: "black",
    height: 200
  },
});

function mapStateToProps(state) {
  return {
    isWellsVisible: state.SettingsReducer.institutionVisibility["Wells Fargo"]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAccountInfo: (data) => dispatch({ type: "SET_ACCOUNT_INFO", data: data }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
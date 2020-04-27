import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import PersonalInformation from './components/PersonalInformation'
import CardInfo from './components/CardInfo'



export default function App() {

  /*
   * currentScreen initial value should come from
   * backend, saying whether this person is new or not
   */
  const [currentScreen, setCurrentScreen] = useState(0);
  const [profileInfo, setProfileInfo] = useState({})

  let screen;
  if (currentScreen == 0) {
    screen = (<PersonalInformation setProfile={setProfileInfo}
      setScreen={setCurrentScreen} />)
  } else if (currentScreen == 1) {
    screen = (<CardInfo setCardInfo={setCurrentScreen} />)
  } else {
    screen = (<View></View>)
  }

  return (
    <>
      {screen}
    </>
  )
};

const styles = StyleSheet.create({
  test: {
    backgroundColor: "rgba(60, 80, 101, 0.5)",
  }
});
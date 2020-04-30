import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import PersonalInformation from './components/PersonalInformation'
import CardInput from './components/CardInput'



export default function App() {

  /*
   * currentScreen initial value should come from
   * backend, saying whether this person is new or not
   */
  const [currentScreen, setCurrentScreen] = useState(0);
  const [profileInfo, setProfileInfo] = useState({ "name": "", "number": "", "code": "" })
  const [cardInfo, setCardInfo] = useState({})

  let screen;
  if (currentScreen == 0) {
    screen = (<PersonalInformation setProfile={setProfileInfo}
      curProfile={profileInfo} setScreen={setCurrentScreen} />)
  } else if (currentScreen == 1) {
    screen = (<CardInput setCardInput={setCurrentScreen} setCardInfo={setCardInfo}/>)
  } else {
    console.log(profileInfo)
    console.log(cardInfo)
    screen = (<View><Text>You are done</Text></View>)
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
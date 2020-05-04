import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import PersonalInformation from './components/PersonalInformation'
import StmtGraph from './components/StmtGraph'
import CardInput from './components/CardInput'
import axios from 'axios'

export default function App() {

  /*
   * currentScreen initial value should come from
   * backend, saying whether this person is new or not
   */
  const [currentScreen, setCurrentScreen] = useState(2);
  const [profileInfo, setProfileInfo] = useState({ "name": "", "number": "", "code": "" })
  const [cardInfo, setCardInfo] = useState({})
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // now anywhere in your code, you can say sleep(5000)
  // and it will sleep for 5 seconds
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/hello_test/`)
      .then(res => {
        console.log(res.data)
        setData(JSON.stringify(res.data))
        setLoading(false)
      })

  }, []);

  let screen;
  if (currentScreen == 0) {
    screen = (<PersonalInformation setProfile={setProfileInfo}
      curProfile={profileInfo} setScreen={setCurrentScreen} />)
  } else if (currentScreen == 1) {
    screen = (<CardInput setCardInput={setCurrentScreen} setCardInfo={setCardInfo} />)
  } else {
    screen = (<StmtGraph />)
    // if (isLoading) {
    //   screen = (<ActivityIndicator />)
    // } else {
    //   screen = (<View><Text>{data}</Text></View>)
    // }
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
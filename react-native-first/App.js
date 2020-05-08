import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, ActionSheetIOS } from 'react-native';
import PersonalInformation from './src/components/PersonalInformation'
import StmtGraph from './src//components/StmtGraph'
import AnimationSample from './src/components/AnimationSample'
import CardInput from './src/components/CardInput'
import BarGraph from './src/components/BarGraph'
import axios from 'axios'
import { Provider } from 'react-redux'
import store from './src/store/index'



export default function App() {

  /*
   * currentScreen initial value should come from
   * backend, saying whether this person is new or not
   */
  const [currentScreen, setCurrentScreen] = useState(4);
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

    // axios.get(`http://127.0.0.1:8000/hello_test/`)
    //   .then(res => {
    //     console.log(res.data)
    //     setData(JSON.stringify(res.data))
    //     setLoading(false)
    //   })

  }, []);

  let screen;
  if (currentScreen == 0) {
    screen = (<PersonalInformation setScreen={setCurrentScreen} />)
  } else if (currentScreen == 1) {
    screen = (<CardInput setCardInput={setCurrentScreen} setCardInfo={setCardInfo} />)
  } else if (currentScreen == 2) {
    screen = (<AnimationSample />)
  } else if (currentScreen == 3) {
    screen = (<StmtGraph />)
  } else if (currentScreen == 4) {
    screen = (<BarGraph />)
  } else {
    if (isLoading) {
      screen = (<ActivityIndicator />)
    } else {
      screen = (<View><Text>{data}</Text></View>)
    }
  }

  return (
    <>
      <Provider store={store}>
        {screen}
      </Provider>
    </>
  )
};

const styles = StyleSheet.create({
  test: {
    backgroundColor: "rgba(60, 80, 101, 0.5)",
  }
});
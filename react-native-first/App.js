import store from './src/store/index'
import { Provider } from 'react-redux'
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CardInput from './src/components/newProfile/CardInput'
import Transactions from './src/components/transactions/Transactions'
import StmtGraph from './src/components/referenceComponents/StmtGraph'
import PersonalInformation from './src/components/newProfile/PersonalInformation'
import AnimationSample from './src/components/referenceComponents/AnimationSample'
import Settings from './src/components/transactions/Settings'
import { WebView } from 'react-native-webview';


function get_current_screen(screen_val, setCurrentScreen) {
  switch (screen_val) {
    case 0:
      return (<PersonalInformation setScreen={setCurrentScreen} />)
    case 1:
      return (<CardInput setCardInput={setCurrentScreen} />)
    case 2:
      return (<AnimationSample />)
    case 3:
      return (<StmtGraph />)
    case 4:
      return (<Transactions />)
    case 5:
      return (<Settings />)
    default:
      return (<WebView source={{ uri: 'http://localhost:5000/' }} />)
  }
}

export default function App() {

  // now anywhere in your code, you can say sleep(5000)
  // and it will sleep for 5 seconds
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  /*
   * currentScreen initial value should come from
   * backend, saying whether this person is new or not
   */
  const [currentScreen, setCurrentScreen] = useState(4);

  return (
    <>
      <Provider store={store}>
        {get_current_screen(currentScreen, setCurrentScreen)}
      </Provider>
    </>
  )
};
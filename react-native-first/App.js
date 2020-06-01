import store from './src/store/index'
import { Provider } from 'react-redux'
import React from 'react'
import Screen from './src/components/Screen'


export default function App() {

  // now anywhere in your code, you can say sleep(5000)
  // and it will sleep for 5 seconds
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  return (
    <>
      <Provider store={store}>
        <Screen />
      </Provider>
    </>
  )
};
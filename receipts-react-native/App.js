import store from './src/store/index'
import { Provider } from 'react-redux'
import React from 'react'
import Screen from './src/components/Screen'


export default function App() {



  return (
    <>
      <Provider store={store}>
        <Screen />
      </Provider>
    </>
  )
};
/* eslint-disable max-len */
import React, {useState, useEffect, useCallback} from 'react'
import {View, ActivityIndicator, Button} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import App from './App'
import OnboardingContext from './contexts/OnboardingContext'
import {getItem} from './service/Storage'

import OnboardingComponent from './components/Onboarding'

export default function RUral() {
  const [onBoarded, setOnBoarded] = useState(undefined)

  async function getOnBoarded() {
    const checkOnBoarded = await getItem('@onboarded')
    if (checkOnBoarded === null) {
      setOnBoarded(false)
    } else {
      setOnBoarded(true)
    }
  }

  useEffect(() => {
    getOnBoarded()
  }, [])

  const render = useCallback(() => {
    if (onBoarded) {
      return (
        <NavigationContainer>
          <App />
        </NavigationContainer>
      )
    } else if (onBoarded !== undefined) {
      return (
        <OnboardingContext.Provider value={{onBoarded, setOnBoarded}}>
          <OnboardingComponent />
        </OnboardingContext.Provider>
      )
    }
    return (
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 100}}>
        <ActivityIndicator color="#1b2d4f" size="large" />
      </View>
    )
  }, [onBoarded])

  return (
    <>
      {process.env.NODE_ENV !== 'production' && (
        <Button title="clear storage" onPress={async () => await AsyncStorage.clear()} />
      )}
      {render()}
    </>
  )
}

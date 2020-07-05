/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import App from './App'
import OnboardingContext from './contexts/OnboardingContext'
import { getItem } from './service/Storage'

import OnboardingComponent from './components/Onboarding'

export default function RUral () {
  const [onBoarded, setOnBoarded] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    async function getOnBoarded () {
      const checkOnBoarded = (await getItem('@RUral:onBoarded')).data
      if (checkOnBoarded === null) {
        setOnBoarded(false)
      } else {
        setOnBoarded(true)
      }
    }

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
        <OnboardingContext.Provider value={{ onBoarded, setOnBoarded }}>
          <OnboardingComponent />
        </OnboardingContext.Provider>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 100 }}>
        <ActivityIndicator color="#1b2d4f" size="large" />
      </View>
    )
  }, [onBoarded])

  return render()
}

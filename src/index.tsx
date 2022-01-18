/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import {DefaultTheme, Provider as ThemeProvider} from 'react-native-paper'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import VersionNumber from 'react-native-version-number'

import App from './App'
import OnboardingContext from './contexts/OnboardingContext'
import { getItem } from './service/Storage'

import OnboardingComponent from './components/Onboarding'

import Config from '~/providers/Config'
import { Store } from './store'
import Requesting from './components/Requesting'

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: '#F6AF30',
  },
}

export default function RUral() {
  const [onBoarded, setOnBoarded] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    async function getOnBoarded() {
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
        <ThemeProvider theme={customTheme} >
          <NavigationContainer>
            <Config>
              <Provider store={Store} >
                <App />
                <Requesting />
              </Provider>
            </Config>
          </NavigationContainer>
        </ThemeProvider>
      )
    } else if (onBoarded !== undefined) {
      return (
        <OnboardingContext.Provider value={{ onBoarded, setOnBoarded }}>
          <OnboardingComponent />
        </OnboardingContext.Provider>
      )
    }
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 100 }}>
          <ActivityIndicator color="#1b2d4f" size="large" />
        </View>
        <Text style={{ width: '100%', textAlign: 'center', marginBottom: 10, color: '#666' }} >
          Versão {VersionNumber.appVersion}
        </Text>
      </View>
    )
  }, [onBoarded])

  return render()
}

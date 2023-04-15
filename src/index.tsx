import "react-native-gesture-handler"

/* eslint-disable max-len */
import { NavigationContainer } from "@react-navigation/native"
import React, { useEffect } from "react"
import { View } from "react-native"
import { DefaultTheme, Provider as ThemeProvider } from "react-native-paper"
import { Provider } from "react-redux"

import App from "~/App"
import { Store } from "~/store"

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: "#F6AF30",
  },
}

export default function RUral() {
  useEffect(() => {}, [])

  return (
    <ThemeProvider theme={customTheme}>
      <NavigationContainer>
        <Provider store={Store}>
          <App />
        </Provider>
      </NavigationContainer>
    </ThemeProvider>
  )
}

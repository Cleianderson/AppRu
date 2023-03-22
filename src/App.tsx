// import 'react-native-gesture-handler'

import { createDrawerNavigator } from "@react-navigation/drawer"
import React from "react"

import Main from "~/pages/Main"
import Settings from "~/pages/Settings"

const Drawer = createDrawerNavigator()

const App: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="MAIN" drawerContent={Settings}>
      <Drawer.Screen name="MAIN" component={Main} />
    </Drawer.Navigator>
  )
}

export default App

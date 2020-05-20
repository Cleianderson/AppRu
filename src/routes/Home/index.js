import React from 'react'
import {} from '@react-navigation/bottom-tabs'

import Warn from '../../pages/Warn'
import Suggestion from '../../pages/Suggestion'
import Favorites from '../../pages/Favorites'
import Home from '../../pages/Home'

// import { Container } from './styles';
const Stack = createStackNavigator()

const RouteHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{title: ''}} />
      <Stack.Screen name="Avisos" component={Warn} />
      <Stack.Screen name="Sugerir" component={Suggestion} />
      <Stack.Screen name="Favoritos" component={Favorites} />
    </Stack.Navigator>
  )
}

export default RouteHome

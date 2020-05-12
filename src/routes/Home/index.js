import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Warn from '../../pages/Warn'
import Suggestion from '../../pages/Suggestion'
import Favorites from '../../pages/Favorites'
import Home from '../../pages/Home'
import Menu from '../../pages/Menu'
import Info from '../../pages/Info'

// import { Container } from './styles';
const Stack = createStackNavigator()

const RouteHome = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Home" component={Home} options={{title: 'RUral'}} />
      <Stack.Screen name="Info" component={Info} options={{title: 'Informações'}} />
      <Stack.Screen name="Avisos" component={Warn} />
      <Stack.Screen name="Sugerir" component={Suggestion} />
      <Stack.Screen name="Favoritos" component={Favorites} />
      <Stack.Screen name="Cardápio" component={Menu} />
    </Stack.Navigator>
  )
}

export default RouteHome

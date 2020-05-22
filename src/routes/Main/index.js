import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Home from '../Home'
import Menu from '../../pages/Menu'
import Info from '../../pages/Info'
import Config from '../../pages/Configuration'

// import { Container } from './styles';
const Stack = createStackNavigator()

const RouteHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{title: ''}} />
      <Stack.Screen name="Info" component={Info} options={{title: 'Informações'}} />
      <Stack.Screen name="Cardápio" component={Menu} options={{header: () => null}} />
      <Stack.Screen name="Config" component={Config} options={{title: 'Configurações'}} />
    </Stack.Navigator>
  )
}

export default RouteHome

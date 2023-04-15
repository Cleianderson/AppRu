import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Configurations from '~/pages/Configuration'
import Menu from '~/pages/Menu'
import Warn from '~/pages/Warn'
import Home from '../Home'

// import { Container } from './styles';
const Stack = createStackNavigator()

const RouteHome = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#0009' } }} >
      <Stack.Screen name="Home" component={Home} options={{ title: '' }} />
      <Stack.Screen name="Cardápio" component={Menu} options={{ header: () => null }} />
      <Stack.Screen name="Configurations" component={Configurations} options={{ title: 'Configurações' }} />
      <Stack.Screen name="Avisos" component={Warn} options={{ title: 'Avisos' }} />
    </Stack.Navigator>
  )
}

export default RouteHome

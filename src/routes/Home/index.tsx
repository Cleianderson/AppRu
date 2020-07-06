/* eslint-disable react/display-name */
import React, { useEffect, useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Warn from '~/pages/Warn'
import Suggestion from '~/pages/Suggestion'
import Favorites from '~/pages/Favorites'
import Home from '~/pages/Home'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import DataContext from '../../contexts/DataContext'
import TabBar from '~/components/TabBar'

const TabBottom = createBottomTabNavigator()

const RouteHome = () => {
  const { reload } = useContext(DataContext)

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            width: 150,
            justifyContent: 'space-around'
          }}>
          <TouchableOpacity onPress={reload}>
            <Icon name="reload" color="#1b2d4f" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Info')}>
            <Icon name="information-outline" color="#1b2d4f" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Config')}>
            <Icon name="settings" color="#1b2d4f" size={25} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <Image style={{ width: 50, height: 50 }} source={require('../../assets/iconSquare.png')} />
      )
    })
  }, [])
  return (
    <TabBottom.Navigator tabBar={props => <TabBar {...props} />} >
      <TabBottom.Screen name="Início" component={Home} />
      <TabBottom.Screen name="Avisos" options={{ unmountOnBlur: true }} component={Warn} />
      <TabBottom.Screen name="Sugerir" component={Suggestion} />
      <TabBottom.Screen name="Favoritos" component={Favorites} />
    </TabBottom.Navigator>
  )
}

export default RouteHome

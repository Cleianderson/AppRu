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

import TabBar from '~/components/TabBar'
import { Badge } from 'react-native-paper'
import { useSelector, useStore } from 'react-redux'

const TabBottom = createBottomTabNavigator()

const RouteHome = () => {
  const navigation = useNavigation()
  const thereIsWarn = useSelector<RootState, boolean>(state => state.mainState.thereIsWarn)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            width: 60,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Avisos')}>
            {thereIsWarn && <View
              style={{
                position: 'absolute',
                right: 0,
                top: -1,
                borderColor: '#fff',
                borderWidth: 2,
                borderRadius: 50,
                backgroundColor: '#ff7700',
                width: 15,
                height: 15,
                zIndex: 1
              }}
            />}
            {/*<Badge visible={thereIsWarn} style={{position: 'absolute', top: -1}} size={12}/>*/}
            <Icon name="bell-outline" color="#1b2d4f" size={25} />
          </TouchableOpacity>
          {__DEV__ && <TouchableOpacity onPress={() => navigation.navigate('Config')}>
            <Icon name="settings" color="#1b2d4f" size={25} />
          </TouchableOpacity>}
        </View>
      ),
      headerLeft: () => (
        <Image style={{ width: 50, height: 50 }} source={require('../../assets/iconSquare.png')} />
      )
    })
  }, [thereIsWarn])
  return (
    <TabBottom.Navigator tabBar={props => <TabBar {...props} />} >
      <TabBottom.Screen name="Início" component={Home} />
      {/* <TabBottom.Screen name="Avisos" options={{ unmountOnBlur: true }} component={Warn} /> */}
      <TabBottom.Screen name="Favoritos" component={Favorites} />
      <TabBottom.Screen name="Sugerir" component={Suggestion} />
    </TabBottom.Navigator>
  )
}

export default RouteHome

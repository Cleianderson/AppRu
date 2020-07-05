import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import constants from '~/service/constants'
import DataContext from '~/contexts/DataContext'

import { MenuButton, MenuText, MenuContent, MenuContentText } from './styles'

const MButton = ({ item, launch = false }) => {
  const navigation = useNavigation()

  const { favorites } = useContext(DataContext)

  function itemIsInclude (item) {
    const arr = favorites.filter((fav) => {
      let dinner = constants.ARRAY_DINNER.map((unit) => item[unit])
      let launch = constants.ARRAY_LAUNCH.map((unit) => item[unit])

      dinner = dinner.filter((unit) => unit !== undefined)
      launch = launch.filter((unit) => unit !== undefined)

      return dinner.includes(fav.toUpperCase()) || launch.includes(fav.toUpperCase())
    })
    return arr.length > 0
  }

  return (
    <MenuButton
      onPress={() =>
        navigation.navigate('Cardápio', {
          type: launch ? 'almoco' : 'jantar'
        })
      }>
      <MenuText>{launch ? 'Almoço' : 'Jantar'}</MenuText>
      <MenuContent>
        <Icon name="clock" color="#1b2d4f" size={15} />
        <MenuContentText>{launch ? '10:30 - 14h' : '16:30 - 19h'}</MenuContentText>
      </MenuContent>
      {itemIsInclude(launch ? item.almoco : item.jantar) && (
        <Icon style={{ position: 'absolute', right: 20 }} name="star" size={20} color="#f9b233" />
      )}
    </MenuButton>
  )
}

export default MButton

import React, { useState, useEffect } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Info, FoodDescription, FoodText, FoodContainer, MenuContainer } from './styles'
import constants from '../../../service/constants'
import { getItem, setItem } from '../../../service/Storage'

const extensive = {
  p1: 'Prato Principal 1',
  p2: 'Prato Principal 2',
  gre: 'Na Grelha',
  gua: 'Guarnição',
  fag: 'Fast Grill',
  veg: 'Vegetariano',
  sal: 'Salada Crua',
  sco: 'Salada Cozida',
  sopa: 'Sopa',
  sob: 'Sobremesa',
  suc: 'Suco',
}

export default function Menu(props) {

  const dynamicArray = props.type === 'launch' ? constants.ARRAY_LAUNCH : constants.ARRAY_DINNER

  const [favorites, setFavorites] = useState([])

  function checkItem(str) {
    let result = favorites.filter(fav =>
      str.toUpperCase() === fav.toUpperCase()
    )
    return result.length > 0
  }

  async function toggleFavorite(str) {
    if (favorites.includes(str)) {
      let newFavorites = favorites.filter(fav => fav !== str)
      await setItem('@favorites', { data: newFavorites })
      setFavorites(newFavorites)
    } else {
      await setItem('@favorites', { data: [...favorites, str] })
      setFavorites([...favorites, str])
    }
  }

  useEffect(() => {
    async function getFavorites() {
      const fav = JSON.parse(await getItem('@favorites'))
      setFavorites(fav !== null ? fav.data : [])
    }
    getFavorites()
  }, [])

  return (
    <Info>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingVertical: 10,
          paddingHorizontal: 7,
        }}
      >
        {dynamicArray.map((strFood, inx) => (
          <FoodContainer key={inx}>
            <MenuContainer>
              <FoodText>{extensive[strFood]}</FoodText>
              <TouchableOpacity onPress={() => toggleFavorite(props.item[strFood])} >
                <Icon
                  name='star'
                  color={checkItem(props.item[strFood]) ? constants.SECOND_COLOR : '#ccc'}
                  size={25}
                />
              </TouchableOpacity>
            </MenuContainer>
            <FoodDescription>{props.item[strFood].toUpperCase()}</FoodDescription>
          </FoodContainer>
        ))}
      </ScrollView>
    </Info>
  )
}

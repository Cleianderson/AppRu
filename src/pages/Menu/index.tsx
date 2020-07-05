import React, { useEffect, useContext } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

import {
  Container,
  Content,
  FoodDescription,
  FoodText,
  FoodContainer,
  MenuContainer,
  NavButton,
  DayText,
  Header
} from './styles'
import constants from '../../service/constants'
import { setItem } from '../../service/Storage'
import DataContext from '../../contexts/DataContext'

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
  suc: 'Suco'
}

const Menu = ({ route }) => {
  const { type } = route.params
  const navigation = useNavigation()

  const { favorites, setFavorites, day, setDay, foods, homeViewPage } = useContext(DataContext)
  const dynamicArray = type === 'almoco' ? constants.ARRAY_LAUNCH : constants.ARRAY_DINNER

  function checkItem (str) {
    const result = favorites.filter((fav) => str.toUpperCase() === fav.toUpperCase())
    return result.length > 0
  }

  async function toggleFavorite (str = '') {
    const _favorites = favorites.map((iFav) => iFav.toLowerCase())

    if (_favorites.includes(str.toLowerCase())) {
      const newFavorites = favorites.filter((fav) => fav.toLowerCase() !== str.toLowerCase())
      await setItem('@favorites', { data: newFavorites })
      setFavorites(newFavorites)
    } else {
      await setItem('@favorites', { data: [...favorites, str] })
      setFavorites([...favorites, str])
    }
  }

  return (
    <Container>
      <Header>
        <NavButton
          onPress={() => (day > 0 ? homeViewPage.setPage(day - 1) : {})}
          style={day > 0 ? {} : { backgroundColor: '#1b2d4f' }}>
          <Icon name="chevron-left" color="#1b2d4f" size={25} />
        </NavButton>
        <DayText>
          {type === 'almoco' ? 'Almoço' : 'Jantar'} - {constants.STRING_DAYS_EXTENDED[day]}
        </DayText>
        <NavButton
          onPress={() => (day < 4 ? homeViewPage.setPage(day + 1) : {})}
          style={day < 4 ? {} : { backgroundColor: '#1b2d4f' }}>
          <Icon name="chevron-right" color="#1b2d4f" size={25} />
        </NavButton>
      </Header>
      <Content showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
        {dynamicArray.map((strFood, inx) => (
          <FoodContainer key={inx}>
            <MenuContainer>
              <FoodText>{extensive[strFood]}</FoodText>
              <FoodDescription>{foods[day][type][strFood].toUpperCase()}</FoodDescription>
            </MenuContainer>
            <TouchableOpacity
              onPress={() => toggleFavorite(foods[day][type][strFood])}
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
              <Icon
                name="star"
                color={checkItem(foods[day][type][strFood]) ? constants.SECOND_COLOR : '#ccc'}
                size={25}
              />
            </TouchableOpacity>
          </FoodContainer>
        ))}
      </Content>
      <TouchableOpacity onPress={navigation.goBack} style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
        <Text style={{ color: '#1b2d4f', fontWeight: 'bold', textDecorationLine: 'underline' }}>
          voltar
        </Text>
      </TouchableOpacity>
    </Container>
  )
}

export default Menu

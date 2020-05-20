import React, {useEffect, useContext} from 'react'
import {TouchableOpacity, Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useNavigation} from '@react-navigation/native'

import {
  Container,
  Content,
  FoodDescription,
  FoodText,
  FoodContainer,
  MenuContainer,
  NavBar,
  NavButton,
  NavText,
} from './styles'
import constants from '../../service/constants'
import {setItem} from '../../service/Storage'
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
  suc: 'Suco',
}

const Menu = ({route}) => {
  const {type, pageView} = route.params
  const navigation = useNavigation()

  const {favorites, setFavorites, day, setDay, foods} = useContext(DataContext)
  const dynamicArray = type === 'almoco' ? constants.ARRAY_LAUNCH : constants.ARRAY_DINNER

  function checkItem(str) {
    let result = favorites.filter((fav) => str.toUpperCase() === fav.toUpperCase())
    return result.length > 0
  }

  async function toggleFavorite(str = '') {
    const _favorites = favorites.map((iFav) => iFav.toLowerCase())

    if (_favorites.includes(str.toLowerCase())) {
      let newFavorites = favorites.filter((fav) => fav.toLowerCase() !== str.toLowerCase())
      await setItem('@favorites', {data: newFavorites})
      setFavorites(newFavorites)
    } else {
      await setItem('@favorites', {data: [...favorites, str]})
      setFavorites([...favorites, str])
    }
  }

  useEffect(() => {
    navigation.setOptions({title: `Cardápio - ${type === 'almoco' ? 'Almoço' : 'Jantar'}`})
  }, [])

  return (
    <Container>
      <Content contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 15}}>
        {dynamicArray.map((strFood, inx) => (
          <FoodContainer key={inx}>
            <MenuContainer>
              <FoodText>{extensive[strFood]}</FoodText>
              <TouchableOpacity
                onPress={() => toggleFavorite(foods[day][type][strFood])}
                hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                <Icon
                  name="star"
                  color={checkItem(foods[day][type][strFood]) ? constants.SECOND_COLOR : '#ccc'}
                  size={25}
                />
              </TouchableOpacity>
            </MenuContainer>
            <FoodDescription>{foods[day][type][strFood].toUpperCase()}</FoodDescription>
          </FoodContainer>
        ))}
      </Content>
      <NavButton onPress={() => (day > 0 ? pageView.setPage(day - 1) : {})} style={{left: 0}}>
        <Icon name="chevron-left" color="#1b2d4f" size={25} />
      </NavButton>
      <NavBar>
        <Text>{constants.STRING_DAYS[day]}</Text>
      </NavBar>
      <NavButton onPress={() => (day < 4 ? pageView.setPage(day + 1) : {})} style={{right: 0}}>
        <Icon name="chevron-right" color="#1b2d4f" size={25} />
      </NavButton>
    </Container>
  )
}

export default Menu

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
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
  Header,
  Footer
} from './styles'
import constants from '../../service/constants'

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
  const dispatch = useDispatch()

  const day = useSelector<RootState, number>(state => state.mainState.day)
  const foods = useSelector<RootState, Table[] | undefined>(state => state.mainState.foods)
  const favorites = useSelector<RootState, string[] | undefined>(state => state.mainState.favorites)
  const homeViewPage = useSelector<RootState, JSX.Element | undefined>(state => state.mainState.homeView)

  const dynamicArray = type === 'almoco' ? constants.ARRAY_LAUNCH : constants.ARRAY_DINNER

  const addFavorites = (favItem: string) => dispatch({ type: 'ADD_FAVORITES', payload: { favItem } })
  const removeFavorites = (favItem: string) => dispatch({ type: 'REMOVE_FAVORITES', payload: { favItem } })

  const previousPage = () => {
    if (day > 0 && homeViewPage !== undefined) {
      // setDay(day - 1)
      homeViewPage.setPage(day - 1)
    }
  }

  const nextPage = () => {
    if (day < 4 && homeViewPage !== undefined) {
      homeViewPage.setPage(day + 1)
    }
  }

  function checkItem(str) {
    const result = favorites?.filter((fav) => str.toUpperCase() === fav.toUpperCase()) ?? []
    return result.length > 0
  }

  async function toggleFavorite(str = '') {
    if (favorites !== undefined) {
      if (favorites.includes(str.toUpperCase())) {
        removeFavorites(str)
      } else {
        addFavorites(str)
      }
      // const _favorites = favorites.map((iFav) => iFav.toLowerCase())
      //
      // if (_favorites?.includes(str.toLowerCase())) {
      //   const newFavorites = favorites.filter((fav) => fav.toLowerCase() !== str.toLowerCase())
      //   await setItem('@favorites', { data: newFavorites })
      //   setFavorites(newFavorites)
      // } else {
      //   await setItem('@favorites', { data: [...favorites, str] })
      //   setFavorites([...favorites, str])
      // }
    }
  }

  return (
    <Container>
      <Header>
        <DayText>
          {type === 'almoco' ? 'Almoço' : 'Jantar'} - {constants.STRING_DAYS_EXTENDED[day]}
        </DayText>
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
      <Footer>
        <NavButton
          onPress={previousPage}
          disabled={day === 0}
          style={day === 0 ? { opacity: 0.5 } : {}}>
          <Icon name="chevron-left" color="#1b2d4f" size={25} />
          <Text style={{ marginRight: 10 }}>Anterior</Text>
        </NavButton>
        <NavButton onPress={navigation.goBack}>
          <Icon name="menu-down" color="#1b2d4f" size={25} />
        </NavButton>
        <NavButton
          onPress={nextPage}
          disabled={day >= 4}
          style={day >= 4 ? { opacity: 0.5 } : {}}>
          <Text style={{ marginLeft: 10 }}>Próximo</Text>
          <Icon name="chevron-right" color="#1b2d4f" size={25} />
        </NavButton>
      </Footer>
      {/* <TouchableOpacity
        onPress={navigation.goBack}
        style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}
      >
        <Text style={{ color: '#1b2d4f', fontWeight: 'bold', textDecorationLine: 'underline' }}>
          voltar
        </Text>
      </TouchableOpacity> */}
    </Container>
  )
}

export default Menu

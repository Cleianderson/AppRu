import React, { useState, useRef } from 'react'
import Svg, { SvgProps, G, Path, Rect } from "react-native-svg"
import { FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'

import {
  Container,
  Inputs,
  Content,
  TextInput,
  Button,
  FavContainer,
  FavText,
  FavButton,
  EmptyContainer,
  EmptyText
} from './styles'

const Favorites = () => {
  const [textFavorite, setTextFavorite] = useState('')
  const ListFav = useRef<FlatList>(null)
  const favorites = useSelector<RootState, string[] | undefined>(state => state.mainState.favorites)
  const dispatch = useDispatch()

  const addFavorites = (favItem: string) => dispatch({ type: 'ADD_FAVORITES', payload: { favItem } })
  const removeFavorites = (favItem: string) => dispatch({ type: 'REMOVE_FAVORITES', payload: { favItem } })

  const submitFood = () => {
    // if (textFavorite.trim().length < 3) return 0
    addFavorites(textFavorite.trim())
    setTextFavorite('')
    setTimeout(() => ListFav.current?.scrollToEnd(), 500)
  }

  return (
    <Container>
      <Content>
        <FlatList
          ref={ListFav}
          data={favorites}
          keyExtractor={(item, index) => String(index + item)}
          renderItem={({ item }) => (
            <FavContainer>
              <FavText>{item}</FavText>
              <FavButton onPress={() => removeFavorites(item)}>
                <Icon name="delete-forever" color="white" size={20} />
              </FavButton>
            </FavContainer>
          )}
          ListEmptyComponent={() => (
            <EmptyContainer>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={200}
                height={200}
                viewBox="0 0 135.467 135.467"
              >
                <G transform="translate(-62.148 -371.019) scale(1.92618)">
                  <Path
                    fill="#2f4e89"
                    d="m68.946 205.398 24.29 8.097.475 27.151-24.291-8.097z"
                  />
                  <Path
                    fill="#1f335a"
                    d="m68.946 205.398.474 27.151-28.569 9.523-.474-27.15z"
                  />
                  <Path
                    fill="#1b2d4f"
                    d="m69.42 232.549 24.29 8.097-28.568 9.523-24.29-8.097z"
                  />
                  <Path
                    fill="#294376"
                    d="m93.235 213.494-28.567 9.523.473 27.15 28.568-9.522zM74.008 225.99l2.186 4.125 5.09-1.022-3.77 5.154.765 5.116-4.516-.939-4.617 4.184.98-5.735-3.619-2.53 5.12-2.606zm12.797 6.689.978 1.846 2.278-.458-1.687 2.307.342 2.29-2.021-.42-2.066 1.872.438-2.567-1.62-1.132 2.293-1.166z"
                  />
                  <Path
                    fill="#325493"
                    d="m40.377 214.92.474 27.15 24.29 8.097-.473-27.15zm11.88 9.698 1.932 5.12 5.163 2.053-4.098 2.562.447 5.2-4.466-3.535-4.886 1.16 1.338-4.747-3.467-4.483 5.293.602z"
                  />
                  <Rect
                    width={30.114}
                    height={11.159}
                    x={-94.357}
                    y={247.166}
                    fill="#4c5a80"
                    ry={0}
                    transform="matrix(.94868 -.31623 .6238 .78158 0 0)"
                  />
                  <Path
                    fill="#4c5a80"
                    d="m40.377 214.922 24.29 8.097-5.715 8.308-24.29-8.097z"
                  />
                </G>
              </Svg>
              <EmptyText>sua lista de favoritos está vazia</EmptyText>
            </EmptyContainer>
          )}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </Content>
      <Inputs>
        <TextInput placeholder="Comida" value={textFavorite} onChangeText={setTextFavorite} />
        <Button
          onPress={submitFood}>
          <Icon name="plus" color="#1b2d4f" size={31} />
        </Button>
      </Inputs>
    </Container>
  )
}

export default Favorites

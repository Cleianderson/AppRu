import React, { useContext, useState, useRef } from 'react'
import { FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import DataContext from '../../contexts/DataContext'

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

  const { favorites, addFavorites, removeFavorites } = useContext(DataContext)

  const submitFood = async () => {
    if (textFavorite.trim().length < 3) return 0
    await addFavorites(textFavorite)
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
              <EmptyText>Sua lista de favoritos está vazia</EmptyText>
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

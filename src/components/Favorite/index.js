import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Container, ContainerInput, Button } from './styles'
import FavoriteUnit from './favoriteUnit'
import { getItem, setItem } from '../../service/Storage'
import constants from '../../constants'

export default function Favorite() {
  const [txtFavorite, setTxtFavorite] = useState('')
  const [listFavorites, setListFavorites] = useState([])

  async function removeFavorite(item) {
    let newArr = listFavorites.filter(itemSuper => itemSuper !== item)
    setListFavorites(newArr)
    await setItem('@favorites', {data:newArr})
  }

  async function addFavorite() {
    await setItem('@favorites', { data: [...listFavorites, txtFavorite] })
    populateList()
    setTxtFavorite('')
  }

  async function populateList() {
    let { data } = JSON.parse(await getItem('@favorites'))
    setListFavorites(data)
  }

  useEffect(() => {
    populateList()
  }, [])

  return (
    <Container>
      {
        listFavorites.map((item, inx) => (
          <FavoriteUnit 
            key={inx} 
            text={item} 
            onPress={() => removeFavorite(item)} 
          />
        ))
      }
      <ContainerInput>
        <TextInput
          style={{ flex: 1 }}
          placeholder='Comida'
          onChangeText={setTxtFavorite}
          value={txtFavorite}
        />
        <Button onPress={addFavorite}>
          <Icon 
            name='send' 
            size={20} 
            color={constants.SECOND_COLOR} 
          />
        </Button>
      </ContainerInput>
    </Container>
  )
}

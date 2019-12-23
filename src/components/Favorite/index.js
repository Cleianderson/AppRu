import React, { useState, useEffect } from 'react'
import { TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Container, ContainerInput, Button } from './styles'
import FavoriteUnit from './favoriteUnit'
import { getItem, setItem } from '../../service/Storage'
import constants from '../../service/constants'

export default function Favorite() {
  const [txtFavorite, setTxtFavorite] = useState('')
  const [listFavorites, setListFavorites] = useState([])

  async function removeFavorite(item) {
    let newArr = listFavorites.filter(itemSuper => itemSuper !== item)
    setListFavorites(newArr)
    await setItem('@favorites', { data: newArr })
  }

  async function addFavorite() {
    if (txtFavorite.trim().length > 2) {
      await setItem('@favorites', { data: [...listFavorites, txtFavorite] })
      populateList()
      setTxtFavorite('')
    }else{
      Alert.alert(
        'Caracteres insuficientes',
        'O número mínimo de caracteres é 3',
        [{text:'Certo',style:'default'}]
      )
    }
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
        <Button
          onPress={addFavorite}
          accessibilityLabel='Adicionar aos favoritos'
        >
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

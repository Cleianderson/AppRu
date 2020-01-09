import React, { useState, useEffect } from 'react'
import { TextInput, Alert, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Container, ContainerInput, Button } from './styles'
import FavoriteUnit from './favoriteUnit'
import { getItem, setItem } from '../../service/Storage'
import constants from '../../service/constants'

export default function Favorite(props) {
  const [txtFavorite, setTxtFavorite] = useState('')
  const [listFavorites, setListFavorites] = useState([])

  async function removeFavorite(item) {
    let newArr = listFavorites.filter(itemSuper => itemSuper !== item)
    setListFavorites(newArr)
    await setItem('@favorites', { data: newArr })
  }

  async function addFavorite() {
    if (txtFavorite.trim().length > 2) {
      await setItem('@favorites', { data: [...listFavorites, txtFavorite.trim()] })
      setListFavorites(JSON.parse(await getItem('@favorites')).data)
      setTxtFavorite('')
    } else {
      Alert.alert(
        'Caracteres insuficientes',
        'O número mínimo de caracteres é 3',
        [{ text: 'Certo', style: 'default' }]
      )
    }
  }

  async function populateList() {
    await setListFavorites(props.favorites)
  }

  useEffect(() => {
    populateList()
  }, [])

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 190 }} >
        {
          listFavorites.map((item, inx) => (
            <FavoriteUnit
              key={inx}
              text={item}
              onPress={() => removeFavorite(item)}
            />
          ))
        }
      </ScrollView>
      <ContainerInput>
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            padding: 7
          }}
          placeholderTextColor='#888'
          placeholder='Comida'
          onChangeText={setTxtFavorite}
          value={txtFavorite}
          returnKeyType='send'
          onSubmitEditing={addFavorite}
        />
        <Button
          onPress={addFavorite}
          accessibilityLabel='Adicionar aos favoritos'
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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

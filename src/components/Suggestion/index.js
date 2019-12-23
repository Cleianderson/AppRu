import React, { useState } from 'react'
import { TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Container, ContainerInput, Button } from './styles'
import api from '../../service/Api'
import constants from '../../service/constants'

export default function Favorite() {
  const [txtSuggestion, setTxtSuggestion] = useState('')

  async function postSuggestion() {
    if (txtSuggestion.trim().length > 9) {
      const resolve = await api.post('/suggestion', { text: txtSuggestion })
      if (resolve.status === 200) {
        Alert.alert('Sugestão enviada', 'Obrigado <3', [
          { text: 'De nada', style: 'default', onPress: () => setTxtSuggestion('') }
        ])
      }
    }else{
      Alert.alert(
        'Caracteres insuficientes',
        'O número mínimo de caracteres é 10',
        [{text:'Certo',style:'default'}]
      )
    }
  }

  return (
    <Container>
      <ContainerInput>
        <TextInput
          style={{ flex: 1 }}
          placeholder='Sugestão'
          onChangeText={setTxtSuggestion}
          value={txtSuggestion}
          multiline
        />
        <Button
          onPress={postSuggestion}
          accessibilityLabel='Enviar sugestão'
        >
          <Icon name='send' size={20} color={constants.SECOND_COLOR} />
        </Button>
      </ContainerInput>
    </Container>
  )
}

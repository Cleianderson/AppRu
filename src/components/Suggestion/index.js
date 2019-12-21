import React, { useState } from 'react'
import { TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Container, ContainerInput, Button } from './styles'
import api from '../../service/Api'
import constants from '../../constants'

export default function Favorite() {
  const [txtSuggestion, setTxtSuggestion] = useState('')

  async function postSuggestion() {
    const resolve = await api.post('/suggestion',{text: txtSuggestion})
    if(resolve.status === 200){
      Alert.alert('Sugestão enviada','Obrigado <3',[
        {text: 'De nada', style:'default', onPress:()=> setTxtSuggestion('')}
      ])
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
        <Button onPress={postSuggestion}>
          <Icon name='send' size={20} color={constants.SECOND_COLOR} />
        </Button>
      </ContainerInput>
    </Container>
  )
}

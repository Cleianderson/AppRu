import React, { useState } from 'react'
import { TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Container, ContainerInput, Button, ChooseBox } from './styles'
import api from '../../service/Api'
import constants from '../../service/constants'

export default function Suggestion() {
  const [txtSuggestion, setTxtSuggestion] = useState('')
  const [txtIdentification, setTxtIdentification] = useState('')
  const [typeSuggestion, setTypeSuggestion] = useState('others')

  async function postSuggestion() {
    if (txtSuggestion.trim().length < 10) {
      showAlert('Caracteres insuficientes', 'O número mínimo de caracteres é 10')
      return null
    }
    if (typeSuggestion === '') {
      showAlert('Tipo de sugestão inválida', 'Informe sobre o que se trata a sua sugestão')
      return null
    }
    const resolve = await api.post('/suggestion', {
      text: txtSuggestion,
      type: typeSuggestion,
      author: txtIdentification
    })
    if (resolve.status === 200) {
      Alert.alert('Sugestão enviada', 'Obrigado <3', [
        { text: 'De nada', style: 'default', onPress: () => setTxtSuggestion('') }
      ])
    }
  }

  function showAlert(errDesc, errContent) {
    Alert.alert(
      errDesc,
      errContent,
      [{ text: 'Certo', style: 'default' }]
    )
  }


  return (
    <Container>
      <ChooseBox
        onValueChange={itemValue => setTypeSuggestion(itemValue)}
        prompt='Do que se trata a sugestão?'
        selectedValue={typeSuggestion}
        hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
      >
        <ChooseBox.Item label='RU' value='ru' />
        <ChooseBox.Item label='Aplicativo' value='app' />
        <ChooseBox.Item label='Outros' value='others' />
      </ChooseBox>
      <TextInput
        placeholder='Identificação [NÃO OBRIGATÓRIO]'
        onChangeText={setTxtIdentification}
        value={txtIdentification}
      />
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

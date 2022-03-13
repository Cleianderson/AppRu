import React, { useState } from 'react'
import { Alert } from 'react-native'

import {
  Container,
  Content,
  ContainerInput,
  Button,
  ChooseBox,
  TextInput,
  Label,
  ContainerChooseBox
} from './styles'
import api from '../../service/Api'

export default function Suggestion () {
  const [txtSuggestion, setTxtSuggestion] = useState('')
  const [txtIdentification, setTxtIdentification] = useState('')
  const [typeSuggestion, setTypeSuggestion] = useState('others')

  async function postSuggestion () {
    if (txtSuggestion.trim().length < 10) {
      showAlert(
        'Caracteres insuficientes',
        'A sua sugestão precisa ter, no mínimo, 10 caractéres'
      )
      return null
    }
    if (typeSuggestion === '') {
      showAlert(
        'Tipo de sugestão inválida',
        'Informe sobre o que se trata a sua sugestão'
      )
      return null
    }
    Alert.alert(
      'Processando...',
      'Estamos recebendo sua sugestão. Você será avisado se tudo ocorrer bem',
      [{ text: '', style: 'default', onPress: () => {} }]
    )
    const resolve = await api.post('/suggestion', {
      text: txtSuggestion,
      type: typeSuggestion,
      author: txtIdentification
    })
    if (resolve.status >= 200 && resolve.status < 300) {
      Alert.alert('Sua sugestão foi recebida', 'Obrigado <3', [
        {
          text: 'OK',
          style: 'default',
          onPress: () => setTxtSuggestion('')
        }
      ])
    } else {
      Alert.alert('Erro', 'Houve um erro inesperado, tente mais tarde', [
        { text: 'Ok', style: 'default', onPress: () => {} }
      ])
    }
  }

  function showAlert (errDesc: string, errContent: string) {
    Alert.alert(errDesc, errContent, [{ text: 'Certo', style: 'default' }])
  }

  return (
    <Container>
      <Content>
        <Label>
          Escolha o tipo de sugestão <Label style={{ color: '#a00' }}>*</Label>
        </Label>
        <ContainerChooseBox>
          <ChooseBox
            onValueChange={(itemValue) => setTypeSuggestion(itemValue)}
            mode="dropdown"
            selectedValue={typeSuggestion}
            hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
          >
            <ChooseBox.Item label="RU" value="ru" />
            <ChooseBox.Item label="Aplicativo" value="app" />
            <ChooseBox.Item label="Outros" value="others" />
          </ChooseBox>
        </ContainerChooseBox>
        <Label>Identificação</Label>
        <TextInput
          placeholder="Fulano Silva - Curso"
          onChangeText={setTxtIdentification}
          value={txtIdentification}
        />
        <Label>
          Sugestão <Label style={{ color: '#a00' }}>*</Label>
        </Label>
        <TextInput
          placeholder="Mínimo de 10 caractéres"
          onChangeText={setTxtSuggestion}
          value={txtSuggestion}
          multiline
        />
        <Label style={{ textAlign: 'center', color: '#666' }}>
          <Label style={{ color: '#a00' }}>*</Label> - Campo obrigatório{' '}
        </Label>
      </Content>
      <ContainerInput>
        <Button onPress={postSuggestion} accessibilityLabel="Enviar sugestão">
          <Label
            style={{
              marginTop: 0,
              marginBottom: 0,
              color: '#1b2d4f',
              fontWeight: 'bold'
            }}
          >
            Enviar
          </Label>
        </Button>
      </ContainerInput>
    </Container>
  )
}

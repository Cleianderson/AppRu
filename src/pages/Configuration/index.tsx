import React from 'react'
import { BackHandler } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { Container } from './styles'
import SwitchLabeled from './components/SwitchLabeled'
import Button from './components/Button'

const Configuration = () => {
  return (
    <Container>
      <SwitchLabeled label='Mostrar indicador de dias' isActived={false} />
      <SwitchLabeled nested label='Exibir datas' isActived={false} />
      <Button
        label="Limpar todos os dados"
        onPress={async () => {
          await AsyncStorage.clear()
          BackHandler.exitApp()
        }}
        confirm
        titleAlert='Quer mesmo apagar todos os dados?'
        titleMessage='Os dados de configurações, semanas e favoritos seão excluídos'
      />
    </Container>
  )
}

export default Configuration

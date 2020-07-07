import React, { useContext } from 'react'
import { BackHandler } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { Container } from './styles'
import SwitchLabeled from './components/SwitchLabeled'
import Button from './components/Button'
import Config from '~/contexts/Config'

const Configuration = () => {
  const { showDateOnIndicator, setShowDateOnIndicator, showIndicator, setShowIndicator } = useContext(Config)

  return (
    <Container>
      <SwitchLabeled
        label='Mostrar indicador de dias'
        isActived={showIndicator}
        onPress={() => setShowIndicator(!showIndicator) }
      />
      <SwitchLabeled
        nested
        disabled={showIndicator === false}
        label='Exibir datas'
        isActived={showDateOnIndicator}
        onPress={() => setShowDateOnIndicator(!showDateOnIndicator)}
      />
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

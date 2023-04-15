import React, { useContext } from 'react'
import { BackHandler } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Container } from './styles'
import SwitchLabeled from './components/SwitchLabeled'
import Button from './components/Button'
import Config from '~/contexts/ConfigContext'

const Configuration = () => {
  const { configs, configDispatch } = useContext(Config)
  const { showIndicator, showDateOnIndicator } = configs

  return (
    <Container>
      <SwitchLabeled
        label='Mostrar indicador de dias'
        isActived={showIndicator}
        onPress={() => configDispatch({ type: 'UPDATE_CONFIG', data: { showIndicator: !showIndicator } })}
      />
      <SwitchLabeled
        nested
        disabled={showIndicator === false}
        label='Exibir datas'
        isActived={showDateOnIndicator}
        onPress={() => configDispatch({ type: 'UPDATE_CONFIG', data: { showDateOnIndicator: !showDateOnIndicator } })}
      />
      <Button
        label="Limpar todos os dados"
        onPress={() => {
          const clear = async () => {
            await AsyncStorage.clear()
            BackHandler.exitApp()
          }
          clear()
        }}
        confirm
        titleAlert='Quer mesmo apagar todos os dados?'
        titleMessage='Os dados de configurações, semanas e favoritos seão excluídos'
      />
    </Container>
  )
}

export default Configuration

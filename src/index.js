/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { View, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

import App from './App'
import { getItem, setItem } from './service/Storage'
import constants from './service/constants'

export default function RUral() {
  const [onBoarded, setOnBoarded] = useState('')

  async function finalizeOnboaring() {
    await setItem('@onboarded', { data: true })
    setOnBoarded('true')
  }

  async function getOnBoarded() {
    const checkOnBoarded = await getItem('@onboarded')
    if (checkOnBoarded === null) {
      setOnBoarded('false')
    } else {
      setOnBoarded('true')
    }
  }

  useEffect(() => {
    getOnBoarded()
  }, [])

  if (onBoarded === 'true') {
    return (
      <App />
    )
  } else if (onBoarded === 'false') {
    return (
      <Onboarding
        pages={[
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 200, height: 200 }} source={require('./assets/icon.png')} />),
            title: 'Olá!',
            subtitle: 'Bem-vindx ao app do melhor RU do Brasil, o app RUral, vamos conhecê-lo?',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 300, height: 100 }} source={require('./assets/imagem_botoes.jpeg')} />),
            title: 'Funcionalidades',
            subtitle: 'Existem algumas funcionalidades no app além de mostrar o cardápio, vou te apresentar cada uma delas',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 75, height: 75 }} source={require('./assets/avisos.png')} />),
            title: 'Avisos',
            subtitle: 'Aqui serão mostrados todos os avisos que a CGARU tem para você. Se houver um novo aviso o botão ficará vermelhinho e você também receberá uma notificação',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 75, height: 75 }} source={require('./assets/favoritos.png')} />),
            title: 'Favoritos',
            subtitle: 'Nesse você pode favoritar as preparações que mais gosta e quando alguma delas estiver no cardápio o botão do almoço e/ou jantar ficará amarelinho. Também é possível favoritar preparações diretamente do menu',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 75, height: 75 }} source={require('./assets/sugerir.png')} />),
            title: 'Sugerir',
            subtitle: 'Aqui você pode nos dar sua sugestão sobre o RU, sobre o app ou sobre o que quiser. Simples, porém importantíssimo',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 75, height: 75 }} source={require('./assets/renovar.png')} />),
            title: 'Renovar',
            subtitle: 'Esse é simples, ele apenas contata o servidor para checar se os dados no seu celular são os mesmos do servidor',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 350, height: 200 }} source={require('./assets/botoes.png')} />),
            title: 'A cereja do bolo',
            subtitle: 'Cada dia útil da semana tem um par de botões que mostra o cardápio do almoço e do jantar. Repare no botão amarelinho, isso significa que naquele horário tem algum dos seus itens favoritos',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 200, height: 200 }} source={require('./assets/icon.png')} />),
            title: 'É isso...',
            subtitle: 'Não esqueça de nos dar sua opinião/sugestão, pois esse é o modo mais fácil de sabermos onde e no que devemos melhorar',
          },
        ]}
        nextLabel='Próximo'
        skipLabel='Pular'
        onSkip={finalizeOnboaring}
        onDone={finalizeOnboaring}
      />
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: constants.PRIMARY_COLOR }} />
  )
}

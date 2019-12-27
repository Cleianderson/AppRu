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
            image: (<Image style={{ width: 200, height: 200 }} source={{ uri: 'https://raw.githubusercontent.com/Cleianderson/RUral/master/android/app/src/main/res/mipmap/icon.png' }} />),
            title: 'Olá',
            subtitle: 'Bem-vind@ ao app do melhor RU do Brasil, o app RUral',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 300, height: 100 }} source={{ uri: 'https://raw.githubusercontent.com/Cleianderson/RUral.img/master/imagem_botoes.jpeg' }} />),
            title: 'Funcionalidades',
            subtitle: 'Estas são as funcionalidades do app, além de mostrar o cardápio, vou lhe apresentar cada uma delas',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 75, height: 75 }} source={{ uri: 'https://raw.githubusercontent.com/Cleianderson/RUral.img/master/avisos.png' }} />),
            title: 'Avisos',
            subtitle: 'Aqui serão mostrados todos os avisos que a CGARU tem pra você, quando houver um novo aviso o botão irá ficar vermelhinho e também chegará uma notificação',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 75, height: 75 }} source={{ uri: 'https://raw.githubusercontent.com/Cleianderson/RUral.img/master/favoritos.png' }} />),
            title: 'Favoritos',
            subtitle: 'Nesse você pode inserir comidas e se houver alguma delas no cardápio o botão ficará amarelado',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 75, height: 75 }} source={{ uri: 'https://raw.githubusercontent.com/Cleianderson/RUral.img/master/sugerir.png' }} />),
            title: 'Sugerir',
            subtitle: 'Aqui você pode nos dar sua sugestão sobre o RU, sobre o app, sobre o que você quiser',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 75, height: 75 }} source={{ uri: 'https://raw.githubusercontent.com/Cleianderson/RUral.img/master/renovar.png' }} />),
            title: 'Renovar',
            subtitle: 'Esse é simples, ele apenas contata o servidor pra ver se a semana que tá no seu celular é a mesma que tá no servidor',
          },
          {
            backgroundColor: constants.PRIMARY_COLOR,
            image: (<Image style={{ width: 350, height: 200 }} source={{ uri: 'https://raw.githubusercontent.com/Cleianderson/RUral.img/master/botoes.png' }} />),
            title: 'A cereja do bolo',
            subtitle: 'Cada dia útil da semana tem um par de botões que mostram o cardápio do almoço e do jantar. Tá vendo ali o botão amarelado?? Isso significa que naquele horário tem algum dos itens favoritos',
          },
        ]}
        nextLabel='Entendi'
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

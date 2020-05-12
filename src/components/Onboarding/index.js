import React, {useContext} from 'react'
import {Image, View, StatusBar} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import OnboardingContext from '../../contexts/OnboardingContext'
import {setItem} from '../../service/Storage'
import FakeMenuButton from './components/FakeMenuButton'

const pages = [
  {
    backgroundColor: '#fff',
    image: <Image style={{width: 400, height: 200}} source={require('../../assets/icon.png')} />,
    title: 'Olá!',
    subtitle: 'Bem-vindx ao app do melhor RU do Brasil, o app RUral, vamos conhecê-lo?',
  },
  {
    backgroundColor: '#fff',
    image: (
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Icon name="alert-box" color="#1b2d4f" size={50} />
        <Icon name="star" color="#1b2d4f" size={50} />
        <Icon name="voice" color="#1b2d4f" size={50} />
        <Icon name="reload" color="#1b2d4f" size={50} />
        <Icon name="information-outline" color="#1b2d4f" size={50} />
      </View>
    ),
    title: 'Funcionalidades',
    subtitle:
      'Existem algumas funcionalidades no app além de mostrar o cardápio, vou te apresentar cada uma delas',
  },
  {
    backgroundColor: '#fff',
    image: <Icon name="alert-box" color="#1b2d4f" size={50} />,
    title: 'Avisos',
    subtitle:
      'Aqui serão mostrados todos os avisos que a CGARU tem para você. Quando houver um novo aviso o botão ficará com uma bolinha, indicando uma nova notificação',
  },
  {
    backgroundColor: '#fff',
    image: <Icon name="star" color="#1b2d4f" size={50} />,
    title: 'Favoritos',
    subtitle:
      'Nesse você pode favoritar as preparações que mais gosta e quando alguma delas estiver no cardápio o botão do almoço e/ou jantar ficará com uma estrela. Também é possível favoritar preparações diretamente do menu',
  },
  {
    backgroundColor: '#fff',
    image: <Icon name="voice" color="#1b2d4f" size={50} />,
    title: 'Sugerir',
    subtitle:
      'Aqui você pode nos dar sua sugestão sobre o RU, sobre o app ou sobre o que quiser. Simples, porém importantíssimo',
  },
  {
    backgroundColor: '#fff',
    image: <Icon name="reload" color="#1b2d4f" size={50} />,
    title: 'Atualizar',
    subtitle:
      'Esse é simples, ele apenas contata o servidor para checar se os dados no seu celular estão atualizados',
  },
  {
    backgroundColor: '#fff',
    image: <Icon name="information-outline" color="#1b2d4f" size={50} />,
    title: 'Informações',
    subtitle:
      'Esse também é simples, ele contém algumas perguntas comuns dos usuários. Sugerirmos que você dê uma olhada',
  },
  {
    backgroundColor: '#fff',
    image: (
      <View style={{width: '90%'}}>
        <FakeMenuButton title="Almoço" horary="10h30m - 14h" />
        <FakeMenuButton title="Jantar" horary="16h30m - 19h" star />
      </View>
    ),
    title: 'A cereja do bolo',
    subtitle:
      'Cada dia útil da semana tem um par de botões que mostra o cardápio do almoço e do jantar. Repare na estrelinha, isso significa que naquele horário tem algum dos seus itens favoritos',
  },
  {
    backgroundColor: '#fff',
    image: <Image style={{width: 400, height: 200}} source={require('../../assets/icon.png')} />,
    title: 'É isso...',
    subtitle:
      'Não esqueça de nos dar sua opinião/sugestão, pois esse é o modo mais fácil de sabermos onde e no que devemos melhorar',
  },
]

const OnboardingComponent = () => {
  const {setOnBoarded} = useContext(OnboardingContext)

  async function finalizeOnboaring() {
    await setItem('@onboarded', {data: true})
    setOnBoarded(true)
  }

  return (
    <Onboarding
      pages={pages}
      nextLabel="Próximo"
      skipLabel="Pular"
      onSkip={finalizeOnboaring}
      onDone={finalizeOnboaring}
      controlStatusBar={false}
    />
  )
}

export default OnboardingComponent

import React, { useContext, useState, useEffect } from 'react'
import { Image, View, Text, Linking } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import OnboardingContext from '../../contexts/OnboardingContext'
import { setItem } from '../../service/Storage'
import { Container, Content, Text as TStyles, Button, ButtonText } from './styles'

import FakeMenuButton from './components/FakeMenuButton'
import Warning from './components/Warning'

const OnboardingComponent = () => {
  const { setOnBoarded } = useContext(OnboardingContext)
  const [accepted, setAccepted] = useState<boolean | undefined>(undefined)

  async function finalizeOnboaring () {
    await setItem('@RUral:onBoarded', { data: true })
    setOnBoarded(true)
  }

  useEffect(() => {
    const writeOneSiganl = async () => await setItem('@RUral:oneSignal', { data: accepted })
    writeOneSiganl()
  }, [accepted])

  const pages = [
    {
      backgroundColor: '#fff',
      image: <Image style={{ width: 300, height: 100 }} source={require('../../assets/icon.png')} />,
      title: 'Olá!',
      subtitle: 'Bem-vindx ao app do melhor RU do Brasil, o app RUral, vamos conhecê-lo?'
    },
    {
      backgroundColor: '#fff',
      image: (
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
          <Icon name="bell-outline" color="#1b2d4f" size={50} />
          <Icon name="star" color="#1b2d4f" size={50} />
          <Icon name="voice" color="#1b2d4f" size={50} />
          <Icon name="settings" color="#1b2d4f" size={50} />
          {/*<Icon name="information-outline" color="#1b2d4f" size={50} />*/}
        </View>
      ),
      title: 'Funcionalidades',
      subtitle:
        'Existem algumas funcionalidades no app além de mostrar o cardápio, vou te apresentar cada uma delas'
    },
    Warning,
    {
      backgroundColor: '#fff',
      image: <Icon name="star" color="#1b2d4f" size={50} />,
      title: 'Favoritos',
      subtitle:
        'Nesse você pode favoritar as preparações que mais gosta e quando alguma delas estiver no ' +
        'cardápio o botão do almoço e/ou jantar ficará com uma estrela. ' +
        'Também é possível favoritar preparações diretamente do menu'
    },
    {
      backgroundColor: '#fff',
      image: <Icon name="voice" color="#1b2d4f" size={50} />,
      title: 'Sugerir',
      subtitle:
        'Aqui você pode nos dar sua sugestão sobre o RU, sobre o app ou sobre o que quiser. ' +
        'Simples, porém importantíssimo'
    },
    // {
    //   backgroundColor: '#fff',
    //   image: <Icon name="reload" color="#1b2d4f" size={50} />,
    //   title: 'Atualizar',
    //   subtitle:
    //     'Esse é simples, ele apenas contata o servidor para checar se os dados no seu celular estão atualizados'
    // },
    // {
    //   backgroundColor: '#fff',
    //   image: <Icon name="information-outline" color="#1b2d4f" size={50} />,
    //   title: 'Informações',
    //   subtitle:
    //     'Esse também é simples, ele contém algumas perguntas comuns dos usuários. Sugerirmos que você dê uma olhada'
    // },
    {
      backgroundColor: '#fff',
      image: (
        <View style={{ width: '90%' }}>
          <FakeMenuButton title="Almoço" horary="10h30m - 14h" />
          <FakeMenuButton title="Jantar" horary="16h30m - 19h" star />
        </View>
      ),
      title: 'A cereja do bolo',
      subtitle:
        'Cada dia útil da semana tem um par de botões que mostra o cardápio do almoço e do jantar. ' +
        'Repare na estrelinha, isso significa que naquele horário tem algum dos seus itens favoritos'
    },
    {
      backgroundColor: '#fff',
      image: <Image style={{ width: 400, height: 200 }} source={require('../../assets/icon.png')} />,
      title: 'É isso...',
      subtitle:
        'Não esqueça de nos dar sua opinião/sugestão, pois esse é o modo mais fácil de sabermos onde e ' +
        'no que devemos melhorar'
    },
    {
      backgroundColor: '#fff',
      title: 'Só mais uma coisa...',
      subtitle: (
        <Container>
          <Content>
            <TStyles>
              Para você ser notificado quando houver novos avisos, nós utilizamos um serviço de notificação
              chamado OneSignal que coleta algumas informações do seu celular para manter o serviço
              gratuíto. Não se preocupe, não são informações sensíveis nem nada do tipo. Abaixo
              está uma lista resumida das informações coletadas
            </TStyles>
            <TStyles>{'\u2022'} Modelo, operadora e sistema operacional do celular</TStyles>
            <TStyles>
              {'\u2022'} Dados de utilização do app (número de vezes aberto e duração de uso)
            </TStyles>
            <TStyles>{'\u2022'} País de acesso</TStyles>
            <TStyles>
              Você pode conferir a lista completa{' '}
              <Text
                style={{
                  color: '#00c',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline'
                }}
                onPress={async () =>
                  await Linking.openURL(
                    'https://documentation.onesignal.com/docs/data-collected-by-the-onesignal-sdk'
                  )
                }>
                aqui
              </Text>
            </TStyles>
            <TStyles>
              Abaixo você pode concordar ou descordar com a coleta de dados. Ainda será possível
              usar o aplicativo mas, você não receberá as notificaçôes
            </TStyles>
          </Content>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <Button
              color="#a00"
              activated={!accepted && accepted !== undefined}
              onPress={() => setAccepted(false)}>
              <ButtonText>Não aceito</ButtonText>
            </Button>
            <Button activated={accepted} onPress={() => setAccepted(true)}>
              <ButtonText>Aceito</ButtonText>
            </Button>
          </View>
        </Container>
      ),
      image: <View />
    }
  ]

  return (
    <Onboarding
      pages={pages}
      nextLabel="Próximo"
      skipLabel="Pular"
      skipToPage={pages.length - 1}
      onDone={finalizeOnboaring}
      controlStatusBar={false}
      showDone={accepted !== undefined}
    />
  )
}

export default OnboardingComponent

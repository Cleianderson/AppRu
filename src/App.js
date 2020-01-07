/* eslint-disable indent */
import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, StatusBar } from 'react-native'
import moment from 'moment'
import OneSignal from 'react-native-onesignal'
import NetInfo from '@react-native-community/netinfo'

import {
  Text,
  Container,
  Content,
  Data,
  InfoDate,
  Button,
  ButtonDetails,
  TextButton,
  ButtonBar,
} from './styles'

import api from './service/Api'
import { getDate, tranformNum2Day } from './service/DateUtils'
import { updateWeekStorage, getItem, setItem } from './service/Storage'

import Modals from './components/Modal'
import Details from './components/Details'
import Warn from './components/Warn'
import Requesting from './components/Requesting'
import DataNull from './components/DataNull'
import Favorite from './components/Favorite'
import Suggestion from './components/Suggestion'
import Icon from './components/Icon'

import constants from './service/constants'

const ARRAY_LAUNCH = [
  'p1',
  'p2',
  'gre',
  'fag',
  'veg',
  'gua',
  'sal',
  'sco',
  'sob',
  'suc',
]
const ARRAY_DINNER = [
  'p1',
  'p2',
  'gre',
  'fag',
  'veg',
  'gua',
  'sal',
  'sopa',
  'sob',
  'suc',
]
const isoWeekOfTomorrow = moment().add(1, 'days').isoWeek()
// const isHermes = () => global.HermesInternal != null

export default function App() {
  /*   DECLARAÇÃO DE VARIÁVEIS    */
  const [foods, setFoods] = useState(Array)
  const [favorites, setFavorites] = useState(Array)
  const [warns, setWarns] = useState(Array)
  const [action, setAction] = useState('')
  const [viewedWarn, setViewedWarn] = useState(true)
  const [contentModal, setContentModal] = useState()
  const [modalVisible, setModalVisible] = useState(false)


  const Page = useRef(Container)// -> Referência para a PageView
  /*   FIM DECLARAÇÃO DE VARIÁVEIS    */

  function arrIncludesFavorites(item) { // -> Verifica quais itens favoritos estão no cardápio
    let a = favorites.filter(fav =>
      JSON.stringify(item).includes(fav.toUpperCase())
    )
    return a.length > 0
  }

  const controllerWeek = {
    requestAndSetWeek: async () => {
      setAction('requestToServer')
      controllerWeek.verifyConnectionAndGetWeek(moment().isoWeek())
    },
    checkWeek: async () => {
      // -> Método responsável por iniciar os dados do cardápio
      const jsonStorage = JSON.parse(await getItem('@week'))
      if (jsonStorage === null || isoWeekOfTomorrow !== jsonStorage.number_week) {
        setAction('requestToServer')
        controllerWeek.verifyConnectionAndGetWeek()
      } else {
        setFoods(jsonStorage.foods)
      }

      // Muda a página para o dia da semana atual
      Page.current.setPage(moment().weekday() > 5 ? 0 : moment().weekday() - 1)

    },
    verifyConnectionAndGetWeek: async (number_week) => {
      if ((await NetInfo.fetch()).isConnected) {
        const { data } = await api.get(`/thisweek?week=${isoWeekOfTomorrow}`)

        number_week = number_week || data.number_week
        if (data === null) {
          setAction('dataNull')
        } else {
          updateWeekStorage(data.data, { number_week })
          setFoods(data.data)
          setAction('')
        }
      } else {
        setAction('networkError')
      }
    }
  }

  const controllerWarn = {
    verifyWarn: async () => {
      // -> Verifica se as notificações locais e do servidor são iguais
      if ((await NetInfo.fetch()).isConnected) {
        const warnsResolve = await api.get('/warn')
        const warnStorage = JSON.parse(await getItem('@warns'))
        const warnResolveDataString = JSON.stringify(warnsResolve.data)
        const warnStorageDataString = warnStorage ? JSON.stringify(warnStorage.data) : '{data:[]}'

        if (warnStorage === null || warnResolveDataString !== warnStorageDataString) {
          setItem('@warns', { data: warnsResolve.data })
          setWarns(warnsResolve.data)
          if (warnResolveDataString.length > warnStorageDataString.length) setViewedWarn(false)
        }
      }
    },
    getWarnsAndStartInterval: async () => {
      // -> Método responsável por iniciar os avisos
      const warnStorage = JSON.parse(await getItem('@warns'))
      setWarns(warnStorage ? warnStorage.data : [])
      controllerWarn.verifyWarn()
      setInterval(controllerWarn.verifyWarn, 10 * 1000)
    }
  }

  async function checkFavorites() {// -> Método responsável por iniciar a lista de favoritos
    const favorites = JSON.parse(await getItem('@favorites'))
    setFavorites(favorites !== null ? favorites.data : [])
  }

  function modifyModal(content, typeAction) {
    setContentModal(content)
    setAction(typeAction)
  }

  // Método responsável por mudar o contéudo do modal se a variárvel action mudar
  useEffect(() => {
    switch (action) {
      case 'networkError':
        setAction('')
        constants.showAlert('Falha na conexão', 'Por favor verifique a conexão com a internet')
        break
      case 'showSuggestion':
        setContentModal(<Suggestion />)
        break
      case 'showFavorites':
        setContentModal(<Favorite />)
        break
      case 'requestToServer':
        setContentModal(<Requesting />)
        break
      case 'dataNull':
        setContentModal(<DataNull />)
        break
      case 'showWarnings':
        setContentModal(
          <View style={{
            backgroundColor: '#fff',
            padding: 10,
            margin: 20,
            borderRadius: 7,
          }}>
            <ScrollView
              contentContainerStyle={{
                justifyContent: 'center',
                flexDirection: 'column-reverse'
              }}
              showsVerticalScrollIndicator={false}
            >
              {warns.length !== 0 ? warns.map((warn, inx) => (
                <Warn key={inx} title={warn.title} content={warn.content} />
              ))
                : <Text style={{ color: '#000', fontSize: 18 }}
                >
                  Nenhum aviso!
                </Text>}
            </ScrollView>
          </View>
        )
        setViewedWarn(true)
        break
    }
    if (action !== '') {
      setModalVisible(true)
    } else {
      checkFavorites()
      setModalVisible(false)
    }
  }, [action])

  useEffect(() => { // -> Método responsável por iniciar o app
    // console.info(`Hermes is ${isHermes()}`)
    OneSignal.init('85b3451d-6f7d-481f-b66e-1f93fe069135')
    controllerWeek.checkWeek()
    controllerWarn.getWarnsAndStartInterval()
    checkFavorites()
    return clearInterval()
  }, [])

  return (
    <Container>
      <StatusBar animated barStyle='light-content' />
      <Content ref={Page}>
        {foods.map((item, inx) => (
          <View key={inx}>
            <InfoDate>
              <Text>{tranformNum2Day(inx)}</Text>
              <Data>{getDate(inx)}</Data>
            </InfoDate>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Button
                style={
                  arrIncludesFavorites(item.almoco) ? { borderColor: '#f9b233' } : {}
                }
                onPress={() => {
                  modifyModal(
                    <Details names={ARRAY_LAUNCH} item={item.almoco} />,
                    'Almoço'
                  )
                }}
              >
                <TextButton>ALMOÇO</TextButton>
                <ButtonDetails>10:30h - 14:00h</ButtonDetails>
              </Button>
              <Button
                style={
                  arrIncludesFavorites(item.jantar) ? { borderColor: '#f9b233' } : {}
                }
                onPress={() => {
                  modifyModal(
                    <Details names={ARRAY_DINNER} item={item.jantar} />,
                    'Jantar'
                  )
                }}
              >
                <TextButton>JANTAR</TextButton>
                <ButtonDetails>16:30h - 19:00h</ButtonDetails>
              </Button>
            </View>
          </View>
        ))}
        <Modals
          visible={modalVisible}
          close={() => setAction('')}
          component={contentModal}
        />
      </Content>
      <ButtonBar>
        <Icon
          style={{
            borderBottomColor: '#f00',
            borderBottomWidth: viewedWarn ? 0 : 1
          }}
          onPress={() => setAction('showWarnings')}
          name='message-alert'
          text='Avisos'
        />
        <Icon onPress={() => setAction('showFavorites')} name='account-star' text='Favoritos' />
        <Icon onPress={() => setAction('showSuggestion')} name='voice' text='Sugerir' />
        <Icon onPress={controllerWeek.requestAndSetWeek} name='reload' text='Renovar' />
      </ButtonBar>
    </Container>
  )
}

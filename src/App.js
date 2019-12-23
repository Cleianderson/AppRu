/* eslint-disable indent */
import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, StatusBar } from 'react-native'
import moment from 'moment'
import OneSignal from 'react-native-onesignal'

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

  // eslint-disable-next-line max-len
  function arrIncludesFavorites(item) { // -> Verifica quais itens favoritos estão no cardápio
    let a = favorites.filter(fav =>
      JSON.stringify(item).includes(fav.toUpperCase())
    )
    return a.length > 0
  }

  async function requestAndSetWeek() { // -> Requisita uma semana
    setAction('requestToServer')

    const { data } = await api.get(`/thisweek?week=${isoWeekOfTomorrow}`)

    if (data === null) {
      setAction('dataNull')
    } else {
      updateWeekStorage(data.data, { number_week: moment().isoWeek() })
      setFoods(data.data)
      setAction('')
    }
  }

  // eslint-disable-next-line max-len
  async function refreshWarn() { // -> Verifica se as notificações locais e do servidor são iguais
    const warnsResolve = await api.get('/warn')
    const warnStorage = JSON.parse(await getItem('@warns'))
    if (warnStorage !== null) {
      if (warnsResolve.data.length !== warnStorage.data.length) {
        setItem('@warns', { data: warnsResolve.data })
        setWarns(warnsResolve.data)
        setViewedWarn(false)
      }
    } else {
      setItem('@warns', { data: warnsResolve.data })
      setWarns(warnsResolve.data)
      setViewedWarn(false)
    }
  }

  async function checkWarn() { // -> Método responsável por iniciar os avisos
    const warnStorage = JSON.parse(await getItem('@warns'))
    setWarns(warnStorage ? warnStorage.data : [])
    setInterval(refreshWarn, 10 * 1000)
  }

  // eslint-disable-next-line max-len
  async function checkWeek() {// -> Método responsável por iniciar os dados do cardápio
    const jsonStorage = JSON.parse(await getItem('@week'))

    if (jsonStorage === null || isoWeekOfTomorrow !== jsonStorage.number_week) {
      // Faz o request ao servidor por uma nova semana
      setAction('requestToServer')
      const { data } = await api.get(`/thisweek?week=${isoWeekOfTomorrow}`)

      if (data === null) {
        setAction('dataNull')
      } else {
        setAction('')
        updateWeekStorage(
          data.data,
          { number_week: data.number_week },
          'Requisição feita ao servidor'
        )
        setFoods(data.data)
      }
    } else {
      updateWeekStorage(jsonStorage.foods, null, 'Requisição feita localmente')
      setFoods(jsonStorage.foods)
    }

    // Muda a página para o dia da semana atual
    Page.current.setPage(moment().weekday() > 5 ? 0 : moment().weekday() - 1)
  }
  
  // eslint-disable-next-line max-len
  async function checkFavorites() {// -> Método responsável por iniciar a lista de favoritos
    const { data } = JSON.parse(await getItem('@favorites'))
    setFavorites(data)
  }

  function modifyModal(content, typeAction) {
    setContentModal(content)
    setAction(typeAction)
  }

  // eslint-disable-next-line max-len
  useEffect(() => {// -> Método responsável por mudar o contéudo do modal se a variável action mudar
    switch (action) {
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
    checkWeek()
    checkWarn()
    checkFavorites()
    return clearInterval()
  }, [])

  return (
    <Container>
      <StatusBar backgroundColor='#1b2d4f' animated barStyle='light-content' />
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
                  // eslint-disable-next-line max-len
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
                  // eslint-disable-next-line max-len
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
          onPress={() => {
            setAction('showWarnings')
            setViewedWarn(true)
          }}
          name='message-alert'
          text='Avisos'
        />
        <Icon
          onPress={() => setAction('showFavorites')}
          name='account-star'
          text='Favoritos'
        />
        <Icon
          onPress={() => setAction('showSuggestion')}
          name='voice'
          text='Sugerir'
        />
        <Icon onPress={requestAndSetWeek} name='reload' text='Renovar' />
      </ButtonBar>
    </Container>
  )
}

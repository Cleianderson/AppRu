/* eslint-disable indent */
import React, { useState, useEffect, useRef } from 'react'
import { View, StatusBar } from 'react-native'
import moment from 'moment'
import OneSignal from 'react-native-onesignal'
import NetInfo from '@react-native-community/netinfo'

import {
  Container,
  Content,
  ButtonBar,
} from './styles'

import api from './service/Api'
import { updateWeekStorage, getItem, setItem } from './service/Storage'

import Modals from './components/Modal'
import Warn from './components/Warn'
import Requesting from './components/Requesting'
import ButtonMenu from './components/ButtonMenu'
import DataNull from './components/DataNull'
import Favorite from './components/Favorite'
import Suggestion from './components/Suggestion'
import Icon from './components/Icon'

import constants from './service/constants'
import WeekIndicator from './components/WeekIndicator'

const isoWeekOfTomorrow = moment().add(1, 'days').isoWeek()
// const isHermes = () => global.HermesInternal != null

export default function App() {
  /*   DECLARAÇÃO DE VARIÁVEIS    */
  const [foods, setFoods] = useState(Array)
  const [pagePos, setPagePos] = useState(0)
  const [favorites, setFavorites] = useState(Array)
  const [warns, setWarns] = useState(Array)
  const [thereIsWarn, setThereIsWarn] = useState(false)
  const [contentModal, setContentModal] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)


  const Page = useRef(Container)// -> Referência para a PageView
  /*   FIM DECLARAÇÃO DE VARIÁVEIS    */

  function itemIsInclude(item) { // -> Verifica quais itens favoritos estão no cardápio
      const arr = favorites.filter(fav => {
        let dinner = constants.ARRAY_DINNER.map(unit => item[unit])
        let launch = constants.ARRAY_LAUNCH.map(unit => item[unit])
        
        dinner = dinner.filter(unit => unit!== undefined)
        launch = launch.filter(unit => unit!== undefined)
        
        return (dinner.includes(fav.toUpperCase()) || launch.includes(fav.toUpperCase()))
      })
      return arr.length > 0
  }

  const controllerWeek = {
    requestAndSetWeek: async () => {
      setContentModal(<Requesting />)
      await controllerWeek.verifyConnectionAndGetWeek()
    },
    checkWeek: async () => {
      // -> Método responsável por iniciar os dados do cardápio
      const jsonStorage = JSON.parse(await getItem('@week'))
      if (jsonStorage === null || isoWeekOfTomorrow !== jsonStorage.number_week) {
        setContentModal(<Requesting />)
        await controllerWeek.verifyConnectionAndGetWeek()
      } else {
        setFoods(jsonStorage.foods)
      }

      // Muda a página para o dia da semana atual
      Page.current.setPage(moment().isoWeekday() > 4 ? 0 : moment().isoWeekday())

    },
    verifyConnectionAndGetWeek: async () => {
      if ((await NetInfo.fetch()).isConnected) {
        const { data } = await api.get(`/thisweek?week=${isoWeekOfTomorrow}`)

        if (data === null) {
          setContentModal(<DataNull />)
        } else {
          updateWeekStorage(data.data, { number_week: data.number_week })
          setFoods(data.data)
          setContentModal(null)
        }
      } else {
        setContentModal(null)
        constants.showAlert('Falha na conexão', 'Por favor verifique a conexão com a internet')
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
          await setItem('@warns', { data: warnsResolve.data })
          await setWarns(warnsResolve.data)
        }
        if (warnResolveDataString.length > warnStorageDataString.length) {
          setThereIsWarn(true)
          setItem('@thereIsWarn', { value: true })
        }
      }
    },
    startWarning: async () => {
      // -> Método responsável por iniciar os avisos
      const warnStorage = JSON.parse(await getItem('@warns'))
      setWarns(warnStorage ? warnStorage.data : [])

      await setThereIsWarn((JSON.parse(await getItem('@thereIsWarn')) || { value: false }).value)

      controllerWarn.verifyWarn()
      // setInterval(controllerWarn.verifyWarn, 10 * 1000)
    },
  }

  const actions = {
    warning: () => {
      setContentModal(<Warn warns={warns} />)
      setThereIsWarn(false)
      setItem('@thereIsWarn', { value: false })
    },
    favorite: () => setContentModal(<Favorite favorites={favorites} />),
    suggestion: () => setContentModal(<Suggestion />),
  }

  async function checkFavorites() {// -> Método responsável por iniciar a lista de favoritos
    const favorites = JSON.parse(await getItem('@favorites'))
    setFavorites(favorites !== null ? favorites.data : [])
  }

  // Método responsável por mudar o contéudo do modal se a variárvel action mudar
  useEffect(() => {
    if (contentModal !== null) {
      setModalVisible(true)
    } else {
      checkFavorites()
      setModalVisible(false)
    }
  }, [contentModal])

  useEffect(() => { // -> Método responsável por iniciar o app
    // console.info(`Hermes is ${isHermes()}`)
    OneSignal.init('85b3451d-6f7d-481f-b66e-1f93fe069135')
    OneSignal.addEventListener('received', async (not)=>{
      await setItem('@warns', { data: not.payload.additionalData.warns })
      setWarns(not.payload.additionalData.warns)
      setThereIsWarn(true)
      setItem('@thereIsWarn', { value: true })
    })
    controllerWeek.checkWeek()
    controllerWarn.startWarning()
    checkFavorites()
  }, [])

  return (
    <Container>
      <StatusBar animated barStyle='light-content' />
      <WeekIndicator day={pagePos} press={Page.current.setPage} />
      <Content 
        ref={Page}
        onPageSelected={ev => setPagePos(ev.nativeEvent.position)}
      >
        {foods.map((item, inx) => (
            <View
            key={inx}
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <ButtonMenu
                onPress={setContentModal}
                type='launch'
                item={item.almoco}
                isIncluded={itemIsInclude}
              />
              <ButtonMenu
                onPress={setContentModal}
                type='dinner'
                item={item.jantar}
                isIncluded={itemIsInclude}
              />
            </View>
        ))}
      </Content>
        <Modals
          visible={modalVisible}
          close={() => setContentModal(null)}
          component={contentModal}
        />
      <ButtonBar>
        <Icon
          style={{
            borderBottomColor: '#f00',
            borderBottomWidth: thereIsWarn ? 1 : 0
          }}
          onPress={actions.warning}
          name='message-alert'
          text='Avisos'
        />
        <Icon onPress={actions.favorite}
          name='account-star' text='Favoritos'
        />
        <Icon onPress={actions.suggestion} name='voice' text='Sugerir' />
        <Icon onPress={controllerWeek.requestAndSetWeek} name='reload' text='Renovar' />
      </ButtonBar>
    </Container>
  )
}

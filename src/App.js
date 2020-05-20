import 'react-native-gesture-handler'

/* eslint-disable indent */
import React, {useState, useEffect, useRef} from 'react'
import moment from 'moment'
import OneSignal from 'react-native-onesignal'
import NetInfo from '@react-native-community/netinfo'

import {Container, Content, ButtonBar} from './styles'

import api from './service/Api'
import {updateWeekStorage, getItem, setItem} from './service/Storage'

import Modals from './components/Modal'
import DataNull from './components/DataNull'
import Requesting from './components/Requesting'
import constants from './service/constants'

import Home from './routes/Home'

import DataContext from './contexts/DataContext'

const isoWeekOfTomorrow = moment().add(1, 'days').isoWeek()
const weekDay = moment().isoWeekday()

export default function App() {
  const [foods, setFoods] = useState([])
  const [day, setDay] = useState(weekDay >= 1 && weekDay <= 5 ? weekDay - 1 : 0)
  const [favorites, setFavorites] = useState([''])
  const [warns, setWarns] = useState([])
  const [thereIsWarn, setThereIsWarn] = useState(false)
  const [contentModal, setContentModal] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const controllerWeek = {
    requestAndSetWeek: async () => {
      setContentModal(<Requesting />)
      await controllerWeek.verifyConnectionAndRefresh()
    },
    checkWeek: async () => {
      // -> Método responsável por iniciar os dados do cardápio
      const jsonStorage = JSON.parse(await getItem('@week'))
      if (jsonStorage === null || isoWeekOfTomorrow !== jsonStorage.number_week) {
        setContentModal(<Requesting />)
        await controllerWeek.verifyConnectionAndRefresh()
      } else {
        setFoods(jsonStorage.foods)
      }

      // Muda a página para o dia da semana atual
      // Page.current.setPage(weekDay >= 1 && weekDay <= 5 ? weekDay - 1 : 0);
    },
    verifyConnectionAndRefresh: async () => {
      if ((await NetInfo.fetch()).isConnected) {
        setContentModal(<Requesting />)
        const {data} = await api.get(`/thisweek?week=11`)
        await controllerWarn.verifyWarn()

        if (data === null) {
          setContentModal(<DataNull />)
        } else {
          updateWeekStorage(data.data, {number_week: data.number_week})
          setFoods(data.data)
          setContentModal(null)
        }
      } else {
        setContentModal(null)
        constants.showAlert('Falha na conexão', 'Por favor verifique a conexão com a internet')
      }
    },
  }

  const controllerWarn = {
    verifyWarn: async () => {
      // -> Verifica se as notificações locais e do servidor são iguais
      if ((await NetInfo.fetch()).isConnected) {
        const warnsResolve = await api.get('/warn')
        let warnsStorage = JSON.parse(await getItem('@warns'))

        if (warnsStorage === null) {
          await setItem('@warns', {data: warnsResolve.data})
          warnsStorage = {data: warnsResolve.data}
        }

        const resolveIds = warnsResolve.data.map((w) => w._id)
        const storageIds = warnsStorage.data.map((w) => w._id)

        const thereIsNewWarn = !resolveIds.every((resolveId) => storageIds.includes(resolveId))

        await setItem('@warns', {data: warnsResolve.data})
        setWarns(warnsResolve.data)

        if (thereIsNewWarn) {
          setThereIsWarn(true)
          setItem('@thereIsWarn', {value: true})
        }
      }
    },
    startWarning: async () => {
      // -> Método responsável por iniciar os avisos
      const warnsStorage = JSON.parse(await getItem('@warns'))
      setWarns(warnsStorage ? warnsStorage.data : [])

      setThereIsWarn((JSON.parse(await getItem('@thereIsWarn')) || {value: false}).value)

      controllerWarn.verifyWarn()
    },
  }

  async function loadFavorites() {
    // -> Método responsável por iniciar a lista de favoritos
    const favorites = JSON.parse(await getItem('@favorites'))
    setFavorites(favorites !== null ? favorites.data : [])
  }

  const updateThereIsWarn = async (value) => {
    setThereIsWarn(value)
    await setItem('@thereIsWarn', {value})
  }

  const addFavorites = async (str = '') => {
    await setItem('@favorites', {data: [...favorites, str]})
    setFavorites([...favorites, str])
  }
  const removeFavorites = (str = '') => {
    const favoritesFiltered = favorites.filter((value) => value.toLowerCase() !== str.toLowerCase())
    setFavorites(favoritesFiltered)
    setItem('@favorites', {data: favoritesFiltered})
  }

  // Método responsável por mudar o contéudo do modal se a variárvel action mudar
  useEffect(() => {
    if (contentModal !== null) {
      setModalVisible(true)
    } else {
      loadFavorites()
      setModalVisible(false)
    }
  }, [contentModal])

  useEffect(() => {
    const initalizeOneSignal = async () => {
      OneSignal.setRequiresUserPrivacyConsent(true)

      const {value} = JSON.parse(await getItem('@RUral:oneSignal'))

      OneSignal.provideUserConsent(value)

      OneSignal.init('85b3451d-6f7d-481f-b66e-1f93fe069135')
      OneSignal.addEventListener('received', async (pushNot) => {
        await setItem('@warns', {data: pushNot.payload.additionalData.warns})
        setWarns(pushNot.payload.additionalData.warns)
        setThereIsWarn(true)
        setItem('@thereIsWarn', {value: true})
      })
      process.env.NODE_ENV !== 'production' &&
        console.log('UserConsent: ', await OneSignal.userProvidedPrivacyConsent())
    }

    initalizeOneSignal()
    controllerWeek.checkWeek()
    controllerWarn.startWarning()
    loadFavorites()
  }, [])

  return (
    <DataContext.Provider
      value={{
        favorites,
        addFavorites,
        removeFavorites,
        setFavorites,
        warns,
        thereIsWarn,
        updateThereIsWarn,
        foods,
        day,
        setDay,
        reload: controllerWeek.verifyConnectionAndRefresh,
      }}>
      <Container>
        <Home />
        <Modals
          visible={modalVisible}
          close={() => setContentModal(null)}
          component={contentModal}
        />
      </Container>
    </DataContext.Provider>
  )
}

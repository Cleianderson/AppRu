import 'react-native-gesture-handler'

import React, { useState, useEffect } from 'react'
import moment from 'moment'
import OneSignal from 'react-native-onesignal'
import NetInfo from '@react-native-community/netinfo'

import { Container } from './styles'

import api from './service/Api'
import { updateWeekStorage, getItem, setItem } from './service/Storage'

import Requesting from './components/Requesting'
import constants from './service/constants'

import Main from './routes/Main'

import DataContext from './contexts/DataContext'

const isoWeekOfTomorrow = moment().add(1, 'days').isoWeek()
const weekDay = moment().isoWeekday()

export default function App () {
  const [foods, setFoods] = useState<Table[]>()
  const [day, setDay] = useState(weekDay >= 1 && weekDay <= 5 ? weekDay - 1 : 0)
  const [favorites, setFavorites] = useState<string[]>([])
  const [warns, setWarns] = useState<WarningType[]>()
  const [thereIsWarn, setThereIsWarn] = useState(false)
  const [homeViewPage, setHomeViewPage] = useState<JSX.Element>()
  // eslint-disable-next-line no-extra-parens
  const [action, setAction] = useState<() => Promise<any >>(async () => false)
  const [failedText, setFailedText] = useState('')

  const controllerWeek = {
    requestAndSetWeek: async () => {
      setAction(controllerWeek.verifyConnectionAndRefresh)
      // await controllerWeek.verifyConnectionAndRefresh()
    },
    checkWeek: async () => {
      // -> Método responsável por iniciar os dados do cardápio
      const weekFromStorage = await getItem<Week>('@week')
      const jsonStorage = weekFromStorage.data

      if (jsonStorage === null || isoWeekOfTomorrow !== jsonStorage.number_week) {
        setAction(controllerWeek.verifyConnectionAndRefresh)
      } else {
        setFoods(jsonStorage.data || [])
      }
    },
    verifyConnectionAndRefresh: async () => {
      if ((await NetInfo.fetch()).isConnected) {
        setFailedText('O cardápio ainda não está disponível')
        setAction(async () => {
          const { data } = await api.get(`/thisweek?week=${isoWeekOfTomorrow}`)
          await controllerWarn().verifyWarn()
          if (data) {
            updateWeekStorage(data.data, { number_week: data.number_week })
            setFoods(data.data)
            // setAction(null)
            return true
          }
          return false
        })
      } else {
        // setAction(async () => false)
        constants.showAlert('Falha na conexão', 'Por favor verifique a conexão com a internet')
      }
    }
  }

  const controllerWarn = () => {
    const verifyWarn = async () => {
      // -> Verifica se as notificações locais e do servidor são iguais
      if ((await NetInfo.fetch()).isConnected) {
        const warnsResolve = await api.get<WarningType[]>('/warn')
        const warnsFromStorage = await getItem<WarningType[]>('@warns')

        let warnsStorage = warnsFromStorage.data

        if (warnsStorage === null) {
          await setItem('@warns', { data: warnsResolve.data })
          warnsStorage = warnsResolve.data
        }

        const resolveIds = warnsResolve.data.map((w) => w._id)
        const storageIds = warnsStorage.map((w) => w._id)

        const thereIsNewWarn = !resolveIds.every((resolveId) => storageIds.includes(resolveId))

        await setItem('@warns', { data: warnsResolve.data })
        setWarns(warnsResolve.data)

        if (thereIsNewWarn) {
          setThereIsWarn(true)
          setItem('@thereIsWarn', { value: true })
        }
      }
    }

    const startWarning = async () => {
      // -> Método responsável por iniciar os avisos
      const warnsFromStorage = await getItem<WarningType[]>('@warns')
      const warnsStorage = warnsFromStorage.data
      setWarns(warnsStorage || [] as WarningType[])

      const thereIsNewWarn = await getItem<boolean>('@thereIsWarn')
      setThereIsWarn((thereIsNewWarn.data || false))

      verifyWarn()
    }

    return { verifyWarn, startWarning }
  }

  async function loadFavorites () {
    // -> Método responsável por iniciar a lista de favoritos
    const favorites = (await getItem<string[]>('@favorites')).data
    setFavorites(favorites !== null ? favorites : [])
  }

  const updateThereIsWarn = async (value: boolean) => {
    await setItem('@thereIsWarn', { data: value })
    setThereIsWarn(value)
  }

  const addFavorites = async (str: string) => {
    await setItem('@favorites', { data: [...favorites, str] })
    setFavorites([...favorites, str])
  }

  const removeFavorites = async (str: string) => {
    const favoritesFiltered = favorites.filter((value) => value.toLowerCase() !== str.toLowerCase())
    setFavorites(favoritesFiltered)
    await setItem('@favorites', { data: favoritesFiltered })
  }

  const reload = () => {
    setAction(async () => {
      await controllerWeek.verifyConnectionAndRefresh()
      await controllerWarn().verifyWarn()
    })
  }

  useEffect(() => {
    const initalizeOneSignal = async () => {
      OneSignal.setRequiresUserPrivacyConsent(true)

      const value = (await getItem<boolean>('@RUral:oneSignal')).data || false

      OneSignal.provideUserConsent(value)

      OneSignal.init('85b3451d-6f7d-481f-b66e-1f93fe069135')
      OneSignal.addEventListener('received', async (pushNot: any) => {
        await setItem('@warns', { data: pushNot.payload.additionalData.warns })
        setWarns(pushNot.payload.additionalData.warns)
        setThereIsWarn(true)
        await setItem('@thereIsWarn', { data: true })
      })
    }

    initalizeOneSignal()
    controllerWeek.checkWeek()
    controllerWarn().startWarning()
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
        homeViewPage,
        setHomeViewPage,
        reload
      }}>
      <Container>
        <Main />
        <Requesting action={action} onFailedText={failedText} />
      </Container>
    </DataContext.Provider>
  )
}

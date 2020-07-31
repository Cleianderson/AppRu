import 'react-native-gesture-handler'

import React, { useEffect, useContext } from 'react'
import moment from 'moment'
import OneSignal from 'react-native-onesignal'
import NetInfo from '@react-native-community/netinfo'

import { Container } from './styles'

import api from './service/Api'
import { updateWeekStorage, getItem, setItem } from './service/Storage'

import constants from './service/constants'

import Main from './routes/Main'

import StateContext from './contexts/DataContext'
import RequestContext from './contexts/RequestContext'

const isoWeekOfTomorrow = moment().add(1, 'days').isoWeek()

const App: React.FC = () => {
  const { setFoods, setWarns, setThereIsWarn } = useContext(StateContext)
  const { setAction } = useContext(RequestContext)

  const checkWeek = async () => {
    // -> Método responsável por iniciar os dados do cardápio
    const weekFromStorage = await getItem<Week>('@week')
    const jsonStorage = weekFromStorage.data

    if (jsonStorage === null || isoWeekOfTomorrow !== jsonStorage.number_week) {
      setAction(verifyConnectionAndRefresh)
    } else {
      setFoods(jsonStorage.data || [])
    }
  }
  const verifyConnectionAndRefresh = async () => {
    if ((await NetInfo.fetch()).isConnected) {
      // setFailedText('O cardápio ainda não está disponível')
      setAction(async () => {
        const { data } = await api.get(`/thisweek?week=${'11' || isoWeekOfTomorrow}`)
        await verifyWarn()
        if (data) {
          updateWeekStorage(data.data, { number_week: data.number_week })
          setFoods(data.data)
          return true
        }
        return false
      })
    } else {
      constants.showAlert('Falha na conexão', 'Por favor verifique a conexão com a internet')
    }
  }

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
    checkWeek()
    startWarning()
  }, [])

  return (
    <Container>
      <Main />
    </Container>
  )
}

export default App

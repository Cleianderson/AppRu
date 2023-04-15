import { createDrawerNavigator } from '@react-navigation/drawer'
import moment from 'moment'
import React, { useEffect } from 'react'
import OneSignal from 'react-native-onesignal'
import { useDispatch, useSelector } from 'react-redux'

import Main from '~/routes/Main'
import { getItem } from '~/service/Storage'
import { Container } from '~/styles'
import { StorageActionTypes } from '~/utils/enums'


const isoWeekOfTomorrow = moment().add(1, 'days').isoWeek()

const MainScreen: React.FC = () => {
  const dispatch = useDispatch()

  const favorites = useSelector<RootState, string[]>(state => state.storageState.favorites)
  const warns = useSelector<RootState, WarningType[] | undefined>(state => state.mainState.warns)
  // const warnings = useSelector<RootState, WarningType[]>(state => state.storageState.warnings)

  // const setFoods = (foods: any) => dispatch({ type: 'SET_FOODS', payload: { foods } })
  // const setWarns = (warns: any) => dispatch({ type: 'SET_WARNS', payload: { warns } })
  // const setThereIsWarn = (thereIsWarn: boolean) => dispatch({ type: 'SET_THERE_IS_WARN', payload: { thereIsWarn } })

  // const setAction = (fn: string) => dispatch({ type: 'SET_ACTION', payload: { action: fn } })
  const setDay = (day: number) => dispatch({ type: 'SET_DAY', payload: { day } })

  // const checkWeek = async () => {
  //   // -> Método responsável por iniciar os dados do cardápio
  //   const jsonStorage = await getItem<Week>('@week')

  //   if (jsonStorage === null || isoWeekOfTomorrow !== jsonStorage.number_week) {
  //     setAction('requestWeek')
  //   } else {
  //     setFoods(jsonStorage.foods || [])
  //   }
  // }
  // const verifyConnectionAndRefresh = async () => {
  //   if ((await NetInfo.fetch()).isConnected) {
  //     setTextFailed('O cardápio ainda não está disponível')
  //     setTextSuccess('Cardápio atualizado!')
  //     setAction('requestWeek')
  //   } else {
  //     setTextFailed('Falha na conexão')
  //     return false
  //   }
  // }

  // const verifyWarn = async () => {
  //   // -> Verifica se as notificações locais e do servidor são iguais
  //   if ((await NetInfo.fetch()).isConnected) {
  //     try {
  //       const warnsResolve = await api.get<WarningType[]>('/warn')
  //       const warnsFromStorage = await getItem<WarningType[]>('@warns')

  //       let warnsStorage = warnsFromStorage.data

  //       if (warnsStorage === null) {
  //         await setItem('@warns', { data: warnsResolve.data })
  //         warnsStorage = warnsResolve.data
  //       }

  //       const resolveIds = warnsResolve.data.map((w) => w._id)
  //       const storageIds = warnsStorage.map((w) => w._id)

  //       const thereIsNewWarn = !resolveIds.every((resolveId) => storageIds.includes(resolveId))

  //       await setItem('@warns', { data: warnsResolve.data })
  //       setWarns(warnsResolve.data)

  //       if (thereIsNewWarn) {
  //         setThereIsWarn(true)
  //         setItem('@thereIsWarn', { data: true })
  //       }
  //     } catch {
  //       // pass
  //     }
  //   }
  // }

  // const startWarning = async () => {
  //   // -> Método responsável por iniciar os avisos
  //   const warnsFromStorage = await getItem<WarningType[]>('@warns')
  //   const warnsStorage = warnsFromStorage.data
  //   setWarns(warnsStorage || [] as WarningType[])

  //   const thereIsNewWarn = await getItem<boolean>('@thereIsWarn')
  //   setThereIsWarn((thereIsNewWarn.data || false))

  //   verifyWarn()
  // }

  useEffect(() => {
    const initalizeOneSignal = async () => {
      OneSignal.setRequiresUserPrivacyConsent(true)

      const value = (await getItem<boolean>('@RUral:oneSignal')).data || false

      OneSignal.provideUserConsent(value)

      const appId = __DEV__ ? '9cf90441-8151-4e1a-91a5-ce90b102410c' : '85b3451d-6f7d-481f-b66e-1f93fe069135'

      OneSignal.init(appId)
      OneSignal.addEventListener('received', async (pushNot: any) => {
        // await setItem('@warns', { data: pushNot.payload.additionalData.warns })
        // setWarns(pushNot.payload.additionalData.warns)
        // setThereIsWarn(true)
        dispatch({type: StorageActionTypes.getWarnings})
        // await setItem('@thereIsWarn', { data: true })
      })
    }
    let _day = new Date(Date.now()).getDay() - 1
    _day = _day > 4 || _day < 0 ? 0 : _day
    setDay(_day)

    initalizeOneSignal()
    // dispatch({type: StorageActionTypes.getFavorites})
    dispatch({type: StorageActionTypes.getWeek})
    // dispatch({type: StorageActionTypes.getWarnings})
  }, [])

  useEffect(() => {
    // const writeWarns = async () => (await setItem('@warns', { data: warns }))
    // writeWarns()
  // }, [warns])
  }, [])

  return (
    <Container>
      <Main />
    </Container>
  )
}

export default MainScreen

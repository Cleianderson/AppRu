import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { View, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native'
import Storage from '@react-native-community/async-storage'

import api from './service/Api'
import { Text, Container, Content, Data, InfoDate } from './styles'
import Options from './components/Page'
import Modals from './components/Modal'

const nowWeek = moment().weeksInYear()

export default function App() {
  const [foods, setFoods] = useState(Array)
  const [names, setNames] = useState(Array)
  const [action, setAction] = useState('')
  const [data, setData] = useState(JSON)
  const Component = useRef(Container)

  function getDate(inx) {
    const date = moment().isoWeekday(inx + 1)
    return date.format('DD/MM/YY')
  }

  function tranformNum2Day(inx) {
    switch (inx) {
    case 1:
      return 'TERÇA'
    case 2:
      return 'QUARTA'
    case 3:
      return 'QUINTA'
    case 4:
      return 'SEXTA'
    }
    return 'SEGUNDA'
  }

  function getAndSetData() {
    api
      .get('/thisweek')
      .then(({ data }) => {
        setFoods(data)
        Storage.setItem(
          '@week',
          JSON.stringify({
            week: nowWeek,
            foods: data
          })
        )
        ToastAndroid.show('Requisição feita ao servidor', ToastAndroid.LONG)
      })
      .catch(() => {})
  }

  useEffect(() => {
    Storage.getItem('@week')
      .then(dataLocal => {
        const localData = JSON.parse(dataLocal)
        if (localData === null || localData.week !== nowWeek) {
          getAndSetData()
        } else {
          setFoods(localData.foods)
          ToastAndroid.show('Requisição feita localmente', ToastAndroid.LONG)
        }
        Component.current.setPageWithoutAnimation(
          moment().weekday() > 5 ? 0 : moment().weekday() - 1
        )
      })
      .catch(() => {
        alert('Houve um erro!')
      })
  }, [])

  return (
    <Container>
      <StatusBar backgroundColor="#1b2d4f" />
      <Content ref={Component}>
        {foods.map((item, inx) => (
          <View key={inx}>
            <InfoDate>
              <Text>{tranformNum2Day(inx)}</Text>
              <Data>{getDate(inx)}</Data>
            </InfoDate>
            <Options
              firstAction={() => {
                setAction('Almoço')
                setNames([
                  'p1',
                  'p2',
                  'gre',
                  'fag',
                  'veg',
                  'gua',
                  'sal',
                  'sco',
                  'sob',
                  'suc'
                ])
                setData(item.almoco)
              }}
              secondAction={() => {
                setAction('Jantar')
                setNames([
                  'p1',
                  'p2',
                  'gre',
                  'fag',
                  'veg',
                  'gua',
                  'sal',
                  'sopa',
                  'sob',
                  'suc'
                ])
                setData(item.jantar)
              }}
            />
          </View>
        ))}
        <Modals
          visible={Boolean(action)}
          close={() => setAction('')}
          data={data}
          names={names}
        />
      </Content>
      <TouchableOpacity onPress={() => getAndSetData()}>
        <Text style={{ fontSize: 16, marginVertical: 10, color: 'gray' }}>
          ATUALIZAR
        </Text>
      </TouchableOpacity>
    </Container>
  )
}

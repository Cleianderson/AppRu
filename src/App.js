import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import {
  View,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  Linking,
} from 'react-native'

import { Text, Container, Content, Data, InfoDate } from './styles'

import api from './service/Api'
import { getDate, tranformNum2Day } from './service/DateUtils'
import { getWeek, setWeek } from './service/Storage'

import Options from './components/Page'
import Modals from './components/Modal'
import Details from './components/Details'

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

export default function App() {
  const [foods, setFoods] = useState(Array)
  const [names, setNames] = useState(Array)
  const [action, setAction] = useState('')
  const [data, setData] = useState(JSON)
  const Page = useRef(Container)

  async function checkWeekAndSetFoods() {
    const nowWeek = moment().isoWeek()

    const storage = await getWeek('@week')
    const jsonStorage = JSON.parse(storage)

    if (jsonStorage === null || jsonStorage.number_week !== nowWeek) {
      const { data } = await api.get('/thisweek')
      setFoods(data.data)
      await setWeek('@week', data.number_week, data.data)
      ToastAndroid.show('Requisição feita ao servidor', ToastAndroid.LONG)
    } else {
      setFoods(jsonStorage.foods)
      ToastAndroid.show('Requisição feita localmente', ToastAndroid.LONG)
    }

    Page.current.setPage(moment().weekday() > 5 ? 0 : moment().weekday() - 1)
  }

  useEffect(() => {
    checkWeekAndSetFoods()
  }, [])

  return (
    <Container>
      <StatusBar backgroundColor='#1b2d4f' />
      <Content ref={Page}>
        {foods.map((item, inx) => (
          <View key={inx}>
            <InfoDate>
              <Text>{tranformNum2Day(inx)}</Text>
              <Data>{getDate(inx)}</Data>
            </InfoDate>
            <Options
              firstAction={() => {
                setAction('Almoço')
                setNames(ARRAY_LAUNCH)
                setData(item.almoco)
              }}
              secondAction={() => {
                setAction('Jantar')
                setNames(ARRAY_DINNER)
                setData(item.jantar)
              }}
            />
          </View>
        ))}
        <Modals
          visible={Boolean(action)}
          close={() => setAction('')}
          component={<Details item={data} names={names} />}
        />
      </Content>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://github.com/Cleianderson/RUral')}
      >
        <Text style={{ fontSize: 16, marginVertical: 10, color: 'gray' }}>
					SOBRE
        </Text>
      </TouchableOpacity>
    </Container>
  )
}

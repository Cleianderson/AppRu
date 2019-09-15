import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { View } from 'react-native'

import api from './service/Api'
import { Text, Container, Data, InfoDate } from './styles'
import Options from './components/Page'
import Modals from './components/Modal'

export default function App() {
  const [foods, setFoods] = useState(Array)
  const [action, setAction] = useState('')
  const [data, setData] = useState(JSON)

  function getDate(inx) {
    const date = moment().isoWeekday(inx + 1)
    return date.format('DD/MM/YY')
  }

  function tranformNum2Day(inx) {
    switch (inx) {
    case 1:
      return 'Terça'
    case 2:
      return 'Quarta'
    case 3:
      return 'Quinta'
    case 4:
      return 'Sexta'
    }
    return 'Segunda'
  }

  useEffect(() => {
    async function request() {
      const { data } = await api.get('/thisweek')
      setFoods(data)
    }
    request()
  }, [])

  return (
    <Container>
      {foods.map((item, inx) => (
        <View key={inx}>
          <InfoDate>
            <Text>{tranformNum2Day(inx)}</Text>
            <Data>{getDate(inx)}</Data>
          </InfoDate>
          <Options
            firstAction={() => {
              setAction('Almoço')
              setData(item.almoco)
            }}
            secondAction={() => {
              setAction('Jantar')
              setData(item.jantar)
            }}
          />
        </View>
      ))}
      <Modals
        visible={Boolean(action)}
        close={() => setAction('')}
        data={data}
      />
    </Container>
  )
}

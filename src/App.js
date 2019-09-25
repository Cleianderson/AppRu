import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { View, TouchableOpacity } from 'react-native'
import Storage from '@react-native-community/async-storage'

import api from './service/Api'
import { Text, Container, Content, Data, InfoDate } from './styles'
import Options from './components/Page'
import Modals from './components/Modal'
import Loading from './components/Loading'

const nowWeek = moment().weeksInYear()

export default function App() {
  const [foods, setFoods] = useState(Array)
  const [action, setAction] = useState('')
  const [data, setData] = useState(JSON)
  const [errorNetwork, setErrorNetwork] = useState(false)
  const [loaded, setLoaded] = useState(false)
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
    setLoaded(false)
    setErrorNetwork(false)
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
        setLoaded(true)
      })
      .catch(() => {
        setErrorNetwork(true)
      })
  }

  useEffect(() => {
    Storage.getItem('@week')
      .then(dataLocal => {
        const localData = JSON.parse(dataLocal)
        if (localData === null || localData.week !== nowWeek) {
          getAndSetData()
        } else {
          setFoods(localData.foods)
          setLoaded(true)
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
                setData(item.almoco)
              }}
              secondAction={() => {
                setAction('Jantar')
                setData(item.jantar)
              }}
            />
            <TouchableOpacity onPress={() => getAndSetData()}>
              <Text style={{ fontSize: 16, marginVertical: 10, color: 'gray' }}>
                ATUALIZAR
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        <Modals
          visible={Boolean(action)}
          close={() => setAction('')}
          data={data}
        />
      </Content>
      <Loading
        var2error={errorNetwork}
        var2load={loaded}
        title={!loaded && !errorNetwork ? 'Carregando' : 'Erro na rede'}
      />
    </Container>
  )
}

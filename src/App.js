import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import {
  View,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from 'react-native'

import {
  Text,
  Container,
  Content,
  Data,
  InfoDate,
  Button,
  ButtonDetails,
  TextButton
} from './styles'

import api from './service/Api'
import { getDate, tranformNum2Day } from './service/DateUtils'
import { getWeek, setWeek } from './service/Storage'

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
  'suc'
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
  'suc'
]

/*
		A variável contentModal é usada pelo componente Modals 
		como conteúdo a ser exibido, use setContentModal para alterar seu valor

		A variável action é usada pelo componente Modals como 
		controle de visibilidade, use setAction para mudar-la

		A variável foods armazena os dados do cardápio a serem 
		exibidos, use setFoods para alterar seu valor
*/

export default function App() {
  const [foods, setFoods] = useState(Array)
  const [action, setAction] = useState('')
  const [contentModal, setContentModal] = useState()

  const Page = useRef(Container)

  // Atualiza as variáveis food e @week
  async function updateFoodOrWeek(foods, week = null) {
    setFoods(foods)
    if (week !== null) {
      await setWeek('@week', week.number_week, foods)
    }
  }

  async function requestCurrentWeek() {
    setContentModal(
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          justifyContent: 'center',
          margin: 20,
          borderRadius: 4
        }}
      >
        <ActivityIndicator color='#f9b233' size={72} />
        <Text style={{ color: '#000', fontSize: 16 }}>
          FAZENDO REQUISIÇÃO AO SERVIDOR
        </Text>
      </View>
    )
    setAction('requestToServer')

    const { data } = await api.get('/thisweek')

    if (data === null) {
      setContentModal(
        <View
          style={{
            backgroundColor: '#a00',
            padding: 10,
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 25
            }}
          >
            O cardápio dessa semana ainda não está disponível
          </Text>
          <Text>:(</Text>
        </View>
      )
      setAction('dataNull')
    } else {
      updateFoodOrWeek(data.data, { number_week: moment().isoWeek() })
      setAction('')
    }
  }

  // Função que faz requisição ao servidor
  async function checkWeek() {
    const isoWeekOfTomorrow = moment()
      .add(1, 'days')
      .isoWeek()

    const storage = await getWeek('@week')
    const jsonStorage = JSON.parse(storage)

    if (jsonStorage === null || isoWeekOfTomorrow !== jsonStorage.number_week) {
      // Faz o request ao servidor por uma nova semana
      const { data } = await api.get(`/thisweek?week=${isoWeekOfTomorrow}`)

      // Se a semana não estiver disponível
      if (data === null) {
        setContentModal(
          <View
            style={{
              backgroundColor: '#a00',
              padding: 10,
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 25
              }}
            >
              O cardápio dessa semana ainda não está disponível
            </Text>
            <Text>:(</Text>
          </View>
        )
        setAction('dataNull')
      } else {
        updateFoodOrWeek(
          data.data,
          { number_week: data.number_week },
          'Requisição feita ao servidor'
        )
      }
    } else {
      updateFoodOrWeek(jsonStorage.foods, null, 'Requisição feita localmente')
    }

    // Muda a página para o dia da semana atual
    Page.current.setPage(moment().weekday() > 5 ? 0 : moment().weekday() - 1)
  }

  function modifyModal(content, typeAction) {
    setContentModal(content)
    setAction(typeAction)
  }

  useEffect(() => {
    checkWeek()
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
                justifyContent: 'center'
              }}
            >
              <Button
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
          visible={Boolean(action)}
          close={() => setAction('')}
          component={contentModal}
        />
      </Content>
      <TouchableOpacity onPress={requestCurrentWeek}>
        <Text
          style={{
            fontSize: 16,
            color: '#fff',
            margin: 7
          }}
        >
          ATUALIZAR
        </Text>
      </TouchableOpacity>
    </Container>
  )
}

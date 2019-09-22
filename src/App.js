import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { View } from 'react-native'
import Storage from '@react-native-community/async-storage'

import api from './service/Api'
import { Text, Container, Content, Data, InfoDate } from './styles'
import Options from './components/Page'
import Modals from './components/Modal'
import Loading from './components/Loading'

export default function App() {
  const [foods, setFoods] = useState(Array)
  const [action, setAction] = useState('')
  const [data, setData] = useState(JSON)
  const [errorNetwork, setErrorNetwork] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const Dale = useRef(Container)

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
    const nowWeek = moment().weeksInYear()
      
    Storage.getItem('@week').then((dataLocal)=>{
      const localData = JSON.parse(dataLocal)
      if (localData === null || localData.week !== nowWeek){
        api.get('/thisweek').then(({ data }) => {
          setFoods(data)
          Storage.setItem('@week',JSON.stringify({
            week:nowWeek,
            foods:data
          }))
        }).catch(() => {
          setErrorNetwork(true)
        })
      }else{
        setFoods(localData.foods)
      }
      Dale.current.setPageWithoutAnimation(
        moment().weekday() > 5 ? 0 : moment().weekday() - 1)
      setLoaded(true)
    }).catch(()=>{
      alert('Houve um erro!')
    })

  }, [])

  return (
    <Container>
      <Content ref={Dale}>
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
      </Content>
      <Loading vars={[errorNetwork, loaded]} title={
        (!loaded && !errorNetwork) ? 'Carregando' : 'Erro na rede'
      } />
    </Container>
  )
}

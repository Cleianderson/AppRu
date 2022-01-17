import React, { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import constants from '~/service/constants'
import { Container, Content, Button, BText, TxtDate } from './styles'

import Config from '~/contexts/ConfigContext'
import { getDate } from '~/service/DateUtils'
import { View } from 'react-native'

export default function WeekIndicator(props) {

  const { configs } = useContext(Config)
  const day = useSelector<RootState, number>(state => state.mainState.day)

  return (
    <Container>
      <Content>
        {constants.STRING_DAYS.map((strDay, index) => (
          <View key={index} >
            <Button
              onPress={() => props.press(index)}
              hitSlop={{ top: 5, bottom: 10, left: 5, right: 5 }}>
              <BText selected={day === index}>{strDay}</BText>
              {configs.showDateOnIndicator && <TxtDate selected={day === index} >{getDate(index)}</TxtDate>}
            </Button>
            {day === index && <View
              style={{
                height: 3,
                backgroundColor: '#f9b233',
                borderRadius: 50,
              }}
            />}
          </View>
        ))}
      </Content>
    </Container>
  )
}

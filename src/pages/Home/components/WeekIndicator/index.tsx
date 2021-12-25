import React, { useContext, useEffect, useRef } from 'react'
import { Dimensions, Animated } from 'react-native'
import { useSelector } from 'react-redux'

import constants from '~/service/constants'
import { Container, Content, Button, BText, TxtDate } from './styles'

import Config from '~/contexts/ConfigContext'
import { getDate } from '~/service/DateUtils'

export default function WeekIndicator(props) {
  const animatedMargin = useRef(new Animated.Value(0)).current

  const { configs } = useContext(Config)
  const day = useSelector<RootState, number>(state => state.mainState.day)

  useEffect(() => {
    Animated.timing(animatedMargin, {
      toValue: (Dimensions.get('screen').width / 5) * day,
      duration: 150,
      useNativeDriver: false
    }).start()
  }, [day])

  return (
    <Container>
      <Content>
        {constants.STRING_DAYS.map((day, index) => (
          <Button
            key={index}
            onPress={() => props.press(index)}
            hitSlop={{ top: 5, bottom: 10, left: 5, right: 5 }}>
            <BText selected={props.day === index}>{day}</BText>
            {configs.showDateOnIndicator && <TxtDate selected={props.day === index} >{getDate(index)}</TxtDate>}
          </Button>
        ))}
      </Content>
      <Animated.View
        style={{
          height: 3,
          backgroundColor: '#f9b233',
          width: Dimensions.get('screen').width / 5,
          borderRadius: 50,
          marginLeft: animatedMargin
        }}
      />
    </Container>
  )
}

import React, {useState, useContext, useEffect, useRef} from 'react'
import {Dimensions, View, Animated} from 'react-native'

import constants from '../../../../service/constants'
import {Container, Content, Button, BText} from './styles'

import DataContext from '../../../../contexts/DataContext'

export default function WeekIndicator(props) {
  const animatedMargin = useRef(new Animated.Value(0)).current

  const {day} = useContext(DataContext)

  useEffect(() => {
    Animated.spring(animatedMargin, {
      toValue: (Dimensions.get('screen').width / 5) * day,
      useNativeDriver: false,
    }).start()
  }, [day])

  return (
    <Container>
      <Content>
        {constants.STRING_DAYS.map((day, index) => (
          <Button
            key={index}
            onPress={() => props.press(index)}
            hitSlop={{top: 5, bottom: 10, left: 5, right: 5}}>
            <BText selected={props.day === index}>{day}</BText>
          </Button>
        ))}
      </Content>
      <Animated.View
        style={{
          height: 3,
          backgroundColor: '#f9b233',
          width: Dimensions.get('screen').width / 5,
          borderRadius: 50,
          marginLeft: animatedMargin,
        }}
      />
    </Container>
  )
}

import React, { useEffect } from 'react'
import { Animated, Modal, ActivityIndicator } from 'react-native'
import { Content, Message } from './styles'


export default function Loading({ vars, title }) {
  const valueOfHeight = new Animated.Value(150)

  useEffect(() => {
    if (vars[0]) {
      Animated.timing(valueOfHeight, {
        toValue: 40,
        delay: 100,
        duration: 600
      }).start()
    }
  }, [vars[0]])

  return (
    <Modal
      transparent={true}
      visible={vars[0] || !vars[1]}
    >
      <Content style={{ maxHeight: valueOfHeight }}>
        <Animated.View style={{
          background: 'transparent',
          maxHeight: valueOfHeight.interpolate(
            {
              inputRange: [40, 150],
              outputRange: [0, 100]
            }
          ),
          opacity: valueOfHeight.interpolate(
            {
              inputRange: [40, 150],
              outputRange: [0, 1]
            }
          )
        }}>
          <ActivityIndicator style={{ marginBottom: 7 }} size={80} />
        </Animated.View>
        <Message style={{
          color: valueOfHeight.interpolate(
            {
              inputRange: [40, 150],
              outputRange: ['#f00', '#999']
            }
          )
        }} error={vars[0]}>
          {title}
        </Message>
      </Content>
    </Modal>
  )
}

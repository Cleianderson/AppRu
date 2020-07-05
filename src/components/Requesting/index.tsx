import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ActivityIndicator, Animated, Modal, View, TouchableWithoutFeedback } from 'react-native'

import constants from '~/service/constants'
import { Container, Content, Text, ContainerText } from './styles'

type Props = {
  action: () => Promise<boolean | void>,
  onSucessText?: string
  onFailedText?: string
}

const Requesting: React.FC<Props> = ({ action, onSucessText = 'Pronto!', onFailedText }) => {
  const [actionSucceded, setActionSucceded] = useState<boolean | undefined>(undefined)
  const [isVisible, setIsVisible] = useState<boolean | undefined>()

  const opacityValue = useRef(new Animated.Value(0)).current

  const closeModal = () => setIsVisible(false)

  onFailedText = onFailedText !== null && onFailedText !== '' ? onFailedText : 'Algo deu errado'

  useEffect(() => {
    setIsVisible(true)
    opacityValue.setValue(0)
    setActionSucceded(undefined)

    const executeAction = async () => {
      try {
        const responseAction = await Promise.resolve(action) as any as boolean | undefined
        setActionSucceded(responseAction)
        if (responseAction || responseAction === false) {
          Animated.timing(opacityValue, { toValue: 1, useNativeDriver: false, duration: 250 }).start()
        }
      } catch (error) {
        setActionSucceded(false)
      }
    }
    executeAction()
  }, [action])

  useEffect(() => {
    if (actionSucceded) {
      setTimeout(() => setIsVisible(false), 2000)
    }
  }, [actionSucceded])

  const renderContent = useCallback(() => {
    if (actionSucceded !== false) {
      return (
        <>
          <ContainerText>
            <Text style={{ opacity: Animated.subtract(1, opacityValue) }}>Fazendo requisição ao servidor</Text>
            <Text style={{
              opacity: opacityValue.interpolate({ inputRange: [0.5, 1], outputRange: [0, 1] })
            }}
            >
              {onSucessText}
            </Text>
          </ContainerText>
        </>
      )
    } else {
      return (
        <>
          <ContainerText>
            <Text style={{
              opacity: opacityValue.interpolate({ inputRange: [0.5, 1], outputRange: [0, 1] })
            }}
            >
              {onFailedText}
            </Text>
          </ContainerText>
        </>
      )
    }
  }, [opacityValue, actionSucceded])

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType='fade'
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <Container>
          <View onStartShouldSetResponder={() => true}>
            <Content>
              <Animated.View
                style={{
                  height: opacityValue.interpolate({ inputRange: [0.5, 1], outputRange: [30, 0] }),
                  transform: [
                    { scale: opacityValue.interpolate({ inputRange: [0.5, 1], outputRange: [0.5, 0] }) }
                  ]
                }}
              >
                <ActivityIndicator color={constants.SECOND_COLOR} size={72} />
              </Animated.View>
              {renderContent()}
            </Content>
          </View>
        </Container>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default Requesting

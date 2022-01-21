import React, { useEffect, useCallback } from 'react'
import { ActivityIndicator, Modal, View, TouchableWithoutFeedback } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import constants from '~/service/constants'
import { Container, Content, Text, ContainerText } from './styles'

const Requesting: React.FC = () => {
  // const [success, setSuccess] = useState<boolean | undefined>(undefined)
  // const [textSuccess, setTextSuccess] = useState<string | undefined>(undefined)
  // const [textFailed, setTextFailed] = useState<string | undefined>(undefined)
  // const [isVisible, setIsVisible] = useState<boolean | undefined>()

  const dispatch = useDispatch()

  const textSuccess = useSelector<RootState, string>(state => state.requestState.textSuccess)
  const textFailed = useSelector<RootState, string>(state => state.requestState.textFailed)
  const action = useSelector<RootState, Function | undefined>(state => state.requestState.action)
  const isRequesting = useSelector<RootState, boolean | undefined>(state => state.requestState.isRequesting)
  const success = useSelector<RootState, boolean | undefined>(state => state.requestState.success)

  // const opacityValue = useRef(new Animated.Value(0)).current
  const setIsRequesting = (isRequesting: boolean | undefined) => (
    dispatch({ type: 'SET_IS_REQUESTING', payload: { isRequesting } })
  )

  const closeModal = () => setIsRequesting(false)
  const setSuccess = (value: boolean | undefined) => dispatch({ type: 'SET_SUCCESS', payload: { success: value } })

  // onFailedText = onFailedText !== null && onFailedText !== '' ? onFailedText : 'Algo deu errado'

  useEffect(() => {
    if (action !== undefined) {
      setIsRequesting(true)
      // opacityValue.setValue(0)
      setSuccess(undefined)

      const executeAction = async () => {
        try {
          const responseAction = await action()
          if (typeof responseAction === 'boolean') {
            setSuccess(responseAction)
          }
        } catch (error) {
          setSuccess(false)
        }
      }
      try {
        executeAction()
      } catch {
        setSuccess(false)
      }
    }
  }, [action])

  useEffect(() => {
    if (success) {
      setTimeout(closeModal, 2000)
    } else if (textFailed === undefined) {
      // setTextFailed('Algo deu errado')
    }
  }, [success])

  const renderContent = useCallback(() => {
    if (success) {
      return (
        <ContainerText>
          <Text>{textSuccess}</Text>
        </ContainerText>
      )
    } else if (success === undefined) {
      return (
        <>
          <ActivityIndicator color={constants.SECOND_COLOR} size={72} />
          <ContainerText>
            <Text>Fazendo requisição ao servidor</Text>
          </ContainerText>
        </>
      )
    } else {
      return (
        <ContainerText>
          <Text>{textFailed}</Text>
          {/* <Text>{isRequesting?.toString()}</Text> */}
          {/* <Text>{textFailed}</Text> */}
          {/* <Text>{textSuccess}</Text> */}
        </ContainerText>
      )
    }
  }, [isRequesting, textSuccess, textFailed, success])

  return (
    <Modal
      visible={isRequesting}
      transparent={true}
      animationType='fade'
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <Container>
          <View onStartShouldSetResponder={() => true}>
            <Content>
              {renderContent()}
            </Content>
          </View>
        </Container>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default Requesting

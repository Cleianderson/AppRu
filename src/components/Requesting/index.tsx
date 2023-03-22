import React, { useEffect, useCallback } from 'react'
import { ActivityIndicator, Modal, View, TouchableWithoutFeedback } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import NetInfo from '@react-native-community/netinfo'

import constants from '~/service/constants'
import { updateWeekStorage } from '~/service/Storage'
import api from '~/service/Api'
import { Container, Content, Text, ContainerText } from './styles'

const isoWeekOfTomorrow = moment().add(1, 'days').isoWeek()

const Requesting: React.FC = () => {
  // const [success, setSuccess] = useState<boolean | undefined>(undefined)
  // const [textSuccess, setTextSuccess] = useState<string | undefined>(undefined)
  // const [textFailed, setTextFailed] = useState<string | undefined>(undefined)
  // const [isVisible, setIsVisible] = useState<boolean | undefined>()

  const dispatch = useDispatch()

  const textSuccess = useSelector<RootState, string>(state => state.requestState.textSuccess)
  const textFailed = useSelector<RootState, string>(state => state.requestState.textFailed)
  const action = useSelector<RootState, string | undefined>(state => state.requestState.action)
  const isRequesting = useSelector<RootState, boolean | undefined>(state => state.requestState.isRequesting)
  const success = useSelector<RootState, boolean | undefined>(state => state.requestState.success)

  // const opacityValue = useRef(new Animated.Value(0)).current
  const setIsRequesting = (isRequesting: boolean | undefined) => (
    dispatch({ type: 'SET_IS_REQUESTING', payload: { isRequesting } })
  )
  // const setFoods = (foods: any) => dispatch({ type: 'SET_FOODS', payload: { foods } })
  const setAction = (fn: string | undefined) => dispatch({ type: 'SET_ACTION', payload: { action: fn } })
  const setTextFailed = (str: string) => dispatch({ type: 'SET_TEXT_FAILED', payload: { textFailed: str } })
  const setTextSuccess = (str: string) => dispatch({ type: 'SET_TEXT_SUCCESS', payload: { textSuccess: str } })

  const closeModal = () => setIsRequesting(false)
  const setSuccess = (value: boolean | undefined) => dispatch({ type: 'SET_SUCCESS', payload: { success: value } })

  const requestWeek = async () => {
    if ((await NetInfo.fetch()).isConnected) {
      setTextFailed('O cardápio ainda não está disponível')
      setTextSuccess('Cardápio atualizado!')
      const req = async () => {
        const { data } = await api.get(`/thisweek?week=${isoWeekOfTomorrow}`)
        if (data) {
          updateWeekStorage(data.data, { number_week: data.number_week })
          // setFoods(data.data)
          return true
        }
        return false
      }

      return req()
    } else {
      setTextFailed('Falha na conexão')
      return false
    }
  }

  useEffect(() => {
    const actions: { [key: string]: () => Promise<boolean> } = {
      'requestWeek': requestWeek,
    }

    if (action !== undefined) {
      setIsRequesting(true)
      // opacityValue.setValue(0)
      setSuccess(undefined)
      
      const executeAction = async () => {
        const selectedAction = actions[action]
        try {
          const responseAction = await selectedAction()
          if (typeof responseAction === 'boolean') {
            setSuccess(responseAction)
          }
        } catch (error) {
          setSuccess(false)
        }
      }
      try {
        executeAction()
      } catch (err) {
        setSuccess(false)
      }

      setAction(undefined)
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

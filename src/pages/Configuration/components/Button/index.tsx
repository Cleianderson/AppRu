import React from 'react'
import { Alert } from 'react-native'

import { Container, Text } from './styles'

type Props = {
  label: string, onPress: () => void, titleAlert?: string, titleMessage?: string, confirm?: boolean | undefined
}

const Button: React.FC<Props> = ({ label, onPress, titleAlert, titleMessage, confirm }) => {
  const confirmAction = () => Alert.alert(titleAlert as string, titleMessage, [{ text: 'Cancelar', style: 'cancel' }, {
    text: 'Confirmar', style: 'destructive', onPress
  }])

  return (
    <Container onPress={confirm ? confirmAction : onPress} >
      <Text>{label}</Text>
    </Container>
  )
}

export default Button

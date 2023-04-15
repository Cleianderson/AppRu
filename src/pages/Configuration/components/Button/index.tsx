import React from "react"
import { Alert, Button as RNButton, TouchableOpacityProps } from "react-native"

import { Container, Text } from "./styles"

type Props = {
  label: string
  onPress: () => void
  titleAlert?: string
  titleMessage?: string
  confirm?: boolean | undefined
}

const Button: React.FC<TouchableOpacityProps & Props> = ({
  label,
  onPress,
  titleAlert,
  titleMessage,
  confirm,
  style
}) => {
  const confirmAction = () =>
    Alert.alert(titleAlert as string, titleMessage, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Confirmar",
        style: "destructive",
        onPress,
      },
    ])

  return (
    <Container style={style} onPress={confirm ? confirmAction : onPress}>
      <Text>{label}</Text>
    </Container>
  )
}

export default Button

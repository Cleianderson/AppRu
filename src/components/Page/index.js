import React, { useState } from 'react'
import { View } from 'react-native'

import { Button, TextButton, ButtonDetails } from '../../styles'

export default function Page(props) {
  const [viModal, setViModal] = useState(false)

  toggleModalVisible = () => {
    setViModal(!viModal)
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent:'center'
      }}
    >
      <Button onPress={() => props.firstAction()}>
        <TextButton>ALMOÇO</TextButton>
        <ButtonDetails>12:00h - 14:00h</ButtonDetails>
      </Button>
      <Button onPress={() => props.secondAction()}>
        <TextButton>JANTAR</TextButton>
        <ButtonDetails>16:30h - 18:00h</ButtonDetails>
      </Button>
    </View>
  )
}

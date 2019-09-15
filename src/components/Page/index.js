import React, { useState } from 'react'
import { View } from 'react-native'

import { Button, TextButton } from '../../styles'

export default function Page(props) {
  const [viModal, setViModal] = useState(false)

  toggleModalVisible = () => {
    setViModal(!viModal)
  }

  return (
    <View>
      <Button onPress={() => props.firstAction()}>
        <TextButton>Almoço</TextButton>
      </Button>
      <Button onPress={() => props.secondAction()}>
        <TextButton>Jantar</TextButton>
      </Button>
    </View>
  )
}

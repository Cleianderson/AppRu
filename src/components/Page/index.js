import React, { useState } from 'react'
import { View } from 'react-native'

import { Button, TextButton } from '../../styles'

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
      </Button>
      <Button onPress={() => props.secondAction()}>
        <TextButton>JANTAR</TextButton>
      </Button>
    </View>
  )
}

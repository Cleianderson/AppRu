import React from 'react'
import { Modal, View } from 'react-native'

export default function Modals(props) {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType='fade'
      onRequestClose={props.close}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        {props.component}
      </View>
    </Modal>
  )
}

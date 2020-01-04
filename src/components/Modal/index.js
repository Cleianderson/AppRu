import React from 'react'
import { Modal, TouchableOpacity } from 'react-native'

export default function Modals(props) {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType='fade'
      onRequestClose={props.close}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.close}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: 'rgba(27, 45, 79, .85)'
        }} >
        {props.component}
      </TouchableOpacity>
    </Modal>
  )
}

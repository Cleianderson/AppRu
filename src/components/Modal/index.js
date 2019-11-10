import React from 'react'
import { Modal, ScrollView } from 'react-native'

export default function Modals(props) {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType='slide'
      onRequestClose={() => {
        props.close()
      }}
    >
      <ScrollView>{props.component}</ScrollView>
    </Modal>
  )
}

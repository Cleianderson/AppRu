import React from 'react'
import { Modal, ScrollView } from 'react-native'
import Details from '../Details'

export default function Modals(props) {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        props.close()
      }}
    >
      <ScrollView
        style={{
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          flex: 1,
          height: '80%',
        }}
      >
        <Details item={props.data} names={props.names} />
      </ScrollView>
    </Modal>
  )
}

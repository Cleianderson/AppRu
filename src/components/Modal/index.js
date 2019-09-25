import React from 'react'
import { Modal, TouchableOpacity, Text, View } from 'react-native'
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
      <View
        style={{
          flex: 1,
          margin:10,
          backgroundColor: '#fff',
          paddingHorizontal:30,
          paddingVertical:15,
          borderRadius: 7
        }}
      >
        <Details item={props.data} />
      </View>
    </Modal>
  )
}

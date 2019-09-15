import React from 'react'
import { Modal, TouchableOpacity, Text, View } from 'react-native'
import Details from '../Details'

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
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,.95)',
          marginTop: 20,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      >
        <TouchableOpacity onPress={() => props.close()}>
          <Text
            style={{
              fontSize: 40,
              transform: [{ rotate: '180deg' }],
              textAlign: 'center',
            }}
          >
            ^
          </Text>
        </TouchableOpacity>
        <Details item={props.data} />
      </View>
    </Modal>
  )
}

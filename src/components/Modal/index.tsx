import React from 'react'
import { Modal, View, TouchableWithoutFeedback } from 'react-native'

export default function Modals (props) {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="fade"
      onRequestClose={props.close}
    >
      <TouchableWithoutFeedback onPress={props.close}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, .7)'
          }}>
          <View onStartShouldSetResponder={() => true}>{props.component}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

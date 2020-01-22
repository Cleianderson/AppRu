import React from 'react'
import { Modal, View, TouchableWithoutFeedback } from 'react-native'
import constants from '../../service/constants'

export default function Modals(props) {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType='fade'
      onRequestClose={props.close}
    >
      <TouchableWithoutFeedback onPress={props.close}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor:
              `rgba(${parseInt(constants.PRIMARY_COLOR.slice(1, 3), 16)}, 
            ${parseInt(constants.PRIMARY_COLOR.slice(3, 5), 16)},
            ${parseInt(constants.PRIMARY_COLOR.slice(5), 16)}, .85)`
          }} >
          <View onStartShouldSetResponder={() => true} >
            {props.component}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

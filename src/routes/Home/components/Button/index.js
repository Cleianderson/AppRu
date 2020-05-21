import React from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {Container} from './styles'

const Button = ({color = '#fff', icon, onPress, style, notify}) => {
  return (
    <Container style={style} >
      <Icon name={icon} color={color} size={22} />
      {notify && (
        <View
          style={{
            position: 'absolute',
            right: -4,
            top: -4,
            borderColor: '#fff',
            borderWidth: 2,
            borderRadius: 50,
            backgroundColor: '#ff7700',
            width: 15,
            height: 15,
          }}
        />
      )}
    </Container>
  )
}

export default Button

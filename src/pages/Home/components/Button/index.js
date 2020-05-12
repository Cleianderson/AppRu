import React from 'react'
import {Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {Container} from './styles'

const Button = ({iconColor = '#fff', icon, title, onPress, style, notify}) => {
  return (
    <Container style={style} onPress={onPress}>
      <Icon name={icon} color={iconColor} size={30} />
      <Text>{title}</Text>
      {notify && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: -3,
            borderColor: '#eee',
            borderWidth: 2,
            borderRadius: 50,
            backgroundColor: '#ff7700',
            width: 20,
            height: 20,
          }}
        />
      )}
    </Container>
  )
}

export default Button

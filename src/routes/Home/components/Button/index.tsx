import React from 'react'
// eslint-disable-next-line no-unused-vars
import { View, StyleProp, ViewStyle, TouchableOpacityProperties } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Container } from './styles'

type Prop = {
  icon: string
  color?: string
  onPress?: ()=>void
  style?: StyleProp<ViewStyle>
  notify?: boolean
  size?: number
  focused: boolean
} & TouchableOpacityProperties

const Button: React.FC<Prop> = ({ color = '#fff', icon, focused, style, notify, size = 22 }) => {
  return (
    <Container style={style} focused={focused} >
      <Icon name={icon} color={color} size={size} />
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
            width: 15 * size / 22,
            height: 15 * size / 22,
            maxWidth: 25,
            maxHeight: 25
          }}
        />
      )}
    </Container>
  )
}

export default Button

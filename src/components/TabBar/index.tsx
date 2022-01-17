import React, { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Container, Content, Button, ButtonContent, Label, Line } from './styles'

const IconsName = {
  Início: 'home',
  Avisos: 'alert-box',
  Sugerir: 'voice',
  Favoritos: 'star'
} as {[key: string]: string}

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {

  return (
    <Container>
      <Content>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index

          const handlePress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          return (
            <Button key={index} onPress={handlePress} focused={isFocused} >
              <ButtonContent>
                <Icon name={IconsName[state.routeNames[index]]} color={isFocused ? '#1b2d4f' : '#aaa'} size={25} />
                <Label focused={isFocused} >{state.routeNames[index]}</Label>
              </ButtonContent>
            </Button>)
        })}
      </Content>
    </Container>
  )
}

export default TabBar

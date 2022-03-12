import React from 'react'
import { Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { MenuButton, MenuText, MenuContent, MenuContentText } from '~/pages/Home/components/MenuButton/styles'

type Props = {
  title: string,
  horary: string
  star?:boolean
}

const FakeMenuButton: React.FC<Props> = ({ title, horary, star }) => {
  return (
    <MenuButton
      style={{ margin: 0, marginRight: 0, marginLeft: 0, marginBottom: 0 }}
      onPress={() => {}}>
      <MenuText>{title}</MenuText>
      <MenuContent>
        <Icon name="clock" color="#1b2d4f" size={15} />
        <MenuContentText>{horary}</MenuContentText>
      </MenuContent>
      {star && (
        <Icon style={{ position: 'absolute', right: 20 }} name="star" size={20} color="#f9b233" />
      )}
    </MenuButton>
  )
}

export default FakeMenuButton

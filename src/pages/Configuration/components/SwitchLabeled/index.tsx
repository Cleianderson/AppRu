import React from 'react'

import { Container, Content, Text, Switch } from './styles'

type Props = { label: string, isActived: boolean, nested?: boolean, onPress: () => void, disabled?: boolean }

const SwitchLabeled: React.FC<Props> = ({ isActived, label, children, nested, onPress, disabled }) => {
  return (
    <Container disabled={disabled} nested={nested} onPress={onPress} >
      <Content>
        <Text disabled={disabled} >{label}</Text>
        <Switch disabled={disabled} value={isActived} onValueChange={onPress} />
      </Content>
      {children}
    </Container>
  )
}

export default SwitchLabeled

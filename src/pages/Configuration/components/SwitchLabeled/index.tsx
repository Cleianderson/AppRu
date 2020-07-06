import React, { useState } from 'react'

import { Container, Content, Text, Switch } from './styles'

type Props = { label: string, isActived: boolean, nested?: boolean }

const SwitchLabeled: React.FC<Props> = ({ isActived, label, children, nested }) => {
  const [isActive, setIsActive] = useState(isActived)

  const toggleActive = () => setIsActive(!isActive)

  return (
    <Container nested={nested} onPress={toggleActive} >
      <Content>
        <Text>{label}</Text>
        <Switch value={isActive} onValueChange={setIsActive} />
      </Content>
      {children}
    </Container>
  )
}

export default SwitchLabeled

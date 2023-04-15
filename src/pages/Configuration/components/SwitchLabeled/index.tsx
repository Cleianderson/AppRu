import React from "react"

import {
  Container,
  Content,
  Text,
  Switch,
  Description,
  WrapSwitch,
} from "./styles"

type Props = {
  label: string
  isActived?: boolean
  onPress: () => void
  description?: string
}

const SwitchLabeled: React.FC<Props> = ({
  isActived,
  label,
  onPress,
  description,
}) => {
  return (
    <Container onPress={onPress}>
      <Content>
        <Text>{label}</Text>
        {description && <Description>{description}</Description>}
      </Content>
      <WrapSwitch>
        <Switch value={isActived} onValueChange={onPress} />
      </WrapSwitch>
    </Container>
  )
}

export default SwitchLabeled

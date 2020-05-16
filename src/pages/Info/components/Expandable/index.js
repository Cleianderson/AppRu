import React, {useState} from 'react'
import {LayoutAnimation, Platform, UIManager} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {Container, Header, Title, ExpandButton, ResContainer, ResText, Content} from './styles'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const Expandable = ({title, content}) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded(!expanded)
  }

  return (
    <Container onPress={toggleExpanded}>
      <Content>
        <Header>
          <Title>{title}</Title>
          <ExpandButton onPress={toggleExpanded}>
            <Icon name={`chevron-${expanded ? 'up' : 'down'}`} size={25} />
          </ExpandButton>
        </Header>
        {expanded && (
          <ResContainer>
            <ResText>{content}</ResText>
          </ResContainer>
        )}
      </Content>
    </Container>
  )
}

export default Expandable

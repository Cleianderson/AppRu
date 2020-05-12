import React, {useState} from 'react'
import {LayoutAnimation, Platform, UIManager} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {Container, Header, Title, ExpandButton, ResContainer, ResText} from './styles'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const Expandable = ({title, content}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <ExpandButton
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            setExpanded(!expanded)
          }}>
          <Icon name={`chevron-${expanded ? 'up' : 'down'}`} size={25} />
        </ExpandButton>
      </Header>
      {expanded && (
        <ResContainer>
          <ResText>{content}</ResText>
        </ResContainer>
      )}
    </Container>
  )
}

export default Expandable

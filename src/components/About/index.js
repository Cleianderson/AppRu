import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'

import { Container, Text, Link, Label } from './styles'
import packageJSON from '../../../package.json'

export default function About() {
  return (
    <Container>
      <Label>Versão: {packageJSON.version}</Label>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://github.com/Cleianderson/RUral')}
      >
        <Link> Código Fonte no GitHub </Link>
      </TouchableOpacity>
    </Container>
  )
}

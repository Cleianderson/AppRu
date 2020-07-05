import React, { useContext, useEffect } from 'react'
import { Text, FlatList, View } from 'react-native'

import DataContext from '../../contexts/DataContext'

import { Container, Title, Message, Content } from './style'

export default function Warn () {
  const { warns, updateThereIsWarn } = useContext(DataContext)

  useEffect(() => {
    updateThereIsWarn(false)
  }, [])

  const renderItem = ({ item }) => (
    <Container>
      <Title>{item.title}</Title>
      <Content>
        <Message>{item.content}</Message>
      </Content>
    </Container>
  )

  return (
    <FlatList
      data={warns}
      keyExtractor={(item, index) => String(item.title + index)}
      style={{ flex: 1 }}
      contentContainerStyle={{
        justifyContent: 'flex-end',
        flexDirection: 'column-reverse',
        margin: 10,
        paddingBottom: 20,
        flexGrow: 1
      }}
      renderItem={renderItem}
      ListEmptyComponent={
        <View style={{ flex: 1, justifyContent: 'center' }} >
          <Text style={{ textAlign: 'center', color: '#666' }}>Não há avisos!</Text>
        </View>
      }
    />
  )
}

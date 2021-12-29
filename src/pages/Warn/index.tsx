import React, { useEffect } from 'react'
import { Text, FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Title, Message, Content, DateText, Header } from './style'

export default function Warn () {
  const dispatch = useDispatch()
  const warns = useSelector<RootState, WarningType[] | undefined>(state => state.mainState.warns)

  const updateThereIsWarn = (value: boolean) => dispatch({ type: 'SET_THERE_IS_WARN', payload: { thereIsWarn: value } })

  const formatDate = (date: string) => {
    let month = `${new Date(date).getMonth()}`
    let day = `${new Date(date).getDay()}`

    if (month.length === 1) {
      month = '0' + month
    }

    if (day.length === 1) {
      day = '0' + day
    }

    return `${day}/${month}`
  }

  useEffect(() => {
    updateThereIsWarn(false)
  }, [])

  const renderItem = ({ item }) => (
    <Container>
      <Header>
        <Title>{item.title}</Title>
        <DateText>{formatDate(item.createdAt)}</DateText>
      </Header>
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

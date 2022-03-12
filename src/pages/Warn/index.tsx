import React, { useEffect } from 'react'
import Svg, { SvgProps, G, Path } from "react-native-svg"
import { Text, FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '~/service/Storage'

import { Container, Title, Message, Content, DateText, Header } from './style'

export default function Warn() {
  const dispatch = useDispatch()
  const warns = useSelector<RootState, WarningType[] | undefined>(state => state.mainState.warns)

  const updateThereIsWarn = async (value: boolean) => {
    dispatch({ type: 'SET_THERE_IS_WARN', payload: { thereIsWarn: value } })
    await setItem('@thereIsWarn', { data: value })
  }

  const formatDate = (date: string) => {
    let month = `0${new Date(date).getMonth()+1}`
    let day = `0${new Date(date).getDate()}`

    const lD = day.length
    const lM = month.length

    return `${day[lD-2]}${day[lD-1]}/${month[lM-2]}${month[lM-1]}`
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
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{
        justifyContent: 'flex-end',
        flexDirection: 'column-reverse',
        margin: 10,
        paddingBottom: 20,
        flexGrow: 1
      }}
      renderItem={renderItem}
      ListEmptyComponent={
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={200}
            height={200}
            viewBox="0 0 135.467 135.467"
          >
            <Path
              fill="#b8c4f0"
              d="m79.575 31.263-1.617 3.02c10.237 8.48 13.454 23.271 6.937 35.449l-1.583 2.958a34.311 34.311 0 0 0-3.113 24.16l.465 1.929a5.702 5.702 0 0 1-2.063 5.859 5.72 5.72 0 0 1-6.185.515L11.998 72.819a5.71 5.71 0 0 1-3.001-5.431 5.724 5.724 0 0 1 3.726-4.969l1.866-.681a34.275 34.275 0 0 0 18.375-15.993l1.583-2.958c6.517-12.177 20.466-17.781 33.342-13.892l1.617-3.021a5.708 5.708 0 0 1 7.729-2.34 5.708 5.708 0 0 1 2.34 7.729zM34.124 104.09a11.425 11.425 0 0 1-5.553-6.756c-.878-2.899-.484-6.17.872-8.702l20.14 10.778c-1.357 2.533-3.859 4.675-6.757 5.552-2.899.878-6.17.484-8.702-.872z"
            />
            <Path
              fill="#4c5a80"
              d="m80.084 27.373.694 3.355c13.293-.047 25.238 9.248 28.037 22.774l.68 3.285a34.311 34.311 0 0 0 13.088 20.545l1.593 1.183a5.702 5.702 0 0 1 2.17 5.82 5.72 5.72 0 0 1-4.42 4.358l-67.104 13.882a5.71 5.71 0 0 1-5.785-2.247 5.724 5.724 0 0 1-.322-6.202l.996-1.719a34.275 34.275 0 0 0 3.863-24.051l-.68-3.286c-2.798-13.525 4.322-26.765 16.7-32.028l-.694-3.355a5.708 5.708 0 0 1 4.435-6.75 5.708 5.708 0 0 1 6.749 4.436zm11.76 85.037c-2.97.615-6.06.033-8.592-1.63-2.53-1.663-4.323-4.426-4.905-7.24l22.368-4.627c.582 2.813.033 6.061-1.63 8.592-1.663 2.53-4.427 4.323-7.24 4.905z"
            />
          </Svg>
          <Text style={{ textAlign: 'center', color: '#666' }}>sem avisos por enquanto</Text>
        </View>
      }
    />
  )
}

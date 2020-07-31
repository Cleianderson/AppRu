import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'

import { Container, Content } from './styles'
import Expandable from './components/Expandable'

import Api from '../../service/Api'
import { setItem, getItem } from '../../service/Storage'

const Info = () => {
  const [questions, setQuestions] = useState([])
  const [requesting, setRequesting] = useState(false)

  useEffect(() => {
    setRequesting(true)
    const loadQuestions = async () => {
      try {
        const questionsFromServer = await Api.get('/questions')
        await setItem('@RUral:questions', { data: questionsFromServer.data })
        setQuestions(questionsFromServer.data)
      } catch (err) {
        const storageQuestions = JSON.parse(await getItem('@RUral:questions'))
        setQuestions(storageQuestions.data)
      } finally {
        setRequesting(false)
      }
    }
    loadQuestions()
  }, [])

  return (
    <Container>
      {requesting && questions.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color="#ccc" size="large" />
        </View>
      ) : (
        <Content>
          {questions.map((value, index) => (
            <Expandable
              key={String(index + value.question)}
              title={value.question}
              content={value.answer}
            />
          ))}
        </Content>
      )}
    </Container>
  )
}

export default Info

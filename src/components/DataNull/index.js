import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

// import { Container } from './styles';

export default function DataNull() {
  return (

    <View style={style.container}>
      <Text style={style.text}>
        O cardápio dessa semana ainda não está disponível
      </Text>
      <Text>:(</Text>
    </View>

  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#a00',
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
  }
})
